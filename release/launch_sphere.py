"""Synestra Sphere portable loopback launcher. Python 3 stdlib only."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import sys
import threading
import webbrowser

ROOT = Path(__file__).resolve().parent
HOST = "127.0.0.1"
PORT = 5182
URL = f"http://{HOST}:{PORT}/"

class SphereHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

def main():
    if not all((ROOT / name).is_file() for name in ("index.html", "style.css", "dist/babylon-lab.js")):
        print("SPHERE_FILES_MISSING: extracted package incomplete", file=sys.stderr, flush=True)
        return 3
    try:
        server = ThreadingHTTPServer((HOST, PORT), SphereHandler)
    except OSError as exc:
        print(f"SPHERE_PORT_UNAVAILABLE: {HOST}:{PORT} ({exc})", file=sys.stderr, flush=True)
        return 2
    with server:
        print(f"SPHERE_READY: {URL}", flush=True)
        if os.environ.get("SYNESTRA_SPHERE_QA_NO_BROWSER") != "1":
            threading.Thread(target=webbrowser.open, args=(URL,), daemon=True).start()
        try:
            server.serve_forever(poll_interval=0.1)
        except KeyboardInterrupt:
            print("SPHERE_STOPPED", flush=True)
    return 0

if __name__ == "__main__":
    sys.exit(main())
