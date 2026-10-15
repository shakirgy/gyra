import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { formatINR, products } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { WhatsAppOrderButton } from "@/components/gyra/WhatsAppOrderButton";
import { PageHeading } from "@/components/gyra/SiteChrome";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: seo("Your Wishlist — GYRA", "The GYRA pieces you've saved. Order any of them on WhatsApp.") }),
  component: Wishlist,
});

function Wishlist() {
  const { ids, remove } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));
  return (
    <>
      <PageHeading eyebrow="Saved for later" title="Your Wishlist">Saved on this device only.</PageHeading>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        {saved.length === 0 ? (
          <div className="border border-dashed py-20 text-center">
            <h2 className="text-2xl text-plum">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any piece to save it here.</p>
            <Link to="/shop" className="btn-primary mt-6">Shop now</Link>
          </div>
        ) : (
          <ul className="divide-y border-y">
            {saved.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-5">
                <Link to="/product/$slug" params={{ slug: p.slug }} className="shrink-0"><img src={p.images[0]} alt={p.name} className="h-28 w-24 object-cover" /></Link>
                <div className="min-w-0 flex-1">
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="font-serif text-xl text-plum">{p.name}</Link>
                  <p className="mt-1 text-sm font-semibold">{formatINR(p.price)}</p>
                  <div className="mt-3">
                    {p.variants ? <Link to="/product/$slug" params={{ slug: p.slug }} className="text-sm font-semibold text-primary link-underline">Choose {p.variants.label.toLowerCase()} to order</Link>
                      : <WhatsAppOrderButton product={p} compact className="px-4 py-2.5" />}
                  </div>
                </div>
                <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} className="p-2 text-muted-foreground hover:text-plum"><X className="h-5 w-5" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
