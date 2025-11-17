import React, { Suspense } from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../Our Services/OurServices';
import Brands from '../Brands/Brands';
import Testimonials from '../UsersTestimonials/Testimonials';
import Featurs from './Featurs/Featurs';
import FAQ from './FAQ/FAQ';



const reviewsPromise = fetch('./reviews.json').then(res => res.json())
const faqPromise = fetch('./faq.json').then(res => res.json())
const Home = () => {
    return (
        <div>
            <div className='mt-9 space-y-24'>
                <Banner />
                <HowItWorks />
                <OurServices />
                <Brands />
                <Featurs />
                <Suspense fallback={<p>loading...</p>}>
                    <Testimonials reviewsPromise={reviewsPromise} />
                </Suspense>
                <Suspense fallback={<p>loading...</p>}>
                    <FAQ faqPromise={faqPromise} />
                </Suspense>

            </div>
        </div>
    );
};

export default Home;