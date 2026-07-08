#!/usr/bin/env python3
"""
Generic image generation test script for New API.

Environment variables:
  NEWAPI_BASE_URL  Base URL, for example http://127.0.0.1:3030
  NEWAPI_API_KEY   New API token key

Examples:
  python3 scripts/test_image_generation.py \
    --base-url http://127.0.0.1:3030 \
    --api-key sk-xxx \
    --model gpt-image-1 \
    --prompt "A clean product photo of a glass teapot on a white table" \
    --size 1024x1024

  python3 scripts/test_image_generation.py \
    --model model-a --model model-b \
    --extra-json '{"background":"transparent"}'
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


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
        description="Submit and save image generation responses through New API."
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
        default="A clean product photo of a glass teapot on a white table, soft natural light.",
        help="Image prompt.",
    )
    parser.add_argument("--n", type=int, default=1, help="Number of images.")
    parser.add_argument("--size", default="1024x1024", help="Image size, for example 1024x1024.")
    parser.add_argument("--quality", default="", help="Optional quality, for example standard, hd, high.")
    parser.add_argument("--style", default="", help="Optional style.")
    parser.add_argument(
        "--response-format",
        default="",
        help="Optional response format, for example url or b64_json.",
    )
    parser.add_argument(
        "--extra-json",
        default="",
        help='Extra top-level request JSON object, for example \'{"background":"transparent"}\'.',
    )
    parser.add_argument("--output-dir", default=".", help="Output directory for generated images.")
    parser.add_argument(
        "--output-prefix",
        default="image_output",
        help="Output filename prefix. Model and index are appended automatically.",
    )
    return parser.parse_args()


def request_json(
    method: str,
    url: str,
    api_key: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 180.0,
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


def extension_from_headers(headers: Any, default: str = ".png") -> str:
    content_type = headers.get("Content-Type", "").split(";", 1)[0].strip().lower()
    if not content_type:
        return default
    return mimetypes.guess_extension(content_type) or default


def download_image(url: str, api_key: str, output_base: Path, base_url: str) -> Path:
    headers = {}
    if should_send_auth(url, base_url):
        headers["Authorization"] = f"Bearer {api_key}"

    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=300.0) as resp:
            ext = extension_from_headers(resp.headers)
            output = output_base.with_suffix(ext)
            output.parent.mkdir(parents=True, exist_ok=True)
            with output.open("wb") as f:
                while True:
                    chunk = resp.read(1024 * 1024)
                    if not chunk:
                        break
                    f.write(chunk)
            return output
    except urllib.error.HTTPError as exc:
        err_body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"download failed: HTTP {exc.code} {exc.reason}: {err_body}") from exc
    except urllib.error.URLError as exc:
        raise RuntimeError(f"download failed: {exc.reason}") from exc


def save_b64_image(b64_json: str, output_base: Path) -> Path:
    raw = b64_json
    ext = ".png"
    if raw.startswith("data:"):
        header, _, payload = raw.partition(",")
        raw = payload
        mime_type = header.removeprefix("data:").split(";", 1)[0]
        ext = mimetypes.guess_extension(mime_type) or ext
    output = output_base.with_suffix(ext)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(base64.b64decode(raw))
    return output


def build_payload(args: argparse.Namespace, model: str) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "model": model,
        "prompt": args.prompt,
        "n": args.n,
    }
    if args.size:
        payload["size"] = args.size
    if args.quality:
        payload["quality"] = args.quality
    if args.style:
        payload["style"] = args.style
    if args.response_format:
        payload["response_format"] = args.response_format
    payload.update(parse_json_arg(args.extra_json, "--extra-json"))
    return payload


def safe_name(value: str) -> str:
    return "".join(ch if ch.isalnum() or ch in ("-", "_", ".") else "_" for ch in value)


def output_base(args: argparse.Namespace, model: str, index: int) -> Path:
    name = f"{args.output_prefix}_{safe_name(model)}_{index + 1}"
    return Path(args.output_dir) / name


def run_one(args: argparse.Namespace, model: str) -> None:
    base_url = args.base_url.rstrip("/")
    submit_url = f"{base_url}/v1/images/generations"
    payload = build_payload(args, model)

    print(f"\nSubmitting image request to {submit_url}")
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    resp = request_json("POST", submit_url, args.api_key, payload)
    print("Image response:")
    print(json.dumps(resp, ensure_ascii=False, indent=2))

    data = resp.get("data")
    if not isinstance(data, list) or not data:
        raise RuntimeError(f"response has no data array: {json.dumps(resp, ensure_ascii=False)}")

    for index, item in enumerate(data):
        if not isinstance(item, dict):
            continue
        base = output_base(args, model, index)
        url = item.get("url")
        b64_json = item.get("b64_json")
        if isinstance(url, str) and url:
            saved = download_image(url, args.api_key, base, base_url)
            print(f"Saved image {index + 1} to {saved}")
        elif isinstance(b64_json, str) and b64_json:
            saved = save_b64_image(b64_json, base)
            print(f"Saved image {index + 1} to {saved}")
        else:
            print(f"WARNING: image {index + 1} has no url or b64_json", file=sys.stderr)


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
