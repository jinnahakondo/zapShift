import React from 'react';
import ServiceCard from './Service Card/ServiceCard';
import icon from '../../../assets/fi_8845507.png'

const OurServices = () => {
    const services = [
        {
            icon: icon,
            title: 'Express  & Standard Delivery',
            description: 'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.'
        },
        {
            icon: icon,
            title: 'Nationwide Delivery',
            description: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.'
        },
        {
            icon: icon,
            title: 'Fulfillment Solution',
            description: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'
        },
        {
            icon: icon,
            title: 'Cash on Home Delivery',
            description: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'
        },
        {
            icon: icon,
            title: 'Corporate Service / Contract In Logistics',
            description: 'Customized corporate services which includes warehouse and inventory management support.'
        },
        {
            icon: icon,
            title: 'Parcel Return',
            description: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'
        },
    ]
    return (
        <div className='bg-secondary p-4 lg:p-24 rounded-4xl '>
            <h2 className='text-4xl font-extrabold text-white text-center'>Our Services</h2>
            <p className='font-medium text-gray-300 mb-8 text-center mt-2'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to <br /> business shipments — we deliver on time, every time.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                {services.map((service, i) => <ServiceCard key={i} service={service} />)}
            </div>
        </div>
    );
};

export default OurServices;