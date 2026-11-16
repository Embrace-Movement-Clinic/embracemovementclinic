"""Glow: soft drifting pools of light for the Embrace site, rendered in floating point and
dithered with a fine static grain so the gradients stay smooth (no banding).

  python3 glow.py still <variant> <out.png> [t]
  python3 glow.py video <variant> <out.mp4> [seconds]

Variants: hero, hero-tall, light, light-tall, band, band-tall
Every motion term is a whole multiple of the loop phase, so each loop is seamless.
"""
import os
import subprocess
import sys

import cv2
import numpy as np

FPS = 30
TAU = 2 * np.pi
DS = 4  # the light field is computed at 1/4 size (it is very smooth) and resampled in float

P = {
    "petrol950": (2, 39, 43), "petrol900": (8, 61, 66), "petrol800": (19, 87, 94), "petrol700": (33, 115, 123),
    "petrol500": (79, 174, 184), "petrol200": (190, 229, 233), "petrol100": (220, 242, 244), "mist": (242, 248, 248),
    "teal500": (58, 181, 147), "teal400": (99, 201, 169), "teal300": (144, 219, 193), "teal200": (186, 232, 215),
    "teal100": (218, 244, 234), "white": (255, 255, 255),
}


def mix(a, b, k):
    return tuple(a[i] + (b[i] - a[i]) * k for i in range(3))


SEA = mix(P["teal500"], P["petrol500"], 0.55)  # a teal that leans to petrol, never green

