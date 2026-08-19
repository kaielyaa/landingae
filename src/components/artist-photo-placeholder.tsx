import { Image as ImageIcon } from "lucide-react";

/** State "kosong" buat foto artist yang belum diupload — bukan gradient
 * palsu yang nyamar jadi foto (itu haram di AGENTS.md, dan itu yang dipakai
 * situs lama). Dibikin jujur nunjukkin ini placeholder, sekalian ngasih
 * gambaran rasio & posisi layout begitu foto asli masuk (rencana lewat
 * Sanity). Ganti jadi <Image> beneran begitu asetnya ada — jangan dibiarin
 * placeholder ini nempel pas udah ada foto. */
export function ArtistPhotoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface-2">
      <div className="flex max-w-[20ch] flex-col items-center gap-2 px-6 text-center text-muted">
        <ImageIcon className="h-6 w-6" aria-hidden />
        <span className="text-[13px] font-semibold leading-[1.5]">
          Foto {name} belum diupload
        </span>
      </div>
    </div>
  );
}
