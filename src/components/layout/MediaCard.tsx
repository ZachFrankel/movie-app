export interface MediaCardProps {
  id: number;
  posterPath: string;
  title: string;
  mediaType: "movie" | "tv";
  year: string | number;
}

// define id later to link to player
export function MediaCard({ posterPath, title, mediaType, year }: MediaCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w342${posterPath}`;
  
  return (
    <div className="group rounded-xl bg-background-main bg-opacity-0 transition-colors duration-100 hover:bg-opacity-100">
      <article className="pointer-events-auto relative mb-2 p-[0.4em] transition-transform duration-300 w-full group-hover:scale-95">
        <div className="relative mb-4 aspect-[2/3] w-full overflow-hidden rounded-xl bg-denim-500 bg-cover bg-center transition-[border-radius] duration-100 group-hover:rounded-lg">
          <img
            src={imageUrl}
            alt={`${title} poster`}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mb-1 line-clamp-2 text-ellipsis break-words font-semibold text-white text-left">
          {title}
        </h1>
        <p className="text-type-secondary text-xs text-left">
          <span className="capitalize">{mediaType}</span>
          {year && <span> • {year}</span>}
        </p>
      </article>
    </div>
  );
}