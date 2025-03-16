import Search from "../components/features/Search";

function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 flex h-0 justify-center">
          <div className="absolute -bottom-90 h-[100vh] w-[3000px] rounded-[100%] bg-denim-300 md:w-[200vw]"></div>
        </div>
      </div>

      <div className="relative z-10 mb-16 sm:mb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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