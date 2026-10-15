import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import hero from "@/assets/hero.jpg";
import handpicked from "@/assets/handpicked.jpg";
import style from "@/assets/style.jpg";
import { categories, products } from "@/lib/products";
import { siteConfig } from "@/lib/config";
import { ProductGrid } from "@/components/gyra/ProductCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({ meta: seo("GYRA — Your style. Your sparkle.", "Handpicked, affordable jewellery — earrings, necklaces, bangles and rings. Order easily on WhatsApp.") }),
  component: Home,
});

function SectionTitle({ title, sub, link }: { title: string; sub?: string; link?: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl text-plum md:text-5xl">{title}</h2>
        {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {link}
    </div>
  );
}

function Home() {
  const fresh = products.filter((p) => p.isNewArrival).slice(0, 4);
  const best = products.filter((p) => p.isBestseller).slice(0, 4);
  const insta = [hero, style, handpicked, ...categories.slice(0, 3).map((c) => c.image)];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-lilac">
        <div className="mx-auto grid max-w-7xl md:grid-cols-12 md:items-center">
          <div className="order-2 px-4 py-12 md:order-1 md:col-span-5 md:px-8 md:py-24">
            <p className="eyebrow animate-rise text-primary">A little something special</p>
            <h1 className="animate-rise mt-5 text-5xl leading-[1.02] text-plum md:text-7xl" style={{ animationDelay: "80ms" }}>
              Your style.<br /><em className="text-primary">Your sparkle.</em>
            </h1>
            <p className="animate-rise mt-6 max-w-sm text-muted-foreground" style={{ animationDelay: "160ms" }}>
              Discover handpicked jewellery that makes everyday outfits feel a little more you.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link to="/shop" className="btn-primary">Shop the collection</Link>
              <Link to="/about" className="btn-outline">Discover GYRA</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 md:col-span-7">
            <img src={hero} alt="Model wearing gold-tone hoops and layered necklaces" width={1600} height={1104}
              className="aspect-[4/3] h-full w-full object-cover object-[70%_center] md:aspect-auto md:min-h-[640px]" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionTitle title="Find Your Kind of Sparkle" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {categories.map((c, i) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }}
              className={`group relative block overflow-hidden bg-muted ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
              <img src={c.image} alt={c.name} loading="lazy" width={912} height={1104}
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 4 ? "aspect-[2/1] md:aspect-[3/4]" : "aspect-[3/4]"}`} />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-plum/80 to-transparent p-4 pt-12 text-plum-foreground">
                <span className="font-serif text-lg md:text-xl">{c.name}</span>
                <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {fresh.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
          <SectionTitle title="Just Dropped" sub="Fresh finds for your jewellery collection."
            link={<Link to="/shop" className="eyebrow link-underline shrink-0 text-primary">View all</Link>} />
          <ProductGrid products={fresh} />
        </section>
      )}

      {/* Curated feature */}
      <section className="bg-plum text-plum-foreground">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <img src={handpicked} alt="A dish of handpicked GYRA pieces" loading="lazy" width={912} height={1104} className="aspect-square w-full object-cover md:aspect-auto md:h-full" />
          <div className="flex flex-col justify-center px-6 py-16 md:px-16">
            <p className="eyebrow opacity-70">Handpicked</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Picked with Love.<br /><em>Styled by You.</em></h2>
            <p className="mt-5 max-w-sm opacity-80">Little details that bring your personal style together.</p>
            <Link to="/category/$slug" params={{ slug: "handpicked" }} className="btn-primary mt-9 self-start bg-card text-plum hover:bg-secondary">Shop handpicked pieces</Link>
          </div>
        </div>
      </section>

      {best.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <SectionTitle title="The Ones You Love" sub="Pieces we keep coming back to." />
          <ProductGrid products={best} />
        </section>
      )}

      {/* Style inspiration */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-12 md:items-center md:px-8">
        <img src={style} alt="Stacked rings and bangles styled for a college day" loading="lazy" width={1200} height={1408} className="aspect-[4/5] w-full object-cover md:col-span-6" />
        <div className="md:col-span-5 md:col-start-8">
          <p className="eyebrow text-primary">Style notes</p>
          <h2 className="mt-4 text-4xl text-plum md:text-5xl">From lecture hall to late plans.</h2>
          <ul className="mt-8 divide-y border-y">
            {[["College days", "Huggies, a slim band, one bangle. Done."], ["Casual weekends", "Layer a heart necklace over a plain tee."], ["Special occasions", "Go bold with drops and a full stack."]].map(([t, d]) => (
              <li key={t} className="py-5"><p className="font-serif text-xl text-plum">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {siteConfig.reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <SectionTitle title="Love Notes" />
          <div className="grid gap-6 md:grid-cols-3">
            {siteConfig.reviews.map((r, i) => (
              <blockquote key={i} className="bg-muted p-8"><p className="font-serif text-xl text-plum">“{r.text}”</p><footer className="mt-4 text-sm text-muted-foreground">— {r.name}{r.product ? `, ${r.product}` : ""}</footer></blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Instagram */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionTitle title="A Little More GYRA" sub="Find your next favourite piece and style it your way."
          link={siteConfig.instagramUrl ? <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline flex shrink-0 items-center gap-2 text-primary"><Instagram className="h-4 w-4" /> Follow</a> : undefined} />
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {insta.map((src, i) => <img key={i} src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />)}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-4xl text-plum md:text-6xl">Found Something You Love?</h2>
        <p className="mt-4 text-muted-foreground">Your next favourite piece is just a message away.</p>
        <Link to="/shop" className="btn-primary mt-8">Shop GYRA</Link>
      </section>
    </>
  );
}
