import Footer from "../component/layout/Footer"

import Search from "../component/home/Search"
import Slider from "../component/home/Slider"
import Grid from "../component/home/Grid"
import Grid2 from "../component/home/Grid2"
import Faq from "../component/home/Faq"

function Home() {
    return (
        <div className="h-full">
            <div className="text-white px-4">
                <Search />
                <Slider />

                <div className="mt-4">
                    <Grid />
                </div>
                <Grid2 />
                <Faq />
            </div>
            <Footer />
        </div>
    )
}

export default Home