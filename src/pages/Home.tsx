import Footer from "../component/layout/Footer"

import Search from "../component/home/Search"
import Slider from "../component/home/Slider"
import Grid from "../component/home/Grid"
import Grid2 from "../component/home/Grid2"
import Faq from "../component/home/Faq"

function Home() {
    return (
        <div className="h-full relative pt-[72px]">
            <div className="text-white px-4 md:w-3xl md:m-auto">
                <Search />
                <Slider />

                <div className="mt-4 mb-10">
                    <Grid />
                </div>
                <div className="mb-20">
                    <Grid2 />
                </div>
                <div className="mb-8">
                    <Faq />
                </div>
            </div>

            <Footer />

            <a href="#">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fixed bottom-0 right-0 m-4 z-30"
                >
                    <rect width="40" height="40" rx="8" fill="#5B5B66" />
                    <path d="M28 24L20 16L12 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>
    )
}

export default Home