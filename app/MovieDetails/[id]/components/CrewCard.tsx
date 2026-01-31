import Image from "next/image";
import Link from "next/link";
import NetflixBadge from "@/app/Components/shared/NetflixBadge";
import NoImageFallback from "@/app/Components/NoImageFallback/NoImageFallback";

interface CrewCardProps {
  member: any;
}

export default function CrewCard({ member }: CrewCardProps) {
  return (
    <Link href={`/CrewDetails/${member.id}`}>
      <div 
        className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 aspect-[2/3]"
      >
        <NetflixBadge size={40} className="drop-shadow-md" />
        
        {/* Crew Member Image */}
        <div className="relative w-full h-full">
          {member.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w300${member.profile_path}`}
              alt={member.name}
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              placeholder="blur"
              blurDataURL="/Netflix_Symbol_RGB.png"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <NoImageFallback />
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold leading-tight line-clamp-2 text-white">
              {member.name}
            </h3>
            <p className="text-xs text-gray-300 line-clamp-2">
              {member.job}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}