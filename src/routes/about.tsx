import { createFileRoute, Link } from "@tanstack/react-router";
import style from "@/assets/style.jpg";
import { PageHeading } from "@/components/gyra/SiteChrome";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: seo("About GYRA", "GYRA is a jewellery boutique of stylish, affordable, carefully handpicked pieces for young women.") }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeading eyebrow="Our story" title="Jewellery that feels like you." />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
        <img src={style} alt="Stacked GYRA-style rings and bangles" width={1200} height={1408} className="aspect-[4/5] w-full object-cover" />
        <div className="space-y-5 self-center text-lg leading-relaxed text-muted-foreground">
          <p>GYRA is a little boutique for big personalities. We handpick earrings, necklaces, bracelets, bangles and rings that are stylish, affordable and easy to wear every day.</p>
          <p>Whether it's a college morning, a casual hangout or a special evening, we want finding your next favourite piece to feel simple — just browse, save what you love and message us on WhatsApp.</p>
          <Link to="/shop" className="btn-primary">Explore the collection</Link>
        </div>
      </div>
    </>
  );
}
