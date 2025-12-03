import React, { Suspense } from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../Our Services/OurServices';
import Brands from '../Brands/Brands';
import Testimonials from '../UsersTestimonials/Testimonials';
import Featurs from './Featurs/Featurs';
import FAQ from './FAQ/FAQ';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../../Components/Logo/Loader/Loader';



const reviewsPromise = fetch('./reviews.json').then(res => res.json())
const faqPromise = fetch('./faq.json').then(res => res.json())
const Home = () => {
    const { loading } = useAuth()
    if (loading) <Loader />
    return (
        <div>
            <div className='mt-9 space-y-24'>
                <Banner />
                <HowItWorks />
                <OurServices />
                <Brands />
                <Featurs />
                <Suspense fallback={<Loader />}>
                    <Testimonials reviewsPromise={reviewsPromise} />
                </Suspense>
                <Suspense fallback={<Loader />}>
                    <FAQ faqPromise={faqPromise} />
                </Suspense>

            </div>
        </div>
    );
};

export default Home;