#!/usr/bin/env python3
"""
Genera las imágenes Open Graph de Kodal (1200x630).

    pip install cairosvg qrcode fonttools brotli pillow
    python3 docs/brand/og/generate.py

Salidas:
    public/og-image.png            principal (variante "promesa")
    docs/brand/og/alt-producto.png
    docs/brand/og/alt-marca-claro.png
    docs/brand/og/alt-marca-oscuro.png

Las tipografías Inter se instalan solas a partir de
node_modules/@fontsource-variable/inter. Requiere `pnpm install` previo.
"""

import base64, random, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = ROOT / "docs" / "brand" / "og"
PUBLIC = ROOT / "public"

W, H = 1200, 630

# Tokens — ver docs/brand/design-tokens.md
CREAM  = "#FEFBF4"
CARD   = "#FFF8EA"
NAVY   = "#001A41"
ORANGE = "#E46212"
YELLOW = "#FFA701"
MUTED  = "#555555"
BORDER = "#E1DED7"


# ─────────────────────────────────────────────── fuentes
def ensure_fonts():
    """Instancia Inter estática desde el woff2 variable de node_modules."""
    fonts_dir = Path.home() / ".fonts"
    if all((fonts_dir / f"Inter-{n}.ttf").exists()
           for n in ("Regular", "SemiBold", "Bold", "ExtraBold")):
        return
    src = ROOT / "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"
    if not src.exists():
        sys.exit(f"Falta {src}. Corré `pnpm install` primero.")
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer

    fonts_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        vf = Path(tmp) / "Inter-VF.ttf"
        f = TTFont(src); f.flavor = None; f.save(vf)
        for weight, name in [(400, "Regular"), (600, "SemiBold"),
                             (700, "Bold"), (800, "ExtraBold")]:
            inst = instancer.instantiateVariableFont(TTFont(vf), {"wght": weight})
            for rec in inst["name"].names:
                if rec.nameID in (1, 4, 16):   rec.string = f"Inter {name}"
                elif rec.nameID == 2:          rec.string = "Regular"
                elif rec.nameID == 6:          rec.string = f"Inter{name}-Regular"
            inst.save(fonts_dir / f"Inter-{name}.ttf")
    subprocess.run(["fc-cache", "-f"], capture_output=True)
    print("→ Inter instalada en ~/.fonts")


# ─────────────────────────────────────────────── assets
def b64_png(path: Path) -> str:
    return "data:image/png;base64," + base64.b64encode(path.read_bytes()).decode()


def qr_data_uri(url="https://kodal.pet/") -> str:
    """QR navy sobre blanco, corrección H (30%) — docs/brand/design-tokens.md §9."""
    import io, qrcode
    qr = qrcode.QRCode(version=3, error_correction=qrcode.constants.ERROR_CORRECT_H,
                       box_size=10, border=0)
    qr.add_data(url); qr.make(fit=True)
    buf = io.BytesIO()
    qr.make_image(fill_color=NAVY, back_color="white").save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def paws(seed=1, n=14, opacity=.05) -> str:
    """Huellitas de fondo, muy sutiles."""
    random.seed(seed)
    out = []
    for _ in range(n):
        x, y = random.randint(-40, W + 40), random.randint(-40, H + 40)
        s, r = random.uniform(.55, 1.15), random.randint(-35, 35)
        out.append(
            f'<g transform="translate({x},{y}) rotate({r}) scale({s})" '
            f'opacity="{opacity}" fill="{NAVY}">'
            '<ellipse cx="0" cy="14" rx="17" ry="14"/><ellipse cx="-19" cy="-8" rx="7.5" ry="10"/>'
            '<ellipse cx="-6.5" cy="-16" rx="7.5" ry="10"/><ellipse cx="7.5" cy="-16" rx="7.5" ry="10"/>'
            '<ellipse cx="19" cy="-8" rx="7.5" ry="10"/></g>')
    return "".join(out)


STYLE = """<style>
  .xb { font-family:'Inter ExtraBold'; }
  .bd { font-family:'Inter Bold'; }
  .sb { font-family:'Inter SemiBold'; }
  .rg { font-family:'Inter Regular'; }
</style>"""

SVG_OPEN = (f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'width="{W}" height="{H}" viewBox="0 0 {W} {H}">{STYLE}')


# ─────────────────────────────────────────────── variantes
def v_promesa(iso):
    """Principal. Marca + promesa + qué es + CTA."""
    return f'''{SVG_OPEN}
<rect width="{W}" height="{H}" fill="{CREAM}"/>
{paws(3, 16, .045)}
<rect x="0" y="0" width="14" height="{H}" fill="{ORANGE}"/>

<text class="sb" x="86" y="122" font-size="22" fill="{ORANGE}" letter-spacing="4.4">PERDERLOS NO DEBERÍA SER UNA OPCIÓN</text>

<text class="xb" x="82" y="278" font-size="118" fill="{NAVY}" letter-spacing="-4">Kodal</text>
<text class="sb" x="86" y="340" font-size="44" fill="{ORANGE}" letter-spacing="-.6">Siempre vuelven a casa</text>

<text class="rg" x="86" y="410" font-size="26" fill="{MUTED}">Medalla inteligente con QR. Si tu mascota se pierde,</text>
<text class="rg" x="86" y="448" font-size="26" fill="{MUTED}">quien la encuentre te contacta al instante.</text>

<rect x="86" y="496" width="252" height="62" rx="12" fill="{ORANGE}"/>
<text class="bd" x="212" y="536" font-size="25" fill="#FFFFFF" text-anchor="middle">Conseguí la tuya</text>
<text class="sb" x="368" y="536" font-size="25" fill="{NAVY}">kodal.pet</text>

<image xlink:href="{iso}" x="826" y="158" width="318" height="318"/>
</svg>'''


