import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogList, CatalogListView } from "@/components/catalog-list";
import { PageHero } from "@/components/page-hero";
import { StampSticker } from "@/components/stamp-sticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Section } from "@/components/ui/section";

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
              <StampSticker trigger="load" tone="primary" delay={320}>
                punya
              </StampSticker>{" "}
              ceritanya.
            </>
          }
          description="Kami bagi rilisan ke dalam tiga kategori berdasarkan kepemilikan master — siapa yang pegang hak rekaman menentukan bagaimana kami menyebut karyanya. Distribusi Musik ditangani Lantuns."
        />

        {/* Suspense: CatalogList membaca ?kategori= dari URL. Fallback
            berisi seluruh katalog, jadi HTML statis tetap lengkap. */}
        <Section tone="base" space="normal">
          <Suspense fallback={<CatalogListView active="all" />}>
            <CatalogList />
          </Suspense>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
