# Background motion ("Glow")

`glow.py` draws the site's background loops: soft pools of light that drift slowly, in the
site palette. The finished files live in `site/src/assets/motion/` and are placed by
`site/src/components/MotionBackdrop.astro`. Because they sit in `src/assets`, the build gives
each one a hashed name under `/_astro/`, which the site already caches for a year. Replace a
file and its address changes, so visitors never see a stale copy.

| File | Used for | Size |
|---|---|---|
| `glow-hero.mp4` / `glow-hero-tall.mp4` | Home hero (desktop / phone) | 2560×1440 / 1080×1920 |
| `glow-light.mp4` / `glow-light-tall.mp4` | Light page headers | 2560×1080 / 1080×1350 |
| `glow-band.mp4` / `glow-band-tall.mp4` | Booking band | 2560×640 / 1080×1080 |

All are silent, 20 seconds, 30 frames a second, and loop without a join.

## Re-rendering

Needs Python with `numpy` and `opencv-python`, and `ffmpeg`. Colours and the position of each
pool are at the top of `glow.py`.

```
python3 glow.py still hero check.png          # one frame, to look at
python3 glow.py video hero master-hero.mp4    # full-quality master
ffmpeg -i master-hero.mp4 -c:v libx264 -crf 21 -preset slow -aq-mode 3 \
  -x264-params keyint=600:min-keyint=600:scenecut=0 -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart -an glow-hero.mp4
```

For the phone-sized (`-tall`) files add `-refs 4 -level 4.0`, so older phones can decode them.

The fine grain in the picture is deliberate: it keeps the gradients smooth. Compressing harder
than `-crf 21`, or filtering the grain out, brings back visible bands.

Keep text readable: white text needs 4.5:1 over the petrol loops and muted text 4.5:1 over the
light one. The current files measure at least 4.6:1 everywhere, through the whole loop.

## How the page plays them (and why)

`MotionBackdrop.astro` does three things that are easy to undo by accident:

- **Downloads the whole file, then plays it from memory.** Safari and every iOS browser refuse
  to play a video unless the host answers partial ("range") requests. Checked on 17 Nov 2026:
  the pages.dev preview answered range requests with the whole file. Playing from memory
  works either way.
- **Paints the video onto a `<canvas>`.** Chrome counts a large `<video>` as the page's
  largest contentful paint (LCP). Shown directly, the loop became the LCP element and its
  download time became the page's LCP. A canvas isn't counted, so LCP stays the heading or
  the hero photo.
- **Picks one file in script** (wide, or tall below the 56em breakpoint). With two `<source>`
  elements, Lighthouse's phone run downloaded both files (5.6 MB).