# Each pool: x, y (fractions of width/height), rx, ry (fractions of the long side), rotation,
# colour, strength, then motion: drift x, drift y, turn, breathe (size), pulse (strength), phase, harmonic
VARIANTS = {
    "hero": dict(size=(2560, 1440), base="petrol900", grain=1.7, veil=("x", "petrol900", 0.30, [(0, 1), (0.47, 1), (0.72, 0), (1, 0)]), pools=[
        (0.74, 0.42, 0.50, 0.30, -0.5, P["petrol700"], 0.85, 0.045, 0.050, 0.10, 0.06, 0.06, 0.0, 1),
        (0.97, 0.86, 0.36, 0.20, 0.4, SEA, 0.38, 0.050, 0.045, 0.14, 0.08, 0.12, 1.3, 1),
        (0.58, 0.08, 0.30, 0.12, -0.3, P["teal400"], 0.22, 0.070, 0.035, 0.12, 0.08, 0.15, 2.6, 1),
        (0.84, 0.28, 0.26, 0.11, -0.6, P["teal300"], 0.18, 0.075, 0.070, 0.22, 0.10, 0.18, 4.0, 1),
        (0.04, 1.00, 0.50, 0.35, 0.0, P["petrol950"], 0.75, 0.030, 0.030, 0.00, 0.05, 0.05, 5.1, 1),
        (0.50, 0.95, 0.30, 0.10, 0.15, P["petrol800"], 0.70, 0.060, 0.030, 0.10, 0.08, 0.08, 0.7, 1),
    ]),
    "hero-tall": dict(size=(1080, 1920), base="petrol900", grain=1.7, veil=("y", "petrol900", 0.30, [(0, 1), (0.51, 1), (0.60, 0.4), (0.69, 0.4), (0.755, 1), (1, 1)]), pools=[
        (0.70, 0.62, 0.44, 0.30, -0.9, P["petrol700"], 0.85, 0.060, 0.035, 0.10, 0.06, 0.06, 0.0, 1),
        (0.95, 0.80, 0.30, 0.16, 0.5, SEA, 0.38, 0.070, 0.035, 0.14, 0.08, 0.12, 1.3, 1),
        (0.30, 0.66, 0.26, 0.10, -0.5, P["teal400"], 0.22, 0.090, 0.040, 0.14, 0.08, 0.15, 2.6, 1),
        (0.80, 0.55, 0.24, 0.10, -0.8, P["teal300"], 0.18, 0.100, 0.045, 0.22, 0.10, 0.18, 4.0, 1),
        (0.10, 0.98, 0.45, 0.30, 0.0, P["petrol950"], 0.75, 0.040, 0.020, 0.00, 0.05, 0.05, 5.1, 1),
        (0.90, 0.05, 0.40, 0.20, 0.3, P["petrol800"], 0.60, 0.060, 0.025, 0.10, 0.08, 0.08, 0.7, 1),
    ]),
    "light": dict(size=(2560, 1080), base="mist", grain=1.1, veil=None, pools=[
        (0.22, 0.20, 0.42, 0.26, 0.0, P["white"], 0.90, 0.040, 0.050, 0.00, 0.06, 0.05, 3.0, 1),
        (0.78, 0.36, 0.42, 0.24, -0.4, P["teal100"], 0.95, 0.050, 0.060, 0.10, 0.06, 0.05, 0.0, 1),
        (0.60, 0.98, 0.40, 0.20, 0.2, P["petrol100"], 0.95, 0.060, 0.050, 0.10, 0.07, 0.05, 1.0, 1),
        (0.97, 0.82, 0.30, 0.15, 0.4, P["teal200"], 0.60, 0.050, 0.070, 0.14, 0.08, 0.12, 2.2, 1),
        (0.88, 0.12, 0.30, 0.13, -0.6, P["petrol200"], 0.45, 0.060, 0.070, 0.18, 0.10, 0.15, 4.0, 1),
        (0.70, 0.56, 0.26, 0.11, -0.5, P["white"], 0.60, 0.080, 0.080, 0.22, 0.10, 0.10, 5.2, 1),
    ]),
    "light-tall": dict(size=(1080, 1350), base="mist", grain=1.1, veil=None, pools=[
        (0.25, 0.15, 0.45, 0.28, 0.0, P["white"], 0.90, 0.050, 0.040, 0.00, 0.06, 0.05, 3.0, 1),
        (0.80, 0.45, 0.42, 0.26, -0.7, P["teal100"], 0.95, 0.070, 0.050, 0.10, 0.06, 0.05, 0.0, 1),
        (0.35, 0.95, 0.42, 0.22, 0.3, P["petrol100"], 0.95, 0.080, 0.040, 0.10, 0.07, 0.05, 1.0, 1),
        (0.98, 0.85, 0.30, 0.16, 0.5, P["teal200"], 0.60, 0.060, 0.050, 0.14, 0.08, 0.12, 2.2, 1),
        (0.90, 0.10, 0.32, 0.16, -0.6, P["petrol200"], 0.42, 0.070, 0.050, 0.18, 0.10, 0.15, 4.0, 1),
        (0.60, 0.62, 0.28, 0.13, -0.6, P["white"], 0.60, 0.100, 0.060, 0.22, 0.10, 0.10, 5.2, 1),
    ]),
    "band": dict(size=(2560, 640), base="petrol900", grain=1.7, veil=None, pools=[
        (0.70, 0.60, 0.40, 0.14, -0.05, P["petrol700"], 0.80, 0.060, 0.080, 0.05, 0.06, 0.06, 0.0, 1),
        (0.97, 0.70, 0.26, 0.11, 0.1, SEA, 0.30, 0.050, 0.080, 0.08, 0.08, 0.12, 1.3, 1),
        (0.30, 0.72, 0.30, 0.09, 0.05, P["teal400"], 0.16, 0.080, 0.080, 0.08, 0.08, 0.15, 2.6, 1),
        (0.84, 0.38, 0.26, 0.08, -0.12, P["teal300"], 0.10, 0.080, 0.120, 0.12, 0.10, 0.18, 4.0, 1),
        (0.00, 0.00, 0.40, 0.20, 0.0, P["petrol950"], 0.60, 0.030, 0.060, 0.00, 0.05, 0.05, 5.1, 1),
        (0.45, 0.10, 0.30, 0.08, 0.05, P["petrol800"], 0.55, 0.070, 0.080, 0.06, 0.08, 0.08, 0.7, 1),
    ]),
    "band-tall": dict(size=(1080, 1080), base="petrol900", grain=1.7, veil=None, pools=[
        (0.70, 0.62, 0.55, 0.26, -0.2, P["petrol700"], 0.80, 0.080, 0.050, 0.06, 0.06, 0.06, 0.0, 1),
        (1.00, 0.66, 0.36, 0.18, 0.3, SEA, 0.30, 0.070, 0.050, 0.10, 0.08, 0.12, 1.3, 1),
        (0.20, 0.72, 0.40, 0.14, 0.1, P["teal400"], 0.16, 0.100, 0.050, 0.10, 0.08, 0.15, 2.6, 1),
        (0.75, 0.45, 0.34, 0.14, -0.4, P["teal300"], 0.10, 0.100, 0.070, 0.16, 0.10, 0.18, 4.0, 1),
        (0.00, 0.00, 0.50, 0.30, 0.0, P["petrol950"], 0.60, 0.040, 0.040, 0.00, 0.05, 0.05, 5.1, 1),
        (0.60, 0.08, 0.40, 0.14, 0.1, P["petrol800"], 0.55, 0.090, 0.050, 0.08, 0.08, 0.08, 0.7, 1),
    ]),
}


