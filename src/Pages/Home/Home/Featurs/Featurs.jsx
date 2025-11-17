import React from 'react';
import live_tracking from '../../../../assets/live-tracking.png'
import safe_delivery from '../../../../assets/safe-delivery.png'

const Featurs = () => {
    const featurs = [
        {
            title: 'Live Parcel Tracking',
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            photo: live_tracking
        },
        {
            title: '100% Safe Delivery',
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            photo: safe_delivery
        },
        {
            title: '24/7 Call Center Support',
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            photo: safe_delivery
        },
    ]
    return (
        <div className='flex flex-col w-full gap-6'>
            {
                featurs.map(f => <div key={f.title} className='bg-white rounded-4xl flex flex-col md:flex-row items-center p-6 h-full'>
                    {/* left side  */}
                    <div className=' max-md:border-b md:border-r mb-5 border-dashed'>
                        <img src={f.photo} className='p-6 ' />
                    </div>
                    {/* right side  */}
                    <div className='pl-6'>
                        <h5 className='font-extrabold text-2xl'>{f.title}</h5>
                        <p className='font-medium text-accent mt-4'>{f.description}</p>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default Featurs;