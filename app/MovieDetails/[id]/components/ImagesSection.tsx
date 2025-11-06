import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function ImagesSection({
  backdrops,
  logos,
  posters,
  images,
}: {
  backdrops: any[];
  logos: any[];
  posters: any[];
  images: any[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);

  // stop rendering if there’s no data at all
  if (!backdrops?.length && !logos?.length && !posters?.length) return null;

  // function to handle open Lightbox with selected group
  const handleOpen = (images: any[], i: number) => {
    setSlides(
      images.map((img) => ({
        src: `https://image.tmdb.org/t/p/original${img.file_path}`,
      }))
    );
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-bold mb-4"> Images & Visuals</h2>

      {/* Backdrops Section */}
      {backdrops?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Cinematic Scenes</h3>
          <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
            {backdrops.map((img, i) => (
              <div
                key={i}
                className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => handleOpen(backdrops, i)}
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
        </div>
      )}

      {/* Logos Section */}
      {logos?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {" "}
            Official Titles & Logos
          </h3>
          <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
            {logos.map((img, i) => (
              <div
                key={i}
                className="relative h-40 md:h-56 bg-gray-100 rounded-lg overflow-hidden shadow-lg cursor-pointer flex items-center justify-center"
                onClick={() => handleOpen(logos, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Logo ${i + 1}`}
                  width={400}
                  height={200}
                  className="object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Posters Section */}
      {posters?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3"> Featured Posters</h3>
          <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
            {posters.map((img, i) => (
              <div
                key={i}
                className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => handleOpen(posters, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Poster ${i + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
      {images?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3"> Featured Posters</h3>
          <Slider slidesPerView={6} slidesPerViewMobile={1.5}>
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => handleOpen(images, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Poster ${i + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Global Lightbox */}
      <Lightbox
        plugins={[Zoom]}
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </section>
  );
}
