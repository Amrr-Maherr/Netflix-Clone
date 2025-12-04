import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLinks() {
  const path = usePathname();

  const Links: { name: string; link: string }[] = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/TvShows" },
    { name: "Movies", link: "/Movies" },
    { name: "Kids", link: "/Kids" },
    { name: "New & Popular", link: "/NewPopular" },
    { name: "My List", link: "/my-list" },
  ];

  return (
    <nav className="flex flex-col md:flex-row gap-6 text-white text-sm md:text-base">
      {Links.map((item, index) => {
        const isActive = path === item.link;

        return (
          <Link
            key={index}
            href={item.link}
            className="relative group transition-all duration-200"
          >
            <span
              className={`transition-colors duration-200 ${
                isActive ? "text-red-600" : "group-hover:text-red-600"
              }`}
            >
              {item.name}
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        );
      })}
    </nav>
  );
}
