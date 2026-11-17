# Background motion

Two looks, both drawn from the site palette:

- **Glow** (`glow.py`): soft pools of light that drift slowly. Used on petrol: the home hero
  and the booking band.
- **Mist** (`mist/`): a fine teal ribbon that turns slowly over the pale mist background. Used
  behind the light page headers. Chosen by the owner on 17 Nov 2026 over a pale Glow.

The finished files live in `site/src/assets/motion/` and are placed by
`site/src/components/MotionBackdrop.astro`. Because they sit in `src/assets`, the build gives
each one a hashed name under `/_astro/`, which the site already caches for a year. Replace a
file and its address changes, so visitors never see a stale copy.

| File | Used for | Size |
|---|---|---|
| `glow-hero.mp4` / `glow-hero-tall.mp4` | Home hero (desktop / phone) | 2560×1440 / 1080×1920 |
| `mist-header.mp4` / `mist-header-tall.mp4` | Light page headers | 2560×1080 / 1080×1350 |
| `glow-band.mp4` / `glow-band-tall.mp4` | Booking band | 2560×640 / 1080×1080 |

All are silent, 30 frames a second, and loop without a join: Glow loops are 20 seconds, Mist 16.

## Re-rendering Glow

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

Keep text readable: white text needs 4.5:1 over the petrol loops. The current files measure at
least 4.6:1 everywhere, through the whole loop.

## Re-rendering Mist

`mist/scenes.html` draws the ribbon on a canvas; `mist/render.py` films it in headless Chrome
(Python with Playwright, plus `ffmpeg`). The colours are at the top of `scenes.html`.

```
python3 mist/render.py stills 2560 1080 0 0,0.5           # two frames, to look at
python3 mist/render.py video 2560 1080 0 16 master-mist.mp4
python3 mist/render.py video 1080 1350 0 16 master-mist-tall.mp4
```

Encode as for Glow, but with `keyint=480:min-keyint=480` (the loop is 480 frames).

The ribbon is too strong for grey body text to sit on, so the video has no fade baked in.
Instead `PageHero.astro` lays a wash of the background colour over the text column: 72% behind
the column on wider screens, fading out after it, and 65% over the whole header on phones. With
that, muted text measures at least 4.7:1 over every frame. If you change the ribbon, re-measure.

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

## Checks on the preview, 17 Nov 2026

Lighthouse (PageSpeed Insights) against the preview branch, with the live `main` build for comparison:

| Page | Device | Performance | Accessibility | Best practices | LCP | Page weight |
|---|---|---|---|---|---|---|
| Home, with Glow | Phone | 99 | 100 | 96 | 2.0 s | 2.1 MB |
| Home, with Glow | Desktop | 100 | 100 | 96 | 0.5 s | 3.8 MB |
| Patient information, with Glow | Phone | 100 | 100 | 96 | 0.9 s | 1.5 MB |
| Patient information, with Glow | Desktop | 100 | 100 | 96 | 0.5 s | 2.6 MB |
| Home on `main`, no loops | Phone | 99 | 100 | 100 | 2.1 s | 0.2 MB |
| Home on `main`, no loops | Desktop | 100 | 100 | 100 | 0.5 s | 0.3 MB |

- The patient information rows were measured with the pale Glow header, before Mist replaced
  it later on 17 Nov. The Mist header files are heavier (3.3 MB desktop, 2.0 MB phone, against
  2.6 MB and 1.5 MB). Lighthouse couldn't be re-run before the merge to `main` (no browser
  available that evening). The way the loops load didn't change, so the scores shouldn't move
  beyond page weight; re-run it on a light-header page on `main` to confirm.
- Total blocking time 0 ms and layout shift 0 on every run. The LCP element is the hero photo
  or the heading, never the loop.
- Best practices is 96 on the preview because Cloudflare's own analytics beacon logs a console
  error on the preview address. `main` doesn't log it. Check again after merging.
- SEO reads 69 on every pages.dev address, `main` included, because those addresses are
  deliberately kept out of search results (`site/public/_headers`).
- In Chrome on a desktop: each loop downloads once, plays, pauses off screen, and stops and
  restarts from the footer link. No console errors from the site.
- Not tested: Safari and iPhone or iPad. Play-from-memory is there for them, but nobody has
  looked at the preview on one yet.
