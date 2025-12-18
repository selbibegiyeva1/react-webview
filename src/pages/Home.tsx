import Search from "../component/home/Search"
import Slider from "../component/home/Slider"
import Grid from "../component/home/Grid"
import Grid2 from "../component/home/Grid2"
import Faq from "../component/home/Faq"
import Footer from "../component/layout/Footer"

import ScrollUp from "../component/scrollUp"

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
            <ScrollUp />
        </div>
    )
}

export default Home