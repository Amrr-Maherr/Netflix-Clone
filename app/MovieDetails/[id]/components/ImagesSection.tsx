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

  // stop rendering if there's no data at all
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
                className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 aspect-video"
                onClick={() => handleOpen(backdrops, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                  alt={`Backdrop ${i + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL="/Netflix_Symbol_RGB.png"
                  priority
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
                className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 aspect-square flex items-center justify-center"
                onClick={() => handleOpen(logos, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Logo ${i + 1}`}
                  fill
                  className="object-contain max-w-full max-h-full p-4"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL="/Netflix_Symbol_RGB.png"
                  priority
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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

      {/* Posters Section */}
      {posters?.length > 0 && (
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Featured Posters</h3>
          <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
            {posters.map((img, i) => (
              <div
                key={i}
                className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 aspect-[2/3]"
                onClick={() => handleOpen(posters, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Poster ${i + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL="/Netflix_Symbol_RGB.png"
                  priority
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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

      {images?.length > 0 && (
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Featured Images</h3>
          <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
            {images.map((img, i) => (
              <div
                key={i}
                className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 aspect-[2/3]"
                onClick={() => handleOpen(images, i)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL="/Netflix_Symbol_RGB.png"
                  priority
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
