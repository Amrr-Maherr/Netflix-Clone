import Slider from "@/app/Components/Slider/Slider";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
export default function ImagesSection({ backdrops }: { backdrops: any[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  if (!backdrops?.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Images from the Movie</h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
      <Slider>
        <Lightbox
          plugins={[Zoom]}
          open={open}
          close={() => setOpen(false)}
          slides={backdrops.map((img) => ({
            src: `https://image.tmdb.org/t/p/original${img.file_path}`,
          }))}
        />
        {backdrops.map((img, i) => (
          <div
            key={i}
            className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => {
              setOpen(true);
              setIndex(i);
            }}
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
