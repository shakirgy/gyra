import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Gift, MessageCircle, Percent, Sparkles, Star } from "lucide-react";
import style from "@/assets/style.jpg";
import { seo } from "@/lib/seo";
import { featuredCreators, formatViews, pastCollaborations, topReels } from "@/lib/creators";
import { creatorApplicationMessage, generalEnquiryLink, whatsappLink, type CreatorApplication } from "@/lib/whatsapp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/creator-club")({
  head: () => ({
    meta: seo("GYRA Creator Club — Collaborate with GYRA", "Style GYRA jewellery in your Reels. Apply to the GYRA Creator Club on WhatsApp for gifting, creator codes and paid collaborations."),
  }),
  component: CreatorClub,
});

const perks = [
  { icon: Gift, t: "Curated gifting", d: "Pieces picked to suit your style and your feed." },
  { icon: Percent, t: "Creator discount codes", d: "A personal code to share with your community." },
  { icon: Sparkles, t: "Early access", d: "First look at new arrivals before they launch." },
  { icon: Star, t: "Feature spotlights", d: "A chance to be featured on GYRA's pages." },
];

const tiers = [
  { t: "Gifting collaborations", d: "For creators of every size who love styling jewellery. Receive pieces and create content you're proud of." },
  { t: "Creator discount", d: "Share a personal code with your audience. Terms are confirmed directly with GYRA on WhatsApp." },
  { t: "Paid opportunities", d: "Longer-term styling campaigns and seasonal edits, discussed one-on-one." },
];

const faqs = [
  { q: "Do I need a minimum follower count?", a: "No fixed minimum. We look for authentic styling, good light and a feed that feels like you." },
  { q: "How do I apply?", a: "Fill in the form below and tap Submit Application. WhatsApp opens with your details ready — press Send in WhatsApp to send it to GYRA." },
  { q: "Is my application saved on this website?", a: "No. Nothing is stored here. GYRA only receives your application once you send the WhatsApp message." },
  { q: "When will I hear back?", a: "GYRA replies on WhatsApp. Timelines depend on upcoming collaborations." },
];

const categories = ["Fashion", "Lifestyle", "Beauty", "Styling / OOTD", "College life", "Other"];
const preferences = ["Gifted products", "Creator discount", "Paid opportunity", "Open to discussion"];

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(80),
  instagram: z.string().trim().regex(/^@?[A-Za-z0-9._]{1,30}$/, "Enter a valid Instagram handle"),
  profile: z.string().trim().url("Enter your full profile link").max(200).refine((u) => /instagram\.com/i.test(u), "Use your instagram.com profile link"),
  city: z.string().trim().min(1, "Please add your city").max(60),
  followers: z.string().trim().max(40),
  category: z.string().min(1, "Choose a category"),
  views: z.string().trim().max(40),
  why: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(500),
  preferred: z.string().min(1, "Choose a preference"),
});

const empty: CreatorApplication = { name: "", instagram: "", profile: "", city: "", followers: "", category: "", views: "", why: "", preferred: "" };

function CreatorClub() {
  const collab = generalEnquiryLink("collaboration");
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 md:grid-cols-2 md:px-8 md:pt-16">
        <div className="animate-rise">
          <p className="eyebrow mb-3 text-primary">GYRA Creator Club</p>
          <h1 className="text-5xl text-plum md:text-7xl">Your Style. Your Voice. Our Sparkle.</h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">Love styling jewellery for your Reels? Join a circle of creators who make everyday looks feel special with GYRA.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#apply" className="btn-primary">Become a GYRA Creator</a>
            {collab && <a href={collab} target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle className="h-4 w-4" /> Collaborate With GYRA</a>}
          </div>
        </div>
        <img src={style} alt="GYRA rings and bangles styled together" width={1200} height={1408} className="aspect-[4/5] w-full object-cover" />
      </section>

      <Section eyebrow="Why join" title="Made for creators who love to style">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: I, t, d }) => (
            <div key={t} className="border bg-card p-6"><I className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl text-plum">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Ways to collaborate" title="Find your fit">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <div key={t.t} className="border-t-2 border-primary bg-secondary p-6"><p className="eyebrow text-primary">0{i + 1}</p><h3 className="mt-3 text-2xl text-plum">{t.t}</h3><p className="mt-3 text-sm text-muted-foreground">{t.d}</p></div>
          ))}
        </div>
      </Section>

      <Showcase />

      <Section eyebrow="Apply" title="Join the Creator Club" id="apply">
        <ApplicationForm />
      </Section>

      <Section eyebrow="Questions" title="Good to know">
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}><AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}

function Section({ eyebrow, title, id, children }: { eyebrow: string; title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto mt-24 max-w-7xl scroll-mt-28 px-4 md:px-8">
      <p className="eyebrow mb-3 text-primary">{eyebrow}</p>
      <h2 className="mb-10 text-3xl text-plum md:text-5xl">{title}</h2>
      {children}
    </section>
  );
}

