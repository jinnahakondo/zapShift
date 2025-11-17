import React from 'react';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import monstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css/bundle"

const Brands = () => {
    const brands = [amazon, amazon_vector, casio, monstar, randstad, star, start_people]
    return (
        <div className='border-b border-dashed pb-24'>
            <h2 className='text-3xl text-secondary mb-10 text-center font-extrabold'>We've helped thousands of sales teams</h2>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                loop={true}
                centeredSlides={true}
                grabCursor
                autoplay={{ delay: 1000, disableOnInteraction: false }}
            >
                {brands.map((brand, i) => <SwiperSlide key={i}><img src={brand} /></SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Brands;