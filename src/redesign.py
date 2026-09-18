from pathlib import Path
root = Path(__file__).resolve().parents[1]
assert (root / "index.html").is_file(), "Missing index.html"
print("Linkiir static site ready at repository root")
