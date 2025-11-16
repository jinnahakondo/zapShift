import React from 'react';
import icon from '../../../assets/Delivery Tracking.png'

const HowItWorks = () => {
    const infos = [
        {
            icon: icon,
            title: 'Booking Pick & Drop',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            icon: icon,
            title: 'Cash On Delivery',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            icon: icon,
            title: 'Delivery Hub',
            description: 'From personal packages to business shipments — we deliver on time, every time..'
        },
        {
            icon: icon,
            title: 'Booking SME & Corporate',
            description: 'From personal packages to business shipments — we deliver on time, every time..'
        },
    ]
    return (
        <div>
            <h2 className='text-3xl font-extrabold text-secondary mb-8'>How it Works</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4'>
                {infos.map((info, i) => <div key={i} className='p-8 flex justify-start flex-col gap-4 bg-white rounded-3xl shadow'>
                    <img src={info.icon} className='w-12 h-12' />
                    <h5 className='text-xl font-bold'>{info.title}</h5>
                    <p className='text-accent'>{info.description}</p>
                </div>)}
            </div>
        </div>
    );
};

export default HowItWorks;