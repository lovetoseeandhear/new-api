#!/usr/bin/env python3
"""
Test Seedance video generation through a New API OpenAI-compatible endpoint.

Environment variables:
  NEWAPI_BASE_URL  Base URL, for example http://127.0.0.1:3000
  NEWAPI_API_KEY   New API token key

Example:
  NEWAPI_BASE_URL=http://127.0.0.1:3000 NEWAPI_API_KEY=sk-xxx \
    python3 scripts/test_seedance_video.py \
      --model seedance-2.0 \
      --prompt "A cinematic shot of a red panda surfing on a neon ocean" \
      --seconds 5 \
      --resolution 720p \
      --ratio 16:9 \
      --seed 12345 \
      --output seedance.mp4
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from typing import Any


TERMINAL_SUCCESS = {"completed", "succeeded", "success"}
TERMINAL_FAILURE = {"failed", "failure", "cancelled", "canceled"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Submit and poll a Seedance video task through New API."
    )
    parser.add_argument(
        "--base-url",
        default=os.getenv("NEWAPI_BASE_URL", "http://127.0.0.1:3000"),
        help="New API base URL. Default: NEWAPI_BASE_URL or http://127.0.0.1:3000",
    )
    parser.add_argument(
        "--api-key",
        default=os.getenv("NEWAPI_API_KEY"),
        help="New API token key. Default: NEWAPI_API_KEY",
    )
    parser.add_argument(
        "--model",
        default="seedance-2.0",
        help="Model name configured in New API. Example: seedance-2.0 or doubao-seedance-2-0-260128",
    )
    parser.add_argument(
        "--prompt",
        default="A cinematic 5-second video of a futuristic city at sunset, smooth camera movement.",
        help="Video prompt.",
    )
    parser.add_argument(
        "--image",
        default="",
        help="Optional image URL for image-to-video.",
    )
    parser.add_argument(
        "--seconds",
        type=int,
        default=5,
        help="Video duration in seconds.",
    )
    parser.add_argument(
        "--resolution",
        default="720p",
        help="Seedance resolution metadata, for example 720p or 1080p.",
    )
    parser.add_argument(
        "--ratio",
        default="16:9",
        help="Seedance aspect ratio metadata, for example 16:9, 9:16, 1:1.",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=12345,
        help="Seedance seed metadata.",
    )
    parser.add_argument(
        "--watermark",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Whether to request watermark from upstream. Default: false.",
    )
    parser.add_argument(
        "--output",
        default="seedance_output.mp4",
        help="Output video filename.",
    )
    parser.add_argument(
        "--poll-interval",
        type=float,
        default=5.0,
        help="Polling interval in seconds.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=900.0,
        help="Maximum wait time in seconds.",
    )
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


def download_file(url: str, api_key: str, output: str, timeout: float = 300.0) -> None:
    headers = {"Authorization": f"Bearer {api_key}"}
    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            with open(output, "wb") as f:
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


def build_submit_payload(args: argparse.Namespace) -> dict[str, Any]:
    metadata = {
        "resolution": args.resolution,
        "ratio": args.ratio,
        "duration": args.seconds,
        "seed": args.seed,
        "watermark": args.watermark,
    }
    payload: dict[str, Any] = {
        "model": args.model,
        "prompt": args.prompt,
        # New API accepts both "seconds" and metadata.duration for task adaptors.
        "seconds": str(args.seconds),
        "duration": args.seconds,
        "metadata": metadata,
    }
    if args.image:
        payload["image"] = args.image
        payload["images"] = [args.image]
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
    for key in ("url", "video_url", "output_url"):
        url = resp.get(key)
        if isinstance(url, str) and url:
            return url
    return ""


def main() -> int:
    args = parse_args()
    if not args.api_key:
        print("ERROR: missing --api-key or NEWAPI_API_KEY", file=sys.stderr)
        return 2

    base_url = args.base_url.rstrip("/")
    submit_url = f"{base_url}/v1/videos"
    payload = build_submit_payload(args)

    print(f"Submitting video task to {submit_url}")
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
            print(json.dumps(last_resp, ensure_ascii=False, indent=2), file=sys.stderr)
            return 1
        if status in TERMINAL_SUCCESS:
            print("Final response:")
            print(json.dumps(last_resp, ensure_ascii=False, indent=2))
            break
    else:
        print(f"ERROR: timed out after {args.timeout} seconds: {fetch_url}", file=sys.stderr)
        return 1

    result_url = get_result_url(last_resp)
    download_url = result_url or content_url
    print(f"Downloading video from {download_url}")
    download_file(download_url, args.api_key, args.output)
    print(f"Saved video to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
