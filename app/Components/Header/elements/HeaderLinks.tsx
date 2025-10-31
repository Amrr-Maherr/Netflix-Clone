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
    <nav className="flex gap-6 text-white text-sm md:text-base">
      {Links.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="hover:text-gray-300 transition"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
