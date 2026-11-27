#!/usr/bin/env python3
"""Turn the static export (out/) into one self-contained preview page.

Keeps the server-rendered markup and compiled CSS, inlines fonts and photos as
data URIs, drops Next's runtime and uses preview/standalone.js instead.
Usage: python3 preview/assemble.py <output.html>
"""
import base64, glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
CDN = "https://cdn.jsdelivr.net/npm"
LIBS = [f"{CDN}/gsap@3.13.0/dist/gsap.min.js", f"{CDN}/gsap@3.13.0/dist/ScrollTrigger.min.js",
        f"{CDN}/gsap@3.13.0/dist/SplitText.min.js", f"{CDN}/lenis@1.3.4/dist/lenis.min.js"]


def b64(path, mime):
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


html = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()
html_class = re.search(r'<html[^>]*class="([^"]*)"', html).group(1)
title = re.search(r"<title>(.*?)</title>", html).group(1)
desc = re.search(r'<meta name="description" content="([^"]*)"', html).group(1)
body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)

# Drop Next runtime scripts but keep JSON-LD
body = re.sub(r'<script(?![^>]*application/ld\+json)[^>]*>.*?</script>', "", body, flags=re.S)
body = re.sub(r"<link[^>]*>", "", body)
body = body.replace('<div hidden=""><!--$--><!--/$--></div>', "")

css = ""
for c in glob.glob(os.path.join(OUT, "_next/static/chunks/*.css")):
    css += open(c, encoding="utf-8").read()

def font_sub(m):
    name = os.path.basename(m.group(1).split("?")[0])
    return f"url({b64(os.path.join(OUT, '_next/static/media', name), 'font/woff2')})"
css = re.sub(r"url\(([^)]*\.woff2)\)", font_sub, css)

for img in glob.glob(os.path.join(OUT, "images/*.jpg")):
    uri = b64(img, "image/jpeg")
    body = body.replace(f'"/images/{os.path.basename(img)}"', f'"{uri}"')

sys.path.insert(0, ROOT)
folio = {
    "home": ["01", "Home"], "about": ["02", "About"], "journey": ["03", "Journey"], "skills": ["04", "Skills"],
    "projects": ["05", "Projects"], "experience": ["06", "Experience"], "beyond-work": ["07", "Beyond work"],
    "contact": ["08", "Contact"],
}
js = open(os.path.join(ROOT, "preview/standalone.js"), encoding="utf-8").read()
js = js.replace("__FOLIO__", json.dumps({k: {"no": v[0], "name": v[1]} for k, v in folio.items()}))

boot = (
    "<script>(function(){var d=document.documentElement;d.className+=' " + html_class + "';"
    "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');"
    "setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},4500)}}catch(e){}})();</script>"
)

page = f"""<title>{title.split(' — ')[0]}</title>
<meta name="description" content="{desc}">
<style>{css}
html, body {{ background: var(--color-ivory); color: var(--color-ink); }}
body {{ font-size: 1.0625rem; }}
</style>
{boot}
<div class="grain antialiased">
{body}
</div>
{''.join(f'<script src="{u}"></script>' for u in LIBS)}
<script>{js}</script>
"""
open(sys.argv[1], "w", encoding="utf-8").write(page)
print("wrote", sys.argv[1], f"{len(page)/1024:.0f} KB")
