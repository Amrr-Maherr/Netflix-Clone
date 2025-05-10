import imageOne from "../../../../public/Assets/superman-2025-3840x2160-20308.jpg";
import imageTwo from "../../../../public/Assets/deadpool-wolverine-3840x2160-16840.jpg";
import imageThree from "../../../../public/Assets/thunderbolt-ross-3840x2160-21423.jpg";
import imageFour from "../../../../public/Assets/gozela.jpg";
import imageFive from "../../../../public/Assets/spiderman.jpg";
import imageSix from "../../../../public/Assets/Slider/john-wick-chapter-4-4k-3840x2160-11011.jpg.jpg";

export default function BannerSection() {
  const BannerData = [
    {
      image: imageOne,
      title: "Superman: Legacy (2025)",
      description:
        "Clark Kent begins a new chapter balancing his Kryptonian heritage with his human upbringing in this thrilling reboot.",
      buttonText: "Watch Now",
    },
    {
      image: imageTwo,
      title: "Deadpool & Wolverine",
      description:
        "The Merc with a Mouth teams up with the X-Men’s fiercest warrior in a chaotic, hilarious, and action-filled ride.",
      buttonText: "See More",
    },
    {
      image: imageThree,
      title: "Thunderbolt Ross: Red Reckoning",
      description:
        "General Ross faces the consequences of his past and unleashes a power that could change everything.",
      buttonText: "Discover More",
    },
    {
      image: imageFour,
      title: "Godzilla: Rise of the Titans",
      description:
        "As ancient monsters awaken, Godzilla must assert his dominance in a battle that will shake the Earth.",
      buttonText: "Watch Trailer",
    },
    {
      image: imageFive,
      title: "Spider-Man: Beyond Dimensions",
      description:
        "Peter Parker swings through the multiverse to stop a threat that could unravel reality itself.",
      buttonText: "Explore Now",
    },
    {
      image: imageSix,
      title: "John Wick: Chapter 4",
      description:
        "With the bounty on his head ever increasing, John Wick fights his way across the globe to defeat the High Table.",
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
          <div className="p-8 text-center absolute inset-0 w-full h-full bg-black/50  flex items-center justify-center flex-col">
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
