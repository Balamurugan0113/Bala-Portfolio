#!/usr/bin/env python3
"""Generate favicon PNG variants + apple-touch-icon + og-image for Bala Portfolio.

Deterministic raster rendering of the 'B' monogram (matches client/public/favicon.svg).
Draws at high resolution and downsamples with LANCZOS for crisp small sizes.
"""
from PIL import Image, ImageDraw, ImageFilter
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "client", "public")
S = 2048  # supersample master

GOLD_TOP = (253, 230, 138)
GOLD_MID = (245, 158, 11)
GOLD_BOT = (234, 88, 12)
CYAN = (34, 211, 238)


def vertical_gradient(size, top, mid, bot):
    """Vertical 3-stop gradient image."""
    w, h = size
    img = Image.new("RGB", (w, h))
    px = img.load()
    half = h // 2
    for y in range(h):
        if y < half:
            t = y / max(half, 1)
            c = tuple(int(top[i] + (mid[i] - top[i]) * t) for i in range(3))
        else:
            t = (y - half) / max(half, 1)
            c = tuple(int(mid[i] + (bot[i] - mid[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = c
    return img


def rounded_rect_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def stadium_mask(size, x0, y0, x1, y1):
    """Fully-rounded right side stadium shape (for B bowls)."""
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    r = (y1 - y0) / 2
    d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=255)
    return m


def build_monogram(size_px):
    """Render the B monogram icon at size_px x size_px."""
    s = size_px
    k = s / 512.0  # coordinate scale (design space is 512)

    # --- base plate ---
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))

    # vertical dark gradient base
    base = vertical_gradient((s, s), (26, 26, 36), (12, 12, 19), (6, 6, 9)).convert("RGBA")

    # ambient amber glow upper area
    glow = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gw = int(520 * k)
    gd.ellipse(
        [s // 2 - gw, int(40 * k), s // 2 + gw, int(40 * k) + int(560 * k)],
        fill=(245, 158, 11, 26),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(int(90 * k)))
    base = Image.alpha_composite(base, glow)

    # rounded plate mask
    radius = int(112 * k)
    plate_mask = rounded_rect_mask((s, s), radius)
    plate = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    plate.paste(base, (0, 0), plate_mask)
    img = Image.alpha_composite(img, plate)

    # subtle inner rim
    rim = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rim)
    inset = int(6 * k)
    rd.rounded_rectangle(
        [inset, inset, s - inset, s - inset],
        radius=max(radius - inset, 4),
        outline=(253, 230, 138, 60),
        width=max(int(3 * k), 1),
    )
    img = Image.alpha_composite(img, Image.composite(rim, Image.new("RGBA", (s, s), (0, 0, 0, 0)), plate_mask))

    # --- gold gradient fill for glyph ---
    gold = vertical_gradient((s, s), GOLD_TOP, GOLD_MID, GOLD_BOT).convert("RGBA")

    # soft glow behind glyph
    glyph_glow = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    ggd = ImageDraw.Draw(glyph_glow)

    def draw_glyph(d, offset=0):
        """Draw B glyph shapes onto drawer d (design coords * k)."""
        # stem
        d.rounded_rectangle(
            [int(164 * k) + offset, int(118 * k) + offset, int(234 * k) + offset, int(394 * k) + offset],
            radius=int(35 * k), fill=255,
        )
        # upper bowl
        d.rounded_rectangle(
            [int(196 * k) + offset, int(118 * k) + offset, int(367 * k) + offset, int(256 * k) + offset],
            radius=int(69 * k), fill=255,
        )
        # lower bowl
        d.rounded_rectangle(
            [int(196 * k) + offset, int(256 * k) + offset, int(391 * k) + offset, int(394 * k) + offset],
            radius=int(69 * k), fill=255,
        )
        # circuit pins
        d.rounded_rectangle(
            [int(132 * k) + offset, int(134 * k) + offset, int(190 * k) + offset, int(160 * k) + offset],
            radius=int(13 * k), fill=255,
        )
        d.rounded_rectangle(
            [int(132 * k) + offset, int(352 * k) + offset, int(190 * k) + offset, int(378 * k) + offset],
            radius=int(13 * k), fill=255,
        )

    draw_glyph(ggd)
    glyph_glow = glyph_glow.filter(ImageFilter.GaussianBlur(int(18 * k)))
    amber_glow = Image.new("RGBA", (s, s), (245, 158, 11, 90))
    img = Image.alpha_composite(img, Image.composite(amber_glow, Image.new("RGBA", (s, s), (0, 0, 0, 0)), glyph_glow))

    # crisp glyph
    glyph_mask = Image.new("L", (s, s), 0)
    draw_glyph(ImageDraw.Draw(glyph_mask))
    # specular top highlight on glyph (subtle white gradient masked by glyph)
    spec = vertical_gradient((s, s), (255, 255, 255), (255, 255, 255), (255, 255, 255)).convert("RGBA")
    spec_alpha = Image.new("L", (s, s), 0)
    sd = ImageDraw.Draw(spec_alpha)
    hgt = int(150 * k)
    for y in range(hgt):
        a = int(70 * (1 - y / hgt))
        sd.line([(0, y), (s, y)], fill=a)
    glyph_layer = gold.copy()
    glyph_layer.putalpha(glyph_mask)
    img = Image.alpha_composite(img, glyph_layer)
    spec_layer = Image.new("RGBA", (s, s), (255, 255, 255, 0))
    spec_layer.putalpha(Image.composite(spec_alpha, Image.new("L", (s, s), 0), glyph_mask))
    img = Image.alpha_composite(img, spec_layer)

    # cyan AI node with ring
    node = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    nd = ImageDraw.Draw(node)
    cx, cy, r = int(366 * k), int(325 * k), int(10 * k)
    nd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=CYAN + (255,))
    ring_r = int(19 * k)
    nd.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=CYAN + (115,), width=max(int(4 * k), 1),
    )
    node_glow = node.filter(ImageFilter.GaussianBlur(int(8 * k)))
    img = Image.alpha_composite(img, node_glow)
    img = Image.alpha_composite(img, node)

    return img


