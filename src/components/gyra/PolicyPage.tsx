import { MessageCircle } from "lucide-react";
import { PageHeading } from "./SiteChrome";
import { generalEnquiryLink, type enquiries } from "@/lib/whatsapp";

export function PolicyPage({ title, sections, enquiry = "general", cta = "Ask us on WhatsApp" }: {
  title: string; sections: { h: string; p: string }[]; enquiry?: keyof typeof enquiries; cta?: string;
}) {
  const wa = generalEnquiryLink(enquiry);
  return (
    <>
      <PageHeading eyebrow="Policies" title={title} />
      <div className="mx-auto max-w-3xl space-y-8 px-4 md:px-8">
        <p className="bg-muted px-4 py-3 text-xs text-muted-foreground">Draft policy — GYRA will confirm final terms. Please message us on WhatsApp with any questions.</p>
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl text-plum">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
        {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-4 w-4" /> {cta}</a>}
      </div>
    </>
  );
}
