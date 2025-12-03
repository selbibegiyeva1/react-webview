import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';

function Slider() {
    const [slides] = useState([
        { id: 1, head: "PUBG Mobile", text: "Пополняйте PUBG Mobile без комиссии по UID", button: "Скоро" },
        { id: 2, head: "Steam", text: "Пополняйте PUBG Mobile без комиссии по UID", button: "Посмотреть" },
        { id: 3, head: "Playstation", text: "Пополняйте PUBG Mobile без комиссии по UID", button: "Скоро" },
    ]);

    return (
        <div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={16}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 0,
                    slideShadows: true,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className='absolute bottom-0 px-4 py-5 w-full bg-linear-to-t from-black/80 via-black/40 to-transparent'>
                            <b className='text-[24px]'>{slide.head}</b>
                            <p className='mt-3 mb-4 text-[14px] font-medium max-w-[235px]'>{slide.text}</p>
                            <button className='bg-[#A132C7] text-[14px] font-bold w-full p-[15.5px] rounded-[10px]'>{slide.button}</button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider