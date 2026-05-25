import { PhotoGallery } from "@/components/ui/photo-gallery";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Gallery() {
  return (
    <section
      id="editorial"
      className="overflow-x-auto bg-background py-24 md:overflow-x-clip md:py-32"
    >
      <div className="mx-auto max-w-container px-6 md:px-16">
        <SectionHeader
          eyebrow="09 — EDITORIAL"
          title={
            <>
              Una nueva
              <br />
              <span className="text-accent">estética visual.</span>
            </>
          }
          className="mb-6 text-center md:mb-8 [&_h2]:mx-auto"
          align="center"
        />

        <p className="mx-auto mb-10 max-w-xl text-center text-base text-muted md:mb-14 md:text-lg">
          Monturas, retratos y luz natural: una curaduría visual que refleja cómo
          vemos el diseño óptico contemporáneo.
        </p>

        <PhotoGallery />
      </div>
    </section>
  );
}
