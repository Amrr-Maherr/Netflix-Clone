import Link from "next/link";

export default function HeaderLinks() {
  const Links: { name: string; link: string }[] = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv-shows" },
    { name: "Movies", link: "/movies" },
    { name: "New & Popular", link: "/new-popular" },
    { name: "My List", link: "/my-list" },
  ];

  return (
    <nav className="flex flex-col md:flex-row gap-6 text-white text-sm md:text-base">
      {Links.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="relative group transition-all duration-200"
        >
          <span className="group-hover:text-red-600 transition-colors duration-200">
            {item.name}
          </span>
          <span className="absolute left-0 -bottom-1  w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>
  );
}
