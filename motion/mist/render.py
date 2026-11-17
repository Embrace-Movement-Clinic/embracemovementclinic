"""Render the Mist header loop from scenes.html (canvas, headless Chrome) into a lossless-ish master.

  python3 render.py stills <W> <H> <veil> <t,t,...>      PNG stills for checking
  python3 render.py video  <W> <H> <veil> <seconds> <out.mp4>
"""
import os, subprocess, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
FPS = 30


def open_page(p, w, h, veil):
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox", "--disable-gpu"])
    pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
    pg.goto((HERE / "scenes.html").as_uri())
    pg.evaluate(f"setup({w}, {h}); setMistVeil({veil})")
    return b, pg


def stills(w, h, veil, ts):
    out = HERE / "stills"; out.mkdir(exist_ok=True)
    with sync_playwright() as p:
        b, pg = open_page(p, w, h, veil)
        for t in ts:
            pg.evaluate(f"renderAt('mist', {t})")
            pg.screenshot(path=str(out / f"mist_{w}x{h}_{t:.3f}.png"))
        b.close()


def video(w, h, veil, seconds, dest):
    n = int(round(seconds * FPS)); tmp = dest + ".part.mp4"
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "png", "-i", "-",
        "-vf", "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p",
        "-c:v", "libx264", "-crf", "6", "-preset", "veryfast", "-pix_fmt", "yuv420p",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv", "-an", tmp], stdin=subprocess.PIPE)
    with sync_playwright() as p:
        b, pg = open_page(p, w, h, veil)
        for i in range(n):
            pg.evaluate(f"renderAt('mist', {i / n})")
            ff.stdin.write(pg.screenshot(type="png"))
        b.close()
    ff.stdin.close()
    if ff.wait() != 0:
        raise SystemExit("ffmpeg failed")
    os.replace(tmp, dest); print("wrote", dest, n, "frames")


if __name__ == "__main__":
    mode, w, h, veil = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4])
    if mode == "stills":
        stills(w, h, veil, [float(x) for x in sys.argv[5].split(",")])
    else:
        video(w, h, veil, float(sys.argv[5]), sys.argv[6])
