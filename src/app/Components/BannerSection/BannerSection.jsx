import imageOne from "../../../../public/Assets/superman-2025-3840x2160-20308.jpg";
import imageTwo from "../../../../public/Assets/deadpool-wolverine-3840x2160-16840.jpg";
import imageThree from "../../../../public/Assets/thunderbolt-ross-3840x2160-21423.jpg";
import imageFour from "../../../../public/Assets/Slider/john-wick-chapter-4-4k-3840x2160-11011.jpg.jpg";

export default function BannerSection() {
  const BannerData = [
    {
      image: imageOne,
      title: "Superman 2025",
      description: "The Man of Steel returns in a new action-packed adventure.",
      buttonText: "Watch Now",
    },
    {
      image: imageTwo,
      title: "Deadpool vs Wolverine",
      description: "The ultimate battle between Deadpool and Wolverine.",
      buttonText: "See More",
    },
    {
      image: imageThree,
      title: "Thunderbolt Ross",
      description: "A gripping story about Thunderbolt Ross and his legacy.",
      buttonText: "Discover More",
    },
    {
      image: imageFour,
      title: "John Wick: Chapter 4",
      description: "John Wick returns for another action-packed thriller.",
      buttonText: "Watch Trailer",
    },
  ];

  return (
    <section>
      {BannerData.map((Banner, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${Banner.image.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-screen w-full flex items-center justify-center text-white relative"
        >
          <div className="p-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {Banner.title}
            </h1>
            <p className="text-lg md:text-xl mb-6">{Banner.description}</p>
            <button className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded cursor-pointer">
              {Banner.buttonText}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
