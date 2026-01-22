import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

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
  const slidesCount = useVisibleSlidesCount();
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
      {/* Backdrops Section */}
      {backdrops?.length > 0 && (
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Cinematic Scenes</h3>
          <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
            {backdrops.map((img, i) => (
              <div
                key={i}
                className="relative h-[40dvh] md:h-[50dvh] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                onClick={() => handleOpen(backdrops, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                  alt={`Backdrop ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Logos Section */}
      {logos?.length > 0 && (
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Official Titles & Logos</h3>
          <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
            {logos.map((img, i) => (
              <div
                key={i}
                className="relative h-[30dvh] md:h-[40dvh] bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer flex items-center justify-center group hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                onClick={() => handleOpen(logos, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Logo ${i + 1}`}
                  width={400}
                  height={200}
                  className="object-contain max-w-full max-h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl"></div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Posters Section */}
      {posters?.length > 0 && (
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Featured Posters</h3>
          <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
            {posters.map((img, i) => (
              <div
                key={i}
                className="relative h-[40dvh] md:h-[50dvh] rounded-xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                onClick={() => handleOpen(posters, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Poster ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl"></div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      {images?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3"> Featured Posters</h3>
          <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5}>
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-[50dvh] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                onClick={() => handleOpen(images, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Poster ${i + 1}`}
                  fill
                  className="object-cover transition duration-500"
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
