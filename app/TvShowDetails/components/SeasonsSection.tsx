import Slider from "@/app/Components/Slider/Slider";
import SeasonCard from "./SeasonCard";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";


export default function SeasonsSection({
  seasons,
  tvId,
}: {
  seasons: any[];
  tvId: string;
}) {
  const slidesCount = useVisibleSlidesCount();

  if (!seasons?.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Seasons</h2>

      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5}>
        {seasons.map((season) => (
          <SeasonCard key={season.id} season={season} tvId={tvId} />
        ))}
      </Slider>
    </section>
  );
}
