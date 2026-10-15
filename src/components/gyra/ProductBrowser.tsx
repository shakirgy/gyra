import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { categories, inCategory, type Product } from "@/lib/products";
import { ProductGrid } from "./ProductCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Sort = "featured" | "newest" | "price-asc" | "price-desc";
const priceRanges = [
  { id: "u300", label: "Under ₹300", test: (n: number) => n < 300 },
  { id: "300-600", label: "₹300 – ₹600", test: (n: number) => n >= 300 && n <= 600 },
  { id: "o600", label: "Above ₹600", test: (n: number) => n > 600 },
];

export function ProductBrowser({ products, hideCategory, initialQuery = "" }: { products: Product[]; hideCategory?: boolean; initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [cats, setCats] = useState<string[]>([]);
  const [price, setPrice] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [flags, setFlags] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("featured");

  const colorOptions = useMemo(() => [...new Set(products.map((p) => p.color).filter(Boolean) as string[])].sort(), [products]);
  const catOptions = categories.filter((c) => products.some((p) => inCategory(p, c.slug)));
  const flagOptions = [
    products.some((p) => p.isNewArrival) && { id: "new", label: "New arrivals" },
    products.some((p) => p.isBestseller) && { id: "best", label: "Bestsellers" },
  ].filter(Boolean) as { id: string; label: string }[];

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const result = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = products.filter((p) => {
      if (term) {
        const catName = categories.find((c) => c.slug === p.category)?.name ?? "";
        const hay = [p.name, catName, p.tags.join(" "), p.shortDescription, p.description].join(" ").toLowerCase();
        if (!hay.includes(term)) return false;
      }
      if (cats.length && !cats.some((c) => inCategory(p, c as never))) return false;
      if (price && !priceRanges.find((r) => r.id === price)!.test(p.price)) return false;
      if (colors.length && (!p.color || !colors.includes(p.color))) return false;
      if (flags.includes("new") && !p.isNewArrival) return false;
      if (flags.includes("best") && !p.isBestseller) return false;
      return true;
    });
    const byName = (a: Product, b: Product) => a.name.localeCompare(b.name);
    return [...list].sort((a, b) => {
      switch (sort) {
        case "newest": return b.createdAt.localeCompare(a.createdAt) || byName(a, b);
        case "price-asc": return a.price - b.price || byName(a, b);
        case "price-desc": return b.price - a.price || byName(a, b);
        default: return Number(!!b.isFeatured) - Number(!!a.isFeatured) || byName(a, b);
      }
    });
  }, [products, q, cats, price, colors, flags, sort]);

  const activeCount = cats.length + colors.length + flags.length + (price ? 1 : 0);
  const clear = () => { setCats([]); setPrice(null); setColors([]); setFlags([]); };

  const filters = (
    <div className="space-y-7">
      {!hideCategory && catOptions.length > 1 && (
        <FilterGroup title="Category">{catOptions.map((c) => <button key={c.slug} className="chip" data-active={cats.includes(c.slug)} onClick={() => toggle(cats, setCats, c.slug)}>{c.name}</button>)}</FilterGroup>
      )}
      <FilterGroup title="Price">{priceRanges.map((r) => <button key={r.id} className="chip" data-active={price === r.id} onClick={() => setPrice(price === r.id ? null : r.id)}>{r.label}</button>)}</FilterGroup>
      {colorOptions.length > 1 && (
        <FilterGroup title="Colour">{colorOptions.map((c) => <button key={c} className="chip" data-active={colors.includes(c)} onClick={() => toggle(colors, setColors, c)}>{c}</button>)}</FilterGroup>
      )}
      {flagOptions.length > 0 && (
        <FilterGroup title="Collections">{flagOptions.map((f) => <button key={f.id} className="chip" data-active={flags.includes(f.id)} onClick={() => toggle(flags, setFlags, f.id)}>{f.label}</button>)}</FilterGroup>
      )}
      {activeCount > 0 && <button onClick={clear} className="text-sm font-semibold text-primary link-underline">Clear filters</button>}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">{filters}</aside>
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search earrings, pearl, hoops…"
              className="w-full rounded-sm border border-input bg-card py-3 pl-10 pr-9 text-sm outline-none focus:border-primary" />
            {q && <button aria-label="Clear search" onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="h-4 w-4" /></button>}
          </label>
          <div className="flex gap-3">
            <Sheet>
              <SheetTrigger className="chip lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters{activeCount ? ` (${activeCount})` : ""}</SheetTrigger>
              <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto bg-background">
                <SheetHeader><SheetTitle className="font-serif text-2xl font-normal">Filters</SheetTitle></SheetHeader>
                <div className="p-4">{filters}</div>
              </SheetContent>
            </Sheet>
            <label className="flex items-center gap-2 text-sm">
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-sm border border-input bg-card px-3 py-3 text-sm outline-none focus:border-primary">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground" aria-live="polite">{result.length} {result.length === 1 ? "piece" : "pieces"}</p>
        {result.length ? <ProductGrid products={result} /> : (
          <div className="border border-dashed py-20 text-center">
            <h3 className="text-2xl">Nothing sparkly here… yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try a different word or clear your filters.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button className="btn-outline" onClick={() => { setQ(""); clear(); }}>Reset</button>
              <Link to="/shop" className="btn-primary">Shop all</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-muted-foreground">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
