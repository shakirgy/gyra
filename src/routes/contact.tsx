import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Instagram } from "lucide-react";
import { PageHeading } from "@/components/gyra/SiteChrome";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: seo("Contact GYRA", "Questions about a piece or an order? Message GYRA on WhatsApp.") }),
  component: Contact,
});

function Contact() {
  const wa = generalEnquiryLink();
  return (
    <>
      <PageHeading eyebrow="Say hello" title="We'd love to hear from you.">The quickest way to reach us is WhatsApp — ask about a piece, availability or your order.</PageHeading>
      <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 md:px-8">
        {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          : <p className="text-muted-foreground">WhatsApp contact is unavailable right now.</p>}
        {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline"><Instagram className="h-4 w-4" /> Instagram</a>}
      </div>
    </>
  );
}
