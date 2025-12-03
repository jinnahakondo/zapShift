import React, { use } from 'react';
import 'swiper/css/bundle'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import TestimonialCard from './TestimonialCard';
const Testimonials = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise)
    console.log(reviews);
    return (
        <div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                    Pagination
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                pagination
                loop
                autoplay={
                    {
                        delay: 2000, disableOnInteraction: false
                    }
                }
                className="mySwiper"

            >
                {reviews.map(review => <SwiperSlide> <TestimonialCard key={review.id} review={review} /></SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Testimonials;