class Scene:
    def __init__(self, name):
        v = VARIANTS[name]
        self.v = v
        self.W, self.H = v["size"]
        w, h = self.W // DS, self.H // DS
        # Sample positions of the small grid, in full-size pixel coordinates.
        xs = (np.arange(w, dtype=np.float32) + 0.5) * DS - 0.5
        ys = (np.arange(h, dtype=np.float32) + 0.5) * DS - 0.5
        self.X, self.Y = np.meshgrid(xs, ys)
        self.base = np.array(P[v["base"]], np.float32)
        rng = np.random.default_rng(20261117)
        g = rng.normal(0, v["grain"], (self.H, self.W)).astype(np.float32)
        self.grain = np.clip(g, -3 * v["grain"], 3 * v["grain"])[..., None]
        self.veil = None
        if v["veil"]:
            axis, col, strength, stops = v["veil"]
            coord = (self.X / self.W) if axis == "x" else (self.Y / self.H)
            pos = np.array([s[0] for s in stops]); val = np.array([s[1] for s in stops])
            a = np.interp(coord, pos, val).astype(np.float32)
            a = cv2.GaussianBlur(a, (0, 0), sigmaX=max(self.W, self.H) / DS * 0.03)  # soften the ramp's corners
            self.veil = (a[..., None] * strength, np.array(P[col], np.float32))

    def frame(self, t):
        """Return one frame as uint8 RGB. t runs 0..1 around the loop."""
        phi = TAU * t
        R = max(self.W, self.H)
        img = np.empty(self.X.shape + (3,), np.float32)
        img[:] = self.base
        for (x, y, rx, ry, rot, col, a, dx, dy, dr, ds, da, ph, k) in self.v["pools"]:
            cx = self.W * (x + dx * np.sin(k * phi + ph))
            cy = self.H * (y + dy * np.cos(k * phi + ph * 1.7))
            r = rot + dr * np.sin(k * phi + ph * 0.6 + 1.0)
            s = 1 + ds * np.sin(k * phi + ph * 2.3 + 2.0)
            al = a * (1 + da * np.sin(k * phi + ph * 1.1 + 3.0))
            c, sn = np.cos(r), np.sin(r)
            u = (self.X - cx) * c + (self.Y - cy) * sn
            v = -(self.X - cx) * sn + (self.Y - cy) * c
            q = (u / (R * rx * s)) ** 2 + (v / (R * ry * s)) ** 2
            f = np.clip(1 - q, 0, 1) ** 2.2 * min(al, 1.0)
            img += (np.array(col, np.float32) - img) * f[..., None]
        if self.veil is not None:
            a, col = self.veil
            img += (col - img) * a
        full = cv2.resize(img, (self.W, self.H), interpolation=cv2.INTER_CUBIC)
        full += self.grain
        return np.clip(np.rint(full), 0, 255).astype(np.uint8)


def still(name, out, t=0.3):
    sc = Scene(name)
    cv2.imwrite(out, cv2.cvtColor(sc.frame(t), cv2.COLOR_RGB2BGR))


def video(name, out, seconds=20.0):
    sc = Scene(name)
    n = int(round(seconds * FPS))
    tmp = out + ".part.mp4"
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{sc.W}x{sc.H}", "-r", str(FPS), "-i", "-",
           "-vf", "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p",  # exact colour conversion
           "-c:v", "libx264", "-crf", "6", "-preset", "veryfast", "-pix_fmt", "yuv420p",
           "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv", "-an", tmp]
    ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(n):
        ff.stdin.write(sc.frame(i / n).tobytes())
    ff.stdin.close()
    if ff.wait() != 0:
        raise SystemExit("ffmpeg failed")
    os.replace(tmp, out)
    print("wrote", out, n, "frames")


if __name__ == "__main__":
    mode, name, out = sys.argv[1:4]
    if mode == "still":
        still(name, out, float(sys.argv[4]) if len(sys.argv) > 4 else 0.3)
    else:
        video(name, out, float(sys.argv[4]) if len(sys.argv) > 4 else 20.0)
