import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { discountPercent, formatINR, getCategory, getProduct, inCategory, products } from "@/lib/products";
import { WishlistButton } from "@/components/gyra/WishlistButton";
import { WhatsAppOrderButton } from "@/components/gyra/WhatsAppOrderButton";
import { ProductGrid } from "@/components/gyra/ProductCard";
import { seo } from "@/lib/seo";
import { productQuestionLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo(`${loaderData.product.name} — GYRA`, `${loaderData.product.shortDescription} ${formatINR(loaderData.product.price)}. Order on WhatsApp.`)
      : [{ title: "Piece not found — GYRA" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState<string | undefined>(p.variants?.options.length === 1 ? p.variants.options[0] : undefined);
  const cat = getCategory(p.category)!;
  const off = discountPercent(p);
  const related = products.filter((x) => x.id !== p.id && inCategory(x, p.category)).concat(products.filter((x) => x.id !== p.id && !inCategory(x, p.category))).slice(0, 4);

  return (
    <div key={p.id} className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> <span className="mx-1">/</span>
        <Link to="/category/$slug" params={{ slug: cat.slug }} className="hover:text-primary">{cat.name}</Link> <span className="mx-1">/</span>
        <span className="text-foreground">{p.name}</span>
      </nav>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="flex snap-x snap-mandatory overflow-x-auto md:block" onScroll={(e) => { const el = e.currentTarget; setImg(Math.round(el.scrollLeft / el.clientWidth)); }}>
            {p.images.map((src, i) => (
              <img key={i} src={src} alt={`${p.name} — image ${i + 1}`} width={912} height={1104}
                className={`aspect-[4/5] w-full shrink-0 snap-center object-cover bg-muted ${i === img ? "md:block" : "md:hidden"}`} />
            ))}
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex justify-center gap-2 md:justify-start">
              {p.images.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} className={`overflow-hidden border-2 ${i === img ? "border-primary" : "border-transparent"}`}>
                  <img src={src} alt="" className="h-16 w-14 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow text-primary">{cat.name}</p>
          <h1 className="mt-3 text-4xl text-plum md:text-5xl">{p.name}</h1>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-plum">{formatINR(p.price)}</span>
            {off && <><s className="text-muted-foreground">{formatINR(p.originalPrice!)}</s><span className="text-sm font-semibold text-success">{off}% off</span></>}
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>

          {p.variants && (
            <fieldset className="mt-8">
              <legend className="eyebrow mb-3 text-muted-foreground">{p.variants.label}</legend>
              <div className="flex flex-wrap gap-2">
                {p.variants.options.map((o) => <button key={o} className="chip" data-active={variant === o} onClick={() => setVariant(o)}>{o}</button>)}
              </div>
            </fieldset>
          )}
          {p.availability && <p className={`mt-6 text-sm ${p.availability === "in-stock" ? "text-success" : "text-destructive"}`}>{p.availability === "in-stock" ? "In stock" : "Currently unavailable"}</p>}

          <div className="mt-8 space-y-3">
            <WhatsAppOrderButton product={p} variant={variant} needsVariant={!!p.variants} />
            <WishlistButton id={p.id} name={p.name} withLabel />
            {(() => { const q = productQuestionLink(p); return q ? <a href={q} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">Ask About This Product</a> : null; })()}
            <p className="text-center text-xs text-muted-foreground">Opens WhatsApp with your message ready — review it and tap send.</p>
          </div>

          {(p.material || p.careInstructions) && (
            <dl className="mt-10 divide-y border-y text-sm">
              {p.material && <div className="flex justify-between py-4"><dt className="text-muted-foreground">Material</dt><dd>{p.material}</dd></div>}
              {p.careInstructions && <div className="py-4"><dt className="text-muted-foreground">Care</dt><dd className="mt-1">{p.careInstructions}</dd></div>}
            </dl>
          )}
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-10 text-3xl text-plum md:text-4xl">You might also love</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