function Showcase() {
  const nothing = !featuredCreators.length && !topReels.length && !pastCollaborations.length;
  if (nothing) {
    return (
      <Section eyebrow="Creator spotlight" title="Our first creators could be you">
        <div className="border border-dashed bg-card p-10 text-center">
          <p className="mx-auto max-w-lg text-muted-foreground">Featured creators, most-watched Reels and past collaborations will appear here as GYRA partners with creators.</p>
          <a href="#apply" className="btn-primary mt-6">Apply now</a>
        </div>
      </Section>
    );
  }
  return (
    <>
      {featuredCreators.length > 0 && (
        <Section eyebrow="Featured creators" title="Styled by our creators">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featuredCreators.map((c) => (
              <a key={c.handle} href={c.profileUrl} target="_blank" rel="noopener noreferrer" className="group">
                <img src={c.image} alt={c.name} loading="lazy" className="aspect-square w-full object-cover" />
                <p className="mt-3 font-serif text-xl text-plum">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.handle}{c.city ? ` · ${c.city}` : ""}</p>
              </a>
            ))}
          </div>
        </Section>
      )}
      {topReels.length > 0 && (
        <Section eyebrow="Most-watched" title="Reels everyone loved">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {topReels.map((r) => (
              <a key={r.reelUrl} href={r.reelUrl} target="_blank" rel="noopener noreferrer">
                <img src={r.thumbnail} alt={r.title} loading="lazy" className="aspect-[9/16] w-full object-cover" />
                <p className="mt-3 text-sm font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.creatorHandle}{r.views ? ` · ${formatViews(r.views)} views` : ""}</p>
                {r.views && r.viewsVerifiedOn && <p className="text-xs text-muted-foreground">Views checked {new Date(r.viewsVerifiedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>}
              </a>
            ))}
          </div>
        </Section>
      )}
      {pastCollaborations.length > 0 && (
        <Section eyebrow="Previous collaborations" title="From the GYRA circle">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {pastCollaborations.map((c) => (
              <a key={c.postUrl} href={c.postUrl} target="_blank" rel="noopener noreferrer">
                <img src={c.image} alt={c.caption ?? `Collaboration with ${c.creatorHandle}`} loading="lazy" className="aspect-square w-full object-cover" />
              </a>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

const field = "w-full border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

function ApplicationForm() {
  const [v, setV] = useState<CreatorApplication>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CreatorApplication, string>>>({});
  const [ready, setReady] = useState<string | null>(null);
  const set = (k: keyof CreatorApplication) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setV({ ...v, [k]: e.target.value }); setReady(null); };

  const message = useMemo(() => ready, [ready]);
  const link = message ? whatsappLink(message) : null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(v);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => { const k = i.path[0] as keyof CreatorApplication; errs[k] ??= i.message; });
      setErrors(errs); setReady(null); return;
    }
    setErrors({});
    const d = r.data;
    const msg = creatorApplicationMessage({ ...d, instagram: d.instagram.startsWith("@") ? d.instagram : `@${d.instagram}` });
    setReady(msg);
    const url = whatsappLink(msg);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  const F = ({ k, label, children }: { k: keyof CreatorApplication; label: string; children: React.ReactNode }) => (
    <label className="block"><span className="mb-1.5 block text-sm font-medium">{label}</span>{children}{errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}</label>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
        {F({ k: "name", label: "Name *", children: <input className={field} value={v.name} onChange={set("name")} autoComplete="name" /> })}
        {F({ k: "instagram", label: "Instagram handle *", children: <input className={field} value={v.instagram} onChange={set("instagram")} placeholder="@yourhandle" /> })}
        {F({ k: "profile", label: "Instagram profile link *", children: <input className={field} type="url" value={v.profile} onChange={set("profile")} placeholder="https://instagram.com/yourhandle" /> })}
        {F({ k: "city", label: "City *", children: <input className={field} value={v.city} onChange={set("city")} /> })}
        {F({ k: "followers", label: "Follower range (optional)", children: <input className={field} value={v.followers} onChange={set("followers")} placeholder="e.g. 5K–10K" /> })}
        {F({ k: "views", label: "Typical Reel views (optional)", children: <input className={field} value={v.views} onChange={set("views")} placeholder="e.g. 2K–8K" /> })}
        {F({ k: "category", label: "Content category *", children: (
          <select className={field} value={v.category} onChange={set("category")}><option value="">Choose one</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        ) })}
        {F({ k: "preferred", label: "Preferred collaboration *", children: (
          <select className={field} value={v.preferred} onChange={set("preferred")}><option value="">Choose one</option>{preferences.map((c) => <option key={c}>{c}</option>)}</select>
        ) })}
        <div className="sm:col-span-2">
          {F({ k: "why", label: "Why you'd love to collaborate *", children: <textarea className={`${field} min-h-28`} value={v.why} onChange={set("why")} maxLength={500} /> })}
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Submit Application</button>
          <p className="mt-3 text-xs text-muted-foreground">This opens WhatsApp with your application ready. GYRA only receives it after you press Send in WhatsApp. Nothing is saved on this website.</p>
        </div>
      </form>
      <aside className="self-start bg-secondary p-6">
        <p className="eyebrow mb-3 text-primary">Message preview</p>
        {message ? (
          <>
            <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">{message}</pre>
            {link && <p className="mt-5 text-sm">WhatsApp didn't open? <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Open WhatsApp here</a>, then press Send.</p>}
          </>
        ) : <p className="text-sm text-muted-foreground">Fill in the form and tap Submit Application to see your message here.</p>}
      </aside>
    </div>
  );
}