def v_producto(iso, qr):
    """Alternativa: cómo funciona. El QR es real y apunta a kodal.pet."""
    return f'''{SVG_OPEN}
<rect width="{W}" height="{H}" fill="{CREAM}"/>
{paws(7, 12, .04)}

<image xlink:href="{iso}" x="84" y="58" width="76" height="76"/>
<text class="xb" x="176" y="102" font-size="40" fill="{NAVY}" letter-spacing="-1.3">Kodal</text>
<text class="sb" x="177" y="130" font-size="18" fill="{ORANGE}">Siempre vuelven a casa</text>

<text class="xb" x="84" y="288" font-size="70" fill="{NAVY}" letter-spacing="-2.2">Un escaneo y</text>
<text class="xb" x="84" y="368" font-size="70" fill="{ORANGE}" letter-spacing="-2.2">vuelve a casa<tspan fill="{NAVY}">.</tspan></text>

<text class="rg" x="86" y="430" font-size="26" fill="{MUTED}">Sin apps, sin batería, sin vueltas.</text>

<g class="sb" font-size="21" fill="{NAVY}">
  <circle cx="97" cy="503" r="9" fill="{ORANGE}"/><text x="120" y="510">Escaneá</text>
  <circle cx="277" cy="503" r="9" fill="{ORANGE}"/><text x="300" y="510">Completá</text>
  <circle cx="477" cy="503" r="9" fill="{ORANGE}"/><text x="500" y="510">Protegé</text>
</g>
<text class="sb" x="86" y="570" font-size="23" fill="{MUTED}">kodal.pet</text>

<g transform="translate(742,112)">
  <rect x="0" y="0" width="396" height="406" rx="30" fill="{CARD}" stroke="{BORDER}" stroke-width="2"/>
  <rect x="66" y="52" width="264" height="264" rx="20" fill="#FFFFFF" stroke="{BORDER}" stroke-width="2"/>
  <image xlink:href="{qr}" x="90" y="76" width="216" height="216"/>
  <text class="sb" x="198" y="366" font-size="24" fill="{NAVY}" text-anchor="middle">escaneame</text>
</g>
</svg>'''


def v_marca(iso, dark=False):
    """Alternativa: solo marca. La clara respeta mejor el isotipo (contornos navy)."""
    bg      = NAVY if dark else CREAM
    title   = "#FFFFFF" if dark else NAVY
    tagline = YELLOW if dark else ORANGE
    body    = "#C8D4E8" if dark else MUTED
    rule    = '#FFFFFF" stroke-opacity=".22' if dark else BORDER
    blobs = ('<g opacity=".07" fill="#FFFFFF"><circle cx="1090" cy="80" r="230"/>'
             '<circle cx="120" cy="600" r="180"/></g>' if dark else
             f'<g opacity=".5" fill="{CARD}"><circle cx="1090" cy="80" r="230"/>'
             f'<circle cx="120" cy="600" r="180"/></g>{paws(11, 10, .04)}')
    return f'''{SVG_OPEN}
<rect width="{W}" height="{H}" fill="{bg}"/>
{blobs}
<image xlink:href="{iso}" x="470" y="92" width="260" height="260"/>
<text class="xb" x="600" y="452" font-size="86" fill="{title}" text-anchor="middle" letter-spacing="-2.8">Kodal</text>
<text class="sb" x="600" y="504" font-size="31" fill="{tagline}" text-anchor="middle">Siempre vuelven a casa</text>
<line x1="470" y1="540" x2="730" y2="540" stroke="{rule}" stroke-width="2"/>
<text class="rg" x="600" y="580" font-size="23" fill="{body}" text-anchor="middle">Medallas inteligentes con QR para mascotas · kodal.pet</text>
</svg>'''


# ─────────────────────────────────────────────── render
def render(svg: str, dest: Path):
    """SVG → PNG cuantizado a 128 colores (~40 KB en vez de ~110 KB)."""
    import io, cairosvg
    from PIL import Image
    buf = io.BytesIO()
    cairosvg.svg2png(bytestring=svg.encode(), write_to=buf, output_width=W, output_height=H)
    buf.seek(0)
    (Image.open(buf).convert("RGB")
        .convert("P", palette=Image.ADAPTIVE, colors=128)
        .save(dest, optimize=True))
    print(f"  {dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")


def main():
    ensure_fonts()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    iso = b64_png(PUBLIC / "android-chrome-512x512.png")
    qr = qr_data_uri()

    print("Generando OG images…")
    render(v_promesa(iso),           PUBLIC / "og-image.png")
    render(v_producto(iso, qr),      OUT_DIR / "alt-producto.png")
    render(v_marca(iso, dark=False), OUT_DIR / "alt-marca-claro.png")
    render(v_marca(iso, dark=True),  OUT_DIR / "alt-marca-oscuro.png")
    print("Listo. Purgá el caché de Facebook/WhatsApp si cambiaste la principal.")


if __name__ == "__main__":
    main()
