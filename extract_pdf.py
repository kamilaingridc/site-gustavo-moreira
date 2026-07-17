import pypdf, pathlib, sys

base = pathlib.Path("c:/Users/cak6ca/Desktop/site-gustavo-moreira/Site gustavo")
pdfs = list(base.glob("*.pdf"))
for path in pdfs:
    try:
        reader = pypdf.PdfReader(str(path))
        print(f"=== {path.name} ({len(reader.pages)} pages) ===")
        for i, page in enumerate(reader.pages):
            t = page.extract_text()
            if t and t.strip():
                print(f"--- p{i+1} ---")
                print(t[:6000])
    except Exception as e:
        print(f"ERROR {path.name}: {e}")
