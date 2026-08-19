import type { Metadata } from "next";
import { CatalogList } from "@/components/catalog-list";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Katalog — Anka Entertainment",
  description:
    "Setiap rilisan punya ceritanya. Katalog Anka Entertainment, dibagi berdasarkan kepemilikan master.",
};

export default function CatalogPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PageHero
          title={
            <>
              Setiap rilisan{" "}
              <span className="inline-block -rotate-1 rounded-md bg-primary px-3 py-0.5 leading-[1.05] text-primary-foreground">
                punya
              </span>{" "}
              ceritanya.
            </>
          }
          description="Kami bagi rilisan ke dalam tiga kategori berdasarkan kepemilikan master — siapa yang pegang hak rekaman menentukan bagaimana kami menyebut karyanya. Distribusi Musik ditangani Lantuns."
        />

        <section className="bg-background py-20">
          <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-gutter)]">
            <CatalogList />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
