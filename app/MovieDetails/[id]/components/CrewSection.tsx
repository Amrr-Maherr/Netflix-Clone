import Slider from "@/app/Components/Slider/Slider";
import CrewCard from "./CrewCard";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

export default function CrewSection({ crew }: { crew: any[] }) {
  const slidesCount = useVisibleSlidesCount();
  const keyCrew = crew.filter((c) => ["Director", "Writer"].includes(c.job));
  if (!keyCrew.length) return null;

  return (
    <section className="space-y-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Key Crew</h2>

      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
        {keyCrew.map((member) => (
          <CrewCard key={member.credit_id} member={member} />
        ))}
      </Slider>
    </section>
  );
}
