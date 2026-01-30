import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/Netflix_Symbol_RGB.png";
interface CastCardProps {
  actor: any;
}

export default function CastCard({ actor }: CastCardProps) {
  return (
    <Link href={`/ActorDetails/${actor.id}`}>
      <div
        key={actor.cast_id}
        className="bg-zinc-900 rounded-xl overflow-hidden transition-transform duration-300 cursor-pointer"
      >
        <div className="absolute top-0  z-50">
          <Image
            width={50}
            height={50}
            priority
            src="/Netflix_Symbol_RGB.png"
            alt=""
          />
        </div>
        {actor.profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            width={300}
            height={450}
            quality={100}
            priority
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
        ) : (
          <div className="bg-zinc-800 h-48 sm:h-56 md:h-64 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}

        <div className="p-3 text-center">
          <p className="font-semibold text-sm text-white truncate">
            {actor.name}
          </p>
          <p className="text-xs text-gray-400 truncate">{actor.character}</p>
        </div>
      </div>
    </Link>
  );
}
