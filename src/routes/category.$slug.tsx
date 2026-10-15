import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCategory, inCategory, products } from "@/lib/products";
import { ProductBrowser } from "@/components/gyra/ProductBrowser";
import { PageHeading } from "@/components/gyra/SiteChrome";
import { SampleNote } from "./shop";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo(`${loaderData.category.name} — GYRA`, `${loaderData.category.blurb} Shop GYRA ${loaderData.category.name.toLowerCase()} and order on WhatsApp.`)
      : [{ title: "Category not found — GYRA" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = products.filter((p) => inCategory(p, category.slug));
  return (
    <>
      <PageHeading eyebrow="Category" title={category.name}>{category.blurb}</PageHeading>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SampleNote />
        <ProductBrowser key={category.slug} products={list} hideCategory />
      </div>
    </>
  );
}
