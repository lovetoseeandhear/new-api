#!/usr/bin/env python3
"""
Generic video generation test script for New API.

Environment variables:
  NEWAPI_BASE_URL  Base URL, for example http://127.0.0.1:3030
  NEWAPI_API_KEY   New API token key

Examples:
  python3 scripts/test_video_generation.py \
    --base-url http://127.0.0.1:3030 \
    --api-key sk-xxx \
    --model seedance-2.0 \
    --prompt "A cinematic 5-second video of a futuristic city at sunset." \
    --seconds 5 \
    --output seedance_output.mp4

  python3 scripts/test_video_generation.py \
    --model model-a --model model-b \
    --metadata-json '{"resolution":"720p","ratio":"16:9"}' \
    --extra-json '{"watermark":false}'
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


TERMINAL_SUCCESS = {"completed", "succeeded", "success"}
TERMINAL_FAILURE = {"failed", "failure", "cancelled", "canceled"}


def parse_json_arg(value: str, name: str) -> dict[str, Any]:
    if not value:
        return {}
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError as exc:
        raise argparse.ArgumentTypeError(f"{name} must be valid JSON: {exc}") from exc
    if not isinstance(parsed, dict):
        raise argparse.ArgumentTypeError(f"{name} must be a JSON object")
    return parsed


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Submit, poll, and download video generation tasks through New API."
    )
    parser.add_argument(
        "--base-url",
        default=os.getenv("NEWAPI_BASE_URL", "http://127.0.0.1:3030"),
        help="New API base URL. Default: NEWAPI_BASE_URL or http://127.0.0.1:3030",
    )
    parser.add_argument(
        "--api-key",
        default=os.getenv("NEWAPI_API_KEY"),
        help="New API token key. Default: NEWAPI_API_KEY",
    )
    parser.add_argument(
        "--model",
        action="append",
        required=True,
        help="Model name configured in New API. Repeat this flag to test multiple models.",
    )
    parser.add_argument(
        "--prompt",
        default="A cinematic 5-second video of a futuristic city at sunset, smooth camera movement.",
        help="Video prompt.",
    )
    parser.add_argument("--image", action="append", default=[], help="Optional image URL. Repeat for multiple images.")
    parser.add_argument("--seconds", type=int, default=5, help="Video duration in seconds.")
    parser.add_argument("--resolution", default="720p", help="Resolution metadata, for example 720p or 1080p.")
    parser.add_argument("--ratio", default="16:9", help="Aspect ratio metadata, for example 16:9, 9:16, 1:1.")
    parser.add_argument("--seed", type=int, default=None, help="Optional seed metadata.")
    parser.add_argument(
        "--watermark",
        action=argparse.BooleanOptionalAction,
        default=None,
        help="Optional watermark flag.",
    )
    parser.add_argument(
        "--metadata-json",
        default="",
        help='Extra metadata JSON object, for example \'{"camera_fixed":true}\'.',
    )
    parser.add_argument(
        "--extra-json",
        default="",
        help='Extra top-level request JSON object, for example \'{"negative_prompt":"blur"}\'.',
    )
    parser.add_argument("--output", default="", help="Output filename. Only valid when testing one model.")
    parser.add_argument("--output-dir", default=".", help="Output directory for generated videos.")
    parser.add_argument("--poll-interval", type=float, default=5.0, help="Polling interval in seconds.")
    parser.add_argument("--timeout", type=float, default=900.0, help="Maximum wait time per task in seconds.")
    return parser.parse_args()


def request_json(
    method: str,
    url: str,
    api_key: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 60.0,
) -> dict[str, Any]:
    data = None
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json",
    }
    if payload is not None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        err_body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {exc.code} {exc.reason}: {err_body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"request failed: {exc.reason}") from exc

    try:
        return json.loads(body)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"response is not JSON: {body[:500]}") from exc


def should_send_auth(download_url: str, base_url: str) -> bool:
    try:
        download_host = urllib.parse.urlparse(download_url).netloc
        base_host = urllib.parse.urlparse(base_url).netloc
    except ValueError:
        return False
    return download_host == base_host


def download_file(url: str, api_key: str, output: Path, base_url: str, timeout: float = 300.0) -> None:
    headers = {}
    if should_send_auth(url, base_url):
        headers["Authorization"] = f"Bearer {api_key}"

    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            output.parent.mkdir(parents=True, exist_ok=True)
            with output.open("wb") as f:
                while True:
                    chunk = resp.read(1024 * 1024)
                    if not chunk:
                        break
                    f.write(chunk)
    except urllib.error.HTTPError as exc:
        err_body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"download failed: HTTP {exc.code} {exc.reason}: {err_body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"download failed: {exc.reason}") from exc


def build_submit_payload(args: argparse.Namespace, model: str) -> dict[str, Any]:
    metadata = {
        "resolution": args.resolution,
        "ratio": args.ratio,
        "duration": args.seconds,
    }
    if args.seed is not None:
        metadata["seed"] = args.seed
    if args.watermark is not None:
        metadata["watermark"] = args.watermark
    metadata.update(parse_json_arg(args.metadata_json, "--metadata-json"))

    payload: dict[str, Any] = {
        "model": model,
        "prompt": args.prompt,
        "seconds": str(args.seconds),
        "duration": args.seconds,
        "metadata": metadata,
    }
    if args.image:
        payload["image"] = args.image[0]
        payload["images"] = args.image
    payload.update(parse_json_arg(args.extra_json, "--extra-json"))
    return payload


def extract_task_id(resp: dict[str, Any]) -> str:
    task_id = resp.get("id") or resp.get("task_id")
    if not task_id:
        raise RuntimeError(f"submit response has no id/task_id: {json.dumps(resp, ensure_ascii=False)}")
    return str(task_id)


def status_of(resp: dict[str, Any]) -> str:
    return str(resp.get("status", "")).strip().lower()


def get_result_url(resp: dict[str, Any]) -> str:
    metadata = resp.get("metadata")
    if isinstance(metadata, dict):
        url = metadata.get("url")
        if isinstance(url, str) and url:
            return url
    urls = resp.get("unsigned_urls")
    if isinstance(urls, list) and urls and isinstance(urls[0], str):
        return urls[0]
    for key in ("url", "video_url", "output_url"):
        url = resp.get(key)
        if isinstance(url, str) and url:
            return url
    return ""


def output_path(args: argparse.Namespace, model: str) -> Path:
    if args.output:
        if len(args.model) != 1:
            raise RuntimeError("--output can only be used with one --model")
        return Path(args.output)
    safe_model = "".join(ch if ch.isalnum() or ch in ("-", "_", ".") else "_" for ch in model)
    return Path(args.output_dir) / f"{safe_model}_video.mp4"


def run_one(args: argparse.Namespace, model: str) -> None:
    base_url = args.base_url.rstrip("/")
    submit_url = f"{base_url}/v1/videos"
    payload = build_submit_payload(args, model)

    print(f"\nSubmitting video task to {submit_url}")
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    submit_resp = request_json("POST", submit_url, args.api_key, payload)
    print("Submit response:")
    print(json.dumps(submit_resp, ensure_ascii=False, indent=2))

    task_id = extract_task_id(submit_resp)
    fetch_url = f"{base_url}/v1/videos/{task_id}"
    content_url = f"{base_url}/v1/videos/{task_id}/content"

    deadline = time.monotonic() + args.timeout
    last_resp: dict[str, Any] = submit_resp
    while time.monotonic() < deadline:
        time.sleep(args.poll_interval)
        last_resp = request_json("GET", fetch_url, args.api_key)
        status = status_of(last_resp)
        progress = last_resp.get("progress", "")
        print(f"Task {task_id}: status={status or '-'} progress={progress}")

        if status in TERMINAL_FAILURE:
            raise RuntimeError(json.dumps(last_resp, ensure_ascii=False, indent=2))
        if status in TERMINAL_SUCCESS:
            print("Final response:")
            print(json.dumps(last_resp, ensure_ascii=False, indent=2))
            break
    else:
        raise RuntimeError(f"timed out after {args.timeout} seconds: {fetch_url}")

    result_url = get_result_url(last_resp)
    download_url = result_url or content_url
    target = output_path(args, model)
    print(f"Downloading video from {download_url}")
    download_file(download_url, args.api_key, target, base_url)
    print(f"Saved video to {target}")


def main() -> int:
    args = parse_args()
    if not args.api_key:
        print("ERROR: missing --api-key or NEWAPI_API_KEY", file=sys.stderr)
        return 2

    try:
        for model in args.model:
            run_one(args, model)
    except RuntimeError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
