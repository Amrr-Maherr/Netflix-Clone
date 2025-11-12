import Slider from "@/app/Components/Slider/Slider";
import SeasonCard from "./SeasonCard";


export default function SeasonsSection({
  seasons,
  tvId,
}: {
  seasons: any[];
  tvId: string;
}) {
  if (!seasons?.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Seasons</h2>

      <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
        {seasons.map((season) => (
          <SeasonCard key={season.id} season={season} tvId={tvId} />
        ))}
      </Slider>
    </section>
  );
}
