import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";

export default function ImagesSection({ backdrops }: { backdrops: any[] }) {
  if (!backdrops?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Images from the Movie</h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
      <Slider>
        {backdrops.map((img, i) => (
          <div
            key={i}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
              alt={`Backdrop ${i + 1}`}
              fill
              className="object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </Slider>
      {/* </div> */}
    </section>
  );
}
