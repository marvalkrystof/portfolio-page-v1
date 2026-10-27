"""Build flat SVG portfolio covers from real screenshots and project references.

Run with Python 3; no image generation service or third-party packages required.
Source URLs and the distinction between screenshots and diagrams are recorded in
docs/project-image-sources.json. Embedded images keep every cover self-contained.
"""

import base64
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public/images"
SOURCES = []
BG, PANEL, LINE = "#15141d", "#201e2b", "#393544"
INK, MUTED, ACCENT = "#eeeaf5", "#a6a0b6", "#bfa5ed"


def text(x, y, value, size=20, fill=INK, **attrs):
    extra = " ".join(f'{k.replace("_", "-")}="{v}"' for k, v in attrs.items())
    return f'<text x="{x}" y="{y}" fill="{fill}" font-size="{size}" {extra}>{html.escape(str(value))}</text>'


def rect(x, y, w, h, fill=PANEL, radius=8, stroke="none"):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>'


def line(x1, y1, x2, y2, stroke=LINE, width=2):
    return f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{stroke}" stroke-width="{width}"/>'


def circle(x, y, r, fill=PANEL, stroke=LINE):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="3"/>'


def photo(path, x, y, w, h, fit="xMidYMid meet"):
    suffix = path.suffix.lower()
    mime = {".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml"}[suffix]
    data = base64.b64encode(path.read_bytes()).decode()
    return f'<image x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="{fit}" href="data:{mime};base64,{data}"/>'


def crop(path, original, region, destination, clip_id):
    """Crop through explicit clipping for consistent SVG renderer support."""
    ow, oh = original
    sx, sy, sw, sh = region
    x, y, w, h = destination
    scale = min(w / sw, h / sh)
    px, py = x + (w - sw * scale) / 2, y + (h - sh * scale) / 2
    return (f'<defs><clipPath id="{clip_id}">{rect(x, y, w, h, "white", 0)}</clipPath></defs>'
            + f'<g clip-path="url(#{clip_id})">'
            + photo(path, px - sx * scale, py - sy * scale, ow * scale, oh * scale)
            + '</g>')


def cover(name, label, body, kind, urls, note):
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">'
        f'<title>{html.escape(label)}</title>'
        f'<desc>{html.escape(note)}</desc>'
        '<g font-family="ui-monospace, SFMono-Regular, Consolas, monospace">'
        + rect(0, 0, 800, 500, BG, 0)
        + circle(35, 35, 4, ACCENT, ACCENT)
        + text(53, 41, label.upper(), 15, MUTED, letter_spacing="2")
        + line(28, 62, 772, 62)
        + body
        + '</g></svg>'
    )
    (IMAGES / f"{name}-cover.svg").write_text(svg)
    SOURCES.append({"path": f"public/images/{name}-cover.svg", "type": kind, "sources": urls, "note": note})


def github(repo, path="", branch="main"):
    return f"https://github.com/marvalkrystof/{repo}/blob/{branch}/{path}"


# A real TUI screenshot from the project's own demo, using sample accounts.
cover("inboxed", "Inboxed / terminal workspace",
      photo(IMAGES / "references/inboxed-tui.jpg", 24, 88, 752, 364), "screenshot",
      [github("inboxed", "promo-video/public/tui/messages-approved.png")],
      "Actual Inboxed demo screenshot; sample messages, no synthetic interface.")

# Existing UTA screenshot: use the actual utility chart rather than shrinking all UI.
cover("uta", "UTA / marginal utility",
      crop(IMAGES / "uta.png", (1813, 995), (40, 440, 1720, 555), (30, 84, 740, 380), "uta-chart"), "screenshot crop",
      ["public/images/uta.png", github("UTA", "frontend/views.py", "master")],
      "Chart detail from the existing UTA application screenshot.")

