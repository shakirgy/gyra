import { createFileRoute } from "@tanstack/react-router";
import { IS_SAMPLE_CATALOGUE, products } from "@/lib/products";
import { ProductBrowser } from "@/components/gyra/ProductBrowser";
import { PageHeading } from "@/components/gyra/SiteChrome";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: seo("Shop All Jewellery — GYRA", "Browse every GYRA piece: earrings, necklaces, bracelets, bangles and rings.") }),
  component: Shop,
});

export function SampleNote() {
  if (!IS_SAMPLE_CATALOGUE) return null;
  return <p className="mb-6 bg-muted px-4 py-3 text-xs text-muted-foreground">Preview catalogue — sample pieces shown for layout. Real GYRA products coming soon.</p>;
}

function Shop() {
  return (
    <>
      <PageHeading eyebrow="The collection" title="Shop All">Everything we love right now, in one place.</PageHeading>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SampleNote />
        <ProductBrowser products={products} />
      </div>
    </>
  );
}
