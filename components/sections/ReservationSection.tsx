import { PageContainer } from "@/components/ui/PageContainer";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { ContactReservationScroll } from "@/components/sections/ContactReservationScroll";
import { ReservationShaderBackground } from "@/components/sections/ReservationShaderBackground";

export function ReservationSection() {
  return (
    <section
      id="reservar"
      className="relative overflow-hidden bg-reserve py-12 text-reserve-fg md:py-14"
    >
      <ReservationShaderBackground />
      <PageContainer size="wide" className="relative z-10">
        <ContactReservationScroll>
          <ReservationForm
            onLightCard
            className="border-0 bg-transparent p-0 shadow-none md:p-0"
          />
        </ContactReservationScroll>
      </PageContainer>
    </section>
  );
}
