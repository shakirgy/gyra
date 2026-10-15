import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Instagram, Menu, MessageCircle, Search, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useWishlist } from "@/lib/wishlist";
import { generalEnquiryLink } from "@/lib/whatsapp";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { label: "Shop All", to: "/shop" as const },
  { label: "Earrings", slug: "earrings" },
  { label: "Necklaces", slug: "necklaces" },
  { label: "Bracelets & Bangles", slug: "bracelets-bangles" },
  { label: "Rings", slug: "rings" },
  { label: "Handpicked", slug: "handpicked" },
];

function NavLink({ item, className, onClick }: { item: (typeof nav)[number]; className?: string; onClick?: () => void }) {
  if ("to" in item && item.to) return <Link to={item.to} className={className} onClick={onClick} activeProps={{ className: "text-primary" }}>{item.label}</Link>;
  return <Link to="/category/$slug" params={{ slug: item.slug! }} className={className} onClick={onClick} activeProps={{ className: "text-primary" }}>{item.label}</Link>;
}

export function Wordmark({ className = "" }: { className?: string }) {
  return <Link to="/" aria-label="GYRA home" className={`wordmark text-2xl text-plum ${className}`}>GYRA</Link>;
}

export function SiteHeader() {
  const { ids } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [msg, setMsg] = useState(0);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    const t = setInterval(() => setMsg((m) => (m + 1) % siteConfig.announcements.length), 4500);
    return () => { window.removeEventListener("scroll", on); clearInterval(t); };
  }, []);

  return (
    <>
      {siteConfig.announcements.length > 0 && (
        <div className="bg-plum py-2 text-center text-[0.7rem] tracking-[0.2em] uppercase text-plum-foreground">{siteConfig.announcements[msg]}</div>
      )}
      <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Sheet>
            <SheetTrigger aria-label="Open menu" className="lg:hidden"><Menu className="h-5 w-5" /></SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-1 p-6 pt-12">
                {nav.map((n) => (
                  <SheetClose asChild key={n.label}><NavLink item={n} className="border-b py-4 font-serif text-2xl" /></SheetClose>
                ))}
                <SheetClose asChild><Link to="/creator-club" className="border-b py-4 font-serif text-2xl text-primary">Creator Club</Link></SheetClose>
                <SheetClose asChild><Link to="/about" className="pt-6 text-sm">About GYRA</Link></SheetClose>
                <SheetClose asChild><Link to="/contact" className="pt-3 text-sm">Contact</Link></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Wordmark />
          <nav className="hidden flex-1 justify-center gap-7 text-[0.78rem] font-medium tracking-wide lg:flex" aria-label="Main">
            {nav.map((n) => <NavLink key={n.label} item={n} className="link-underline transition-colors hover:text-primary" />)}
            <Link to="/creator-club" className="link-underline text-primary" activeProps={{ className: "text-plum" }}>Creator Club</Link>
          </nav>
          <div className="flex items-center gap-4 text-plum">
            <Link to="/shop" aria-label="Search"><Search className="h-5 w-5" /></Link>
            {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden sm:block"><Instagram className="h-5 w-5" /></a>}
            <Link to="/wishlist" aria-label={`Wishlist, ${ids.length} items`} className="relative">
              <Heart className="h-5 w-5" />
              {ids.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">{ids.length}</span>}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  const wa = generalEnquiryLink();
  return (
    <footer className="mt-24 bg-plum text-plum-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <Link to="/" className="wordmark text-3xl">GYRA</Link>
          <p className="mt-4 max-w-xs text-sm opacity-75">Stylish, affordable, handpicked jewellery for the way you really dress.</p>
        </div>
        <FooterCol title="Shop">{nav.map((n) => <NavLink key={n.label} item={n} className="link-underline" />)}</FooterCol>
        <FooterCol title="GYRA">
          <Link to="/about" className="link-underline">About</Link>
          <Link to="/creator-club" className="link-underline">Creator Club</Link>
          <Link to="/contact" className="link-underline">Contact</Link>
          <Link to="/wishlist" className="link-underline">Wishlist</Link>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline">WhatsApp us</a>}
          {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>}
        </FooterCol>
        <FooterCol title="Help">
          <Link to="/shipping-policy" className="link-underline">Shipping Policy</Link>
          <Link to="/returns" className="link-underline">Returns & Exchanges</Link>
          <Link to="/privacy-policy" className="link-underline">Privacy Policy</Link>
        </FooterCol>
      </div>
      <div className="border-t border-plum-foreground/15 py-6 text-center text-xs opacity-60">© {new Date().getFullYear()} GYRA. All rights reserved.</div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><p className="eyebrow mb-4 opacity-60">{title}</p><div className="flex flex-col items-start gap-2.5 text-sm">{children}</div></div>;
}

export function FloatingWhatsApp() {
  const wa = generalEnquiryLink();
  if (!wa) return null;
  return (
    <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat with GYRA on WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 hover:bg-plum">
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}

export function PageHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 md:px-8 md:pt-16">
      {eyebrow && <p className="eyebrow mb-3 text-primary">{eyebrow}</p>}
      <h1 className="text-4xl text-plum md:text-6xl">{title}</h1>
      {children && <div className="mt-4 max-w-xl text-muted-foreground">{children}</div>}
    </div>
  );
}

export { X };
