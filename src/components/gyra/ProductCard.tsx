import { Link } from "@tanstack/react-router";
import { discountPercent, formatINR, type Product } from "@/lib/products";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product: p }: { product: Product }) {
  const off = discountPercent(p);
  return (
    <article className="group relative">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img src={p.images[0]} alt={p.name} loading="lazy" width={912} height={1104}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {p.isNewArrival && <span className="eyebrow bg-card px-2 py-1 text-[0.6rem] text-primary">New</span>}
            {p.isBestseller && <span className="eyebrow bg-plum px-2 py-1 text-[0.6rem] text-plum-foreground">Bestseller</span>}
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-sans text-sm font-medium text-foreground">{p.name}</h3>
          <p className="flex items-baseline gap-2 text-sm">
            <span className="font-semibold text-plum">{formatINR(p.price)}</span>
            {off && <><s className="text-xs text-muted-foreground">{formatINR(p.originalPrice!)}</s><span className="text-xs font-semibold text-success">{off}% off</span></>}
          </p>
        </div>
      </Link>
      <WishlistButton id={p.id} name={p.name} className="absolute right-3 top-3" />
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
