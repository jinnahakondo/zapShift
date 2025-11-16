import React from 'react';

const ServiceCard = ({ service }) => {

    return (
        <div className='p-8 flex items-center flex-col gap-4 bg-white rounded-3xl shadow hover:bg-primary '>
            <div className=' p-6 rounded-full bg-base-200'>
                <img src={service.icon} className='w-12 h-12 ' />
            </div>
            <h5 className='text-xl font-bold'>{service.title}</h5>
            <p className='text-accent'>{service.description}</p>
        </div>
    );
};

export default ServiceCard;