def main():
    master = build_monogram(S)
    targets = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
    }
    for name, size in targets.items():
        master.resize((size, size), Image.LANCZOS).save(os.path.join(OUT, name), "PNG", optimize=True)
        print(f"✓ {name} ({size}x{size})")

    # ---------- OG image 1200x630 ----------
    W, H = 1200, 630
    og = vertical_gradient((W, H), (14, 14, 20), (7, 7, 11), (5, 5, 8)).convert("RGBA")

    # ambient glows
    g1 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(g1)
    d1.ellipse([-300, -350, 500, 350], fill=(245, 158, 11, 34))
    g1 = g1.filter(ImageFilter.GaussianBlur(160))
    og = Image.alpha_composite(og, g1)
    g2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(g2)
    d2.ellipse([850, 350, 1500, 950], fill=(34, 211, 238, 20))
    g2 = g2.filter(ImageFilter.GaussianBlur(160))
    og = Image.alpha_composite(og, g2)

    # subtle grid
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = 44
    for x in range(0, W, step):
        gd.line([(x, 0), (x, H)], fill=(245, 158, 11, 10), width=1)
    for y in range(0, H, step):
        gd.line([(0, y), (W, y)], fill=(245, 158, 11, 10), width=1)
    og = Image.alpha_composite(og, grid)

    # monogram badge on left
    badge = master.resize((360, 360), Image.LANCZOS)
    og.alpha_composite(badge, (90, 135))

    # text on right — use bundled DejaVu if present
    from PIL import ImageFont
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
    ]
    display_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf",
    ] + font_paths
    mono_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    ]
    try:
        f_name = ImageFont.truetype(display_paths[0], 84)
        f_role = ImageFont.truetype(font_paths[0], 34)
        f_tag = ImageFont.truetype(mono_paths[0], 24)
    except Exception:
        f_name = f_role = f_tag = ImageFont.load_default()

    td = ImageDraw.Draw(og)
    tx = 520
    # name
    name = "BALAMURUGAN C"
    tw = td.textlength(name, font=f_name)
    if tx + tw > W - 60:
        from PIL import Image as _I
        ratio = (W - 80 - tx) / tw
        f_name = ImageFont.truetype(display_paths[0], max(int(84 * ratio), 40)) if len(display_paths) > 1 and display_paths[0].endswith(".ttf") else f_name
    td.text((tx, 200), name, font=f_name, fill=(253, 230, 138))
    td.text((tx, 310), "AI & Data Science Engineer", font=f_role, fill=(226, 232, 240))
    td.text((tx, 372), "// ETHICAL HACKING  ·  MACHINE LEARNING  ·  FULL-STACK", font=f_tag, fill=(148, 163, 184))

    og.convert("RGB").save(os.path.join(OUT, "og-image.png"), "PNG", optimize=True)
    print("✓ og-image.png (1200x630)")


if __name__ == "__main__":
    main()
