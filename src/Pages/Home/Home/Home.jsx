import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../Our Services/OurServices';




const Home = () => {
    return (
        <div>
            <div className='mt-9 space-y-24'>
                <Banner />
                <HowItWorks />
                <OurServices/>
            </div>
        </div>
    );
};

export default Home;