# The real public camera feed is already edge-filtered by the camera provider.
cover("cvut_menza_detektor", "ČVUT / Technická camera",
      crop(IMAGES / "references/menza-technicka.jpg", (800, 600), (0, 70, 800, 420), (28, 82, 744, 390), "camera"), "camera frame",
      ["https://agata.suz.cvut.cz/jidelnicky/tm-cam-img.php?x=1", github("cvut-menza-detektor", "cam_scrape.py")],
      "Real public Technická cafeteria camera frame, captured 2026-10-27. No invented detection boxes.")

cover("car_crash_estimator", "DamageSense / application",
      rect(28, 108, 744, 328, "#2e2e39")
      + photo(IMAGES / "car_crash_estimator.png", 28, 116, 744, 286)
      + text(48, 426, "Car crash cost estimation", 16, MUTED), "screenshot",
      ["public/images/car_crash_estimator.png", github("car_crash_estimator", "README.md")],
      "Existing real DamageSense landing-page screenshot, framed without stretching.")

# Crop the actual repository wireframe to the relevant seat map and checkout.
wireframe = crop(IMAGES / "references/event-viewer.svg", (900, 900), (0, 300, 900, 600), (55, 85, 690, 380), "seat-map")
cover("event_reservation_system", "Reservations / repository wireframe", wireframe,
      "repository wireframe crop", [github("Event-Reservation-System", "wireframes/event-viewer.svg")],
      "Actual repository seat-selection and checkout wireframe; not a screenshot of the running app.")

# Orthographic projection of the XYZ sample. Coordinates determine bond geometry.
atoms = [("O", 0, 0), ("H", .758602, .504284), ("H", -.758602, .504284)]
points = [(name, 400 + x * 230, 200 + z * 230) for name, x, z in atoms]
body = line(points[0][1], points[0][2], points[1][1], points[1][2], MUTED, 9)
body += line(points[0][1], points[0][2], points[2][1], points[2][2], MUTED, 9)
for name, x, y in points:
    body += circle(x, y, 48 if name == "O" else 34, "#b26778" if name == "O" else "#d4d1dd", BG)
    body += text(x, y + 8, name, 25, BG, text_anchor="middle")
body += text(400, 445, "H₂O · data/water.xyz", 19, MUTED, text_anchor="middle")
cover("molecule_visualizer", "Molecule visualizer / XYZ sample", body,
      "coordinate-based diagram", [github("molecule-visualizer", "data/water.xyz")],
      "Flat projection of the repository's actual water.xyz coordinates; not an application screenshot.")

# Actual perceptron example: two binary inputs and the AND truth table.
body = line(160, 180, 365, 270, MUTED, 3) + line(160, 350, 365, 270, MUTED, 3)
body += line(425, 270, 555, 270, MUTED, 3)
for x, y, label in [(145, 180, "x₁"), (145, 350, "x₂"), (395, 270, "Σ")]:
    body += circle(x, y, 39, PANEL, ACCENT) + text(x, y + 9, label, 28, INK, text_anchor="middle")
body += text(485, 247, "step", 16, MUTED)
body += rect(565, 123, 185, 278)
for i, row in enumerate(["x₁ x₂  AND", " 0  0   0", " 0  1   0", " 1  0   0", " 1  1   1"]):
    body += text(583, 162 + i * 49, row, 19, ACCENT if i == 4 else MUTED)
cover("c_ann", "c_ann / perceptron", body, "source-based diagram",
      [github("c_ann", "perceptron.c")],
      "Diagram of the single perceptron and AND training example implemented in perceptron.c.")

# Source-backed API routes, without presenting a made-up server response.
body = text(48, 119, "/api/books", 32, INK)
for i, (verb, route, color) in enumerate([
    ("GET", "/api/books", "#94bfae"), ("POST", "/api/books", ACCENT),
    ("GET", "/api/books/{id}", "#94bfae"), ("PUT", "/api/books/{id}", "#cfbc8a"),
    ("DELETE", "/api/books/{id}", "#c78d99")
]):
    y = 151 + i * 59
    body += rect(40, y, 720, 48) + text(58, y + 31, verb, 19, color) + text(190, y + 31, route, 20, MUTED)
