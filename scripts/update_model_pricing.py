#!/usr/bin/env python3
import json
import os
import sqlite3
import socket
import shutil
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urlparse
import re


@dataclass
class PricingSeed:
    model_name: str
    input_price: float
    cache_write_price: float
    cache_read_price: float
    output_price: float


SEEDS: List[PricingSeed] = [
    PricingSeed("MiniMax M2.7", 0.30, 0.375, 0.06, 1.20),
    PricingSeed("MiniMax M2.5", 0.30, 0.30, 0.03, 1.20),
    PricingSeed("Kimi K2.6", 0.95, 0.95, 0.16, 4.00),
    PricingSeed("Kimi K2.5", 0.59, 0.59, 0.177, 3.00),
    PricingSeed("GLM-5.1", 1.40, 1.40, 0.26, 4.40),
    PricingSeed("GLM-5", 1.00, 1.00, 0.20, 3.20),
    PricingSeed("DeepSeek V3.2", 0.29, 0.29, 0.145, 0.44),
    PricingSeed("DeepSeek V4 Flash", 0.28, 0.28, 0.0056, 0.56),
    PricingSeed("DeepSeek V4 Pro", 0.87, 0.87, 0.0087, 1.74),
    PricingSeed("GPT-5.4", 2.50, 2.50, 0.25, 15.00),
    PricingSeed("GPT-5.5", 5.00, 5.00, 0.50, 30.00),
    PricingSeed("GPT-5.5 Instant", 5.00, 5.00, 0.50, 30.00),
    PricingSeed("GPT-5.4 Pro", 30.00, 30.00, 3.00, 180.00),
    PricingSeed("GPT-5.2", 1.75, 1.75, 0.175, 14.00),
    PricingSeed("GPT-5.4 Mini", 0.75, 0.75, 0.075, 4.50),
    PricingSeed("GPT-5 Mini", 0.25, 0.25, 0.025, 2.00),
    PricingSeed("GPT-5.4 Nano", 0.20, 0.20, 0.02, 1.25),
    PricingSeed("GPT-5 Nano", 0.05, 0.05, 0.005, 0.40),
    PricingSeed("Claude Opus 4.7", 5.00, 6.25, 0.50, 25.00),
    PricingSeed("Claude Opus 4.6", 5.00, 6.25, 0.50, 25.00),
    PricingSeed("Claude Opus 4.5", 5.00, 6.25, 0.50, 25.00),
    PricingSeed("Claude Sonnet 4.6", 3.00, 3.75, 0.30, 15.00),
    PricingSeed("Claude Sonnet 4.5", 3.00, 3.75, 0.30, 15.00),
    PricingSeed("Claude Haiku 4.5", 1.00, 1.25, 0.10, 5.00),
    PricingSeed("Gemini 3.1 Pro", 2.00, 2.00, 0.20, 12.00),
    PricingSeed("Gemini 3 Flash", 0.50, 0.50, 0.05, 3.00),
]


def load_project_env() -> None:
    root = Path(__file__).resolve().parent.parent
    env_file = root / ".env"
    compose_file = root / "docker-compose.yml"

    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("'").strip('"')
            if key and key not in os.environ:
                os.environ[key] = value

    if "SQL_DSN" not in os.environ and compose_file.exists():
        text = compose_file.read_text(encoding="utf-8")
        m = re.search(r"(?m)^\s*-\s*SQL_DSN\s*=\s*([^#\n]+)", text)
        if m:
            os.environ["SQL_DSN"] = m.group(1).strip()
        elif "SQLITE_PATH" not in os.environ:
            m2 = re.search(r"(?m)^\s*#?\s*-\s*SQLITE_PATH\s*=\s*([^#\n]+)", text)
            if m2:
                os.environ["SQLITE_PATH"] = m2.group(1).strip()
    if compose_file.exists():
        text = compose_file.read_text(encoding="utf-8")
        if "POSTGRES_USER" not in os.environ:
            m = re.search(r"(?m)^\s*POSTGRES_USER:\s*([^\s#]+)", text)
            if m:
                os.environ["POSTGRES_USER"] = m.group(1).strip()
        if "POSTGRES_PASSWORD" not in os.environ:
            m = re.search(r"(?m)^\s*POSTGRES_PASSWORD:\s*([^\s#]+)", text)
            if m:
                os.environ["POSTGRES_PASSWORD"] = m.group(1).strip()
        if "POSTGRES_DB" not in os.environ:
            m = re.search(r"(?m)^\s*POSTGRES_DB:\s*([^\s#]+)", text)
            if m:
                os.environ["POSTGRES_DB"] = m.group(1).strip()


