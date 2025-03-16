import { useState } from "react";
import getResults from "./SearchResults";

interface SearchProps {
  title: string;
  placeholder: string;
}

function Search({ title, placeholder }: SearchProps) {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-md">
          <div className="space-y-16 text-center">
            <div className="relative z-10 mb-16">
              <h1 className="text-4xl font-bold text-white mx-auto max-w-md">
                {title}
              </h1>
            </div>

            <div className="relative z-30">
              <div className="relative flex flex-col rounded-[28px] bg-denim-400 transition-colors focus-within:bg-denim-400 hover:bg-denim-500 sm:flex-row sm:items-center">
                <div className="pointer-events-none absolute bottom-0 left-5 top-0 flex max-h-14 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                    className="text-denim-700"
                  >
                    <path
                      fill="currentColor"
                      d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  className="w-full flex-1 bg-transparent px-4 py-4 pl-12 text-white placeholder-denim-700 focus:outline-none sm:py-4 sm:pr-2"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {getResults({ query })}
      </div>
    </>
  );
}

export default Search;