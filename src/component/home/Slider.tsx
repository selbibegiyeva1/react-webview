import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';

function Slider() {
    const toItem = (group: string) => `/item/${encodeURIComponent(group)}`;

    const [slides] = useState([
        {
            id: 1,
            head: "PUBG Mobile",
            text: "Пополняйте PUBG Mobile без комиссии по UID",
            button: "Посмотреть",
            link: toItem("PUBG Mobile"),
        },
        {
            id: 2,
            head: "Steam",
            text: "Пополняйте PUBG Mobile без комиссии по UID",
            button: "Посмотреть",
            link: "/steam",
        },
        {
            id: 3,
            head: "Playstation",
            text: "Пополняйте PUBG Mobile без комиссии по UID",
            button: "Посмотреть",
            link: toItem("Playstation"),
        },
    ]);

    const rawId = useId();
    const sliderId = `slider-${rawId.replace(/:/g, '')}`;

    return (
        <div
            id={sliderId}
            className="relative"
            style={{
                '--swiper-pagination-color': '#9B2DC1',
                '--swiper-pagination-bullet-inactive-color': '#343349',
                '--swiper-pagination-bullet-inactive-opacity': '1',
            } as React.CSSProperties}
        >
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={'auto'}
                spaceBetween={16}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: true,
                }}
                pagination={{
                    clickable: true,
                    el: `#${sliderId} .slider-pagination`,
                }}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="absolute bottom-0 px-4 py-5 w-full bg-linear-to-t from-black/80 via-black/40 to-transparent">
                            <b className="text-[24px]">{slide.head}</b>
                            <p className="mt-3 mb-4 text-[14px] font-medium max-w-[235px]">{slide.text}</p>
                            <Link
                                to={slide.link}
                                className="bg-[#A132C7] flex justify-center max-w-full text-[14px] font-bold w-full p-[15.5px] rounded-[10px]"
                            >
                                {slide.button}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-pagination swiper-pagination flex justify-center pt-3"
                style={{ position: 'static' }}
            />
        </div>
    );
}

export default Slider;