def docker_container_exists(name: str) -> bool:
    if not shutil.which("docker"):
        return False
    ret = subprocess.run(
        ["docker", "inspect", name],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    return ret.returncode == 0


def _detect_db() -> Tuple[str, str]:
    container = os.getenv("POSTGRES_CONTAINER", "postgres").strip()
    if container and docker_container_exists(container):
        return ("docker_postgres", container)
    dsn = os.getenv("SQL_DSN", "").strip()
    if not dsn:
        return ("sqlite", os.getenv("SQLITE_PATH", "one-api.db"))
    scheme = urlparse(dsn).scheme.lower()
    if scheme.startswith("postgres"):
        return ("postgres", dsn)
    if scheme.startswith("mysql"):
        return ("mysql", dsn)
    raise RuntimeError(f"unsupported SQL_DSN scheme: {scheme}")


class DB:
    def __init__(self) -> None:
        self.kind, self.target = _detect_db()
        self.conn = None
        self.param = "?"

    def connect(self) -> None:
        if self.kind == "docker_postgres":
            self.conn = self.target
            self.param = "%s"
            return
        if self.kind == "sqlite":
            self.conn = sqlite3.connect(self.target)
            self.param = "?"
            return
        if self.kind == "postgres":
            try:
                import psycopg2  # type: ignore
            except Exception as e:
                raise RuntimeError("postgres requires: pip install psycopg2-binary") from e
            self.conn = psycopg2.connect(self.target)
            self.param = "%s"
            self._maybe_patch_tcp_host()
            return
        if self.kind == "mysql":
            try:
                import pymysql  # type: ignore
            except Exception as e:
                raise RuntimeError("mysql requires: pip install pymysql") from e
            u = urlparse(self.target)
            self.conn = pymysql.connect(
                host=u.hostname,
                port=u.port or 3306,
                user=u.username,
                password=u.password,
                database=(u.path or "").lstrip("/"),
                charset="utf8mb4",
                autocommit=False,
            )
            self.param = "%s"
            self._maybe_patch_tcp_host()
            return
        raise RuntimeError(f"unsupported db kind: {self.kind}")

    def _maybe_patch_tcp_host(self) -> None:
        # If compose DSN uses a container hostname such as "postgres" but the
        # script is run from the host, resolve failures can happen. In that case
        # switch to 127.0.0.1 when the standard service ports are published.
        if self.kind not in {"postgres", "mysql"}:
            return
        dsn = self.target
        if self.kind == "postgres":
            parsed = urlparse(dsn)
            host = parsed.hostname or ""
            try:
                socket.gethostbyname(host)
                return
            except Exception:
                pass
            if host == "postgres":
                self.conn.close()
                rebuilt = parsed._replace(netloc=f"{parsed.username}:{parsed.password}@127.0.0.1:{parsed.port or 5432}")
                self.target = rebuilt.geturl()
                import psycopg2  # type: ignore
                self.conn = psycopg2.connect(self.target)
        elif self.kind == "mysql":
            parsed = urlparse(dsn)
            host = parsed.hostname or ""
            try:
                socket.gethostbyname(host)
                return
            except Exception:
                pass
            if host in {"mysql", "127.0.0.1", "localhost"}:
                return

    def close(self) -> None:
        if self.kind == "docker_postgres":
            return
        if self.conn is not None:
            self.conn.close()

    def fetch_one(self, sql: str, args: Tuple[Any, ...]) -> Optional[Tuple[Any, ...]]:
        if self.kind == "docker_postgres":
            out = self._docker_psql(self._format_sql(sql, args), fetch=True).strip()
            if not out:
                return None
            row = out.splitlines()[0].split("\t")
            return tuple(None if c == "__NULL__" else c for c in row)
        cur = self.conn.cursor()
        cur.execute(sql, args)
        row = cur.fetchone()
        cur.close()
        return row

    def execute(self, sql: str, args: Tuple[Any, ...]) -> int:
        if self.kind == "docker_postgres":
            self._docker_psql(self._format_sql(sql, args), fetch=False)
            return 1
        cur = self.conn.cursor()
        cur.execute(sql, args)
        affected = cur.rowcount
        cur.close()
        return affected

    def commit(self) -> None:
        if self.kind == "docker_postgres":
            return
        self.conn.commit()

    def rollback(self) -> None:
        if self.kind == "docker_postgres":
            return
        self.conn.rollback()

    def _docker_psql(self, sql: str, fetch: bool) -> str:
        container = self.target
        user = os.getenv("POSTGRES_USER", "root")
        password = os.getenv("POSTGRES_PASSWORD", "123456")
        dbname = os.getenv("POSTGRES_DB", "new-api")
        cmd = [
            "docker", "exec", "-i",
            "-e", f"PGPASSWORD={password}",
            container,
            "psql",
            "-U", user,
            "-d", dbname,
            "-v", "ON_ERROR_STOP=1",
            "-qAt",
            "-F", "\t",
            "-P", "null=__NULL__",
            "-c", sql,
        ]
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE if fetch else subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
        if proc.returncode != 0:
            raise RuntimeError(proc.stderr.decode("utf-8", errors="ignore").strip())
        if fetch:
            return proc.stdout.decode("utf-8", errors="ignore")
        return ""

    @staticmethod
    def _escape_sql_value(value: Any) -> str:
        if value is None:
            return "NULL"
        if isinstance(value, bool):
            return "TRUE" if value else "FALSE"
        if isinstance(value, (int, float)):
            return str(value)
        return "'" + str(value).replace("'", "''") + "'"

    def _format_sql(self, sql: str, args: Tuple[Any, ...]) -> str:
        placeholder = self.param
        parts = sql.split(placeholder)
        if len(parts) - 1 != len(args):
            raise RuntimeError("placeholder count does not match args")
        out = []
        for i in range(len(args)):
            out.append(parts[i])
            out.append(self._escape_sql_value(args[i]))
        out.append(parts[-1])
        return "".join(out)


def load_option_map(db: DB, key: str) -> Dict[str, float]:
    row = db.fetch_one(f"SELECT value FROM options WHERE key = {db.param}", (key,))
    if row is None or row[0] is None or row[0] == "":
        return {}
    try:
        raw = json.loads(row[0])
        if isinstance(raw, dict):
            out: Dict[str, float] = {}
            for k, v in raw.items():
                try:
                    out[str(k)] = float(v)
                except Exception:
                    pass
            return out
    except Exception:
        pass
    return {}


def upsert_option_map(db: DB, key: str, data: Dict[str, float]) -> None:
    value = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    exists = db.fetch_one(f"SELECT 1 FROM options WHERE key = {db.param} LIMIT 1", (key,))
    if exists:
        db.execute(
            f"UPDATE options SET value = {db.param} WHERE key = {db.param}",
            (value, key),
        )
    else:
        db.execute(
            f"INSERT INTO options (key, value) VALUES ({db.param}, {db.param})",
            (key, value),
        )


def ensure_model_exists(db: DB, model_name: str) -> bool:
    row = db.fetch_one(
        f"SELECT id FROM models WHERE model_name = {db.param} AND deleted_at IS NULL LIMIT 1",
        (model_name,),
    )
    if row is not None:
        return False
    now = int(time.time())
    db.execute(
        f"""
        INSERT INTO models
        (model_name, description, status, sync_official, created_time, updated_time, name_rule)
        VALUES ({db.param}, {db.param}, {db.param}, {db.param}, {db.param}, {db.param}, {db.param})
        """,
        (model_name, "seeded by update_model_pricing.py", 1, 0, now, now, 0),
    )
    return True


def main() -> None:
    load_project_env()
    write_top_n = int(os.getenv("WRITE_TOP_N", str(len(SEEDS))))
    if write_top_n <= 0:
        raise RuntimeError("WRITE_TOP_N must be greater than 0")
    billing_mode = os.getenv("BILLING_MODE", "ratio").strip().lower()
    db = DB()
    db.connect()
    try:
        model_price = load_option_map(db, "ModelPrice")
        model_ratio = load_option_map(db, "ModelRatio")
        completion_ratio = load_option_map(db, "CompletionRatio")
        cache_ratio = load_option_map(db, "CacheRatio")
        create_cache_ratio = load_option_map(db, "CreateCacheRatio")
        raw_pricing: Dict[str, Dict[str, Any]] = {}

        created_count = 0
        selected = SEEDS[:write_top_n]
        for s in selected:
            if ensure_model_exists(db, s.model_name):
                created_count += 1
            if billing_mode == "ratio":
                model_price.pop(s.model_name, None)
            else:
                model_price[s.model_name] = s.input_price
            # 按用户要求：不做任何换算，直接写原始值到现有计费配置项
            model_ratio[s.model_name] = s.input_price
            completion_ratio[s.model_name] = s.output_price
            cache_ratio[s.model_name] = s.cache_read_price
            create_cache_ratio[s.model_name] = s.cache_write_price
            raw_pricing[s.model_name] = {
                "input_price": s.input_price,
                "cache_write_price": s.cache_write_price,
                "cache_read_price": s.cache_read_price,
                "output_price": s.output_price,
            }

        upsert_option_map(db, "ModelPrice", model_price)
        upsert_option_map(db, "ModelRatio", model_ratio)
        upsert_option_map(db, "CompletionRatio", completion_ratio)
        upsert_option_map(db, "CacheRatio", cache_ratio)
        upsert_option_map(db, "CreateCacheRatio", create_cache_ratio)
        raw_json = json.dumps(raw_pricing, ensure_ascii=False, separators=(",", ":"))
        raw_exists = db.fetch_one(
            f"SELECT 1 FROM options WHERE key = {db.param} LIMIT 1",
            ("RawModelPricing",),
        )
        if raw_exists:
            db.execute(
                f"UPDATE options SET value = {db.param} WHERE key = {db.param}",
                (raw_json, "RawModelPricing"),
            )
        else:
            db.execute(
                f"INSERT INTO options (key, value) VALUES ({db.param}, {db.param})",
                ("RawModelPricing", raw_json),
            )

        db.commit()
        print(f"done: selected={len(selected)}/{len(SEEDS)}, created_models={created_count}, billing_mode={billing_mode}")
        print("saved without conversion: ModelPrice/ModelRatio/CompletionRatio/CacheRatio/CreateCacheRatio + RawModelPricing")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
