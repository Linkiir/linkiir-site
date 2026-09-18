from pathlib import Path
root = Path(__file__).resolve().parents[1]
assert (root / "dist/index.html").is_file(), "Missing dist/index.html"
print("Linkiir static site ready: dist/")
