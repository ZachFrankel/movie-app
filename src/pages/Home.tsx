import Search from "../components/features/Search";

function Home() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-0">
        <div className="relative w-full h-[50vh]">
          <div className="absolute bottom-23 h-[100vh] w-[3000px] left-1/2 transform -translate-x-1/2 rounded-[100%] bg-denim-300 md:w-[200vw]"></div>
        </div>
      </div>

      <div className="fixed top-4 right-4 z-20 flex gap-3">
        <div className="text-white flex h-12 w-12 items-center justify-center rounded-full border-2 border-transparent bg-denim-500 transition-[background-color,color,transform,border-color] duration-75 cursor-pointer hover:scale-110 hover:bg-denim-600 hover:text-white active:scale-125">
          <svg fill="currentColor" width="1.2em" height="1.2em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        
        <div className="text-white flex h-12 w-12 items-center justify-center rounded-full border-2 border-transparent bg-denim-500 transition-[background-color,color,transform,border-color] duration-75 cursor-pointer hover:scale-110 hover:bg-denim-600 hover:text-white active:scale-125">
          <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1.2em" height="1.2em" viewBox="0 0 48.4 48.4" xmlSpace="preserve">
            <g>
              <path d="M48.4,24.2c0-1.8-1.297-3.719-2.896-4.285s-3.149-1.952-3.6-3.045c-0.451-1.093-0.334-3.173,0.396-4.705 c0.729-1.532,0.287-3.807-0.986-5.08c-1.272-1.273-3.547-1.714-5.08-0.985c-1.532,0.729-3.609,0.848-4.699,0.397 s-2.477-2.003-3.045-3.602C27.921,1.296,26,0,24.2,0c-1.8,0-3.721,1.296-4.29,2.895c-0.569,1.599-1.955,3.151-3.045,3.602 c-1.09,0.451-3.168,0.332-4.7-0.397c-1.532-0.729-3.807-0.288-5.08,0.985c-1.273,1.273-1.714,3.547-0.985,5.08 c0.729,1.533,0.845,3.611,0.392,4.703c-0.453,1.092-1.998,2.481-3.597,3.047S0,22.4,0,24.2s1.296,3.721,2.895,4.29 c1.599,0.568,3.146,1.957,3.599,3.047c0.453,1.089,0.335,3.166-0.394,4.698s-0.288,3.807,0.985,5.08 c1.273,1.272,3.547,1.714,5.08,0.985c1.533-0.729,3.61-0.847,4.7-0.395c1.091,0.452,2.476,2.008,3.045,3.604 c0.569,1.596,2.49,2.891,4.29,2.891c1.8,0,3.721-1.295,4.29-2.891c0.568-1.596,1.953-3.15,3.043-3.604 c1.09-0.453,3.17-0.334,4.701,0.396c1.533,0.729,3.808,0.287,5.08-0.985c1.273-1.273,1.715-3.548,0.986-5.08 c-0.729-1.533-0.849-3.61-0.398-4.7c0.451-1.09,2.004-2.477,3.603-3.045C47.104,27.921,48.4,26,48.4,24.2z M24.2,33.08 c-4.91,0-8.88-3.97-8.88-8.87c0-4.91,3.97-8.88,8.88-8.88c4.899,0,8.87,3.97,8.87,8.88C33.07,29.11,29.1,33.08,24.2,33.08z"></path>
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 mb-16 sm:mb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
          <div className="mt-44 space-y-16">
            <Search
              title="What do you want to watch?"
              placeholder="What do you want to watch?"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;