cover("book_inventory", "Bookstore / REST API", body, "source-based endpoint reference",
      [github("bookstore_inventory_be", "src/main/java/com/krystofmarval/bookstoreinventory/controller/BookController.java")],
      "Real endpoint mappings from BookController.java; a reference graphic, not an API execution trace.")

# A compact version of the documented search / reranking pipeline.
body = rect(45, 103, 710, 63) + text(68, 143, "Describe your next read…", 24, INK)
for i, label in enumerate(["EMBED", "SEARCH", "RERANK"]):
    x = 45 + i * 247
    body += rect(x, 217, 216, 70, PANEL, 7, LINE) + text(x + 108, 260, label, 20, ACCENT, text_anchor="middle")
    if i < 2:
        body += line(x + 217, 252, x + 240, 252, MUTED, 2)
for i, w in enumerate([604, 478, 361]):
    y = 333 + i * 43
    body += text(48, y + 20, f"0{i + 1}", 18, MUTED) + rect(105, y, w, 25, ["#9e8bbb", "#726584", "#51485e"][i], 3)
cover("book_recommender", "Books / semantic recommendations", body, "documented architecture diagram",
      [github("Book-Recommender-System", "README.md"), github("Book-Recommender-System", "utils.py")],
      "Simplified embedding, search, reranking pipeline. Bars illustrate ranked results, not measured scores.")

# Exact dynamic-programming values for an explicitly illustrative 0/1 instance.
weights, values, capacity = [2, 3, 4], [3, 4, 5], 7
dp = [[0] * (capacity + 1) for _ in range(4)]
for i, (weight, value) in enumerate(zip(weights, values), 1):
    for c in range(capacity + 1):
        dp[i][c] = max(dp[i - 1][c], dp[i - 1][c - weight] + value if c >= weight else 0)
body = text(50, 119, "CAPACITY", 17, MUTED)
for c in range(8):
    body += text(235 + c * 68, 119, c, 18, MUTED, text_anchor="middle")
for i, row in enumerate(dp):
    y = 150 + i * 69
    body += text(48, y + 35, "∅" if i == 0 else f"item {i}", 19, MUTED)
    for c, value in enumerate(row):
        body += rect(207 + c * 68, y, 57, 54, ACCENT if (i, c) == (3, 7) else PANEL, 5)
        body += text(235 + c * 68, y + 35, value, 22, BG if (i, c) == (3, 7) else INK, text_anchor="middle")
body += text(48, 466, "0/1 dynamic programming · illustrative instance", 16, MUTED)
cover("knapsack", "Knapsack / dynamic programming", body, "computed example diagram",
      [github("0-1-Knapsack-Problem---four-ways", "README.md")],
      "Computed 0/1 DP table for illustrative weights [2,3,4], values [3,4,5], capacity 7. Not a benchmark.")

# Preserve the remaining original artwork inside the same cover treatment.
cover("sw_logo", "Star Wars / encyclopedia",
      photo(IMAGES / "sw_logo.png", 28, 84, 744, 388), "existing project artwork",
      ["public/images/sw_logo.png"],
      "Original Star Wars logo preserved inside the shared dark frame and header, without cropping or stretching.")

cover("ascii_art_pengu", "ASCII converter / sample output",
      photo(IMAGES / "ascii_art_pengu.png", 28, 84, 744, 388), "existing project output",
      ["public/images/ascii_art_pengu.png"],
      "Original ASCII penguin output preserved inside the shared dark frame and header, without cropping or stretching.")

(ROOT / "docs/project-image-sources.json").write_text(json.dumps({
    "approach": "Real project screenshots, a real camera frame, repository wireframe, and deterministic SVG reference diagrams. No AI-generated imagery.",
    "generator": "scripts/build_project_thumbnails.py",
    "images": SOURCES,
}, indent=2, ensure_ascii=False) + "\n")
print(f"Built {len(SOURCES)} project covers.")
