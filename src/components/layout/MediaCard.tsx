import { Link } from "react-router-dom";

export interface MediaCardProps {
  media: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "tv";
  };
  linkable?: boolean;
  percentage?: number;
}

export function MediaCard({ media, linkable = true, percentage }: MediaCardProps) {
  const title = media.title || media.name || "";
  const releaseYear = media.release_date 
    ? new Date(media.release_date).getFullYear() 
    : media.first_air_date 
      ? new Date(media.first_air_date).getFullYear() 
      : null;
  
  const posterUrl = `https://image.tmdb.org/t/p/w300${media.poster_path}`
  
  const link = `/player/${media.media_type}/${media.id}`;
  
  const canLink = linkable;
  
  const content = (
    <div className="relative group cursor-pointer user-select-none rounded-xl p-2 bg-transparent transition-colors duration-300 hover:bg-mediaCard-hoverBackground w-full h-full">
      <div className="relative">
        <div className="overflow-hidden rounded-lg aspect-[2/3]">
          <img 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={posterUrl}
            alt={title}
            loading="lazy"
          />
        </div>
        
        {percentage !== undefined && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-mediaCard-shadow to-transparent transition-colors group-hover:from-mediaCard-hoverShadow" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="relative h-1 overflow-hidden rounded-full bg-mediaCard-barColor">
                <div 
                  className="absolute inset-y-0 left-0 rounded-full bg-mediaCard-barFillColor"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-2 text-sm font-medium truncate">{title}</div>
      {releaseYear && <div className="text-xs text-gray-400">{releaseYear}</div>}
    </div>
  );
  
  if (canLink) {
    return <Link to={link}>{content}</Link>;
  }
  
  return content;
}