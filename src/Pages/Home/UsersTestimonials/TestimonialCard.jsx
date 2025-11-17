import React from 'react';
import { BsQuote } from "react-icons/bs";

const TestimonialCard = ({ review }) => {
    return (
        <div>
            <div className="bg-base-100 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 max-w-xl mx-auto">
                {/* Quote Icon */}
                <BsQuote className="text-4xl text-teal-300" />

                {/* Text */}
                <p className="text-accent mt-4">
                    {review.review}
                </p>

                {/* Line */}
                <div className="border-t-2 border-dashed border-teal-500 my-6"></div>

                {/* Profile Section */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full">
                        <img src={review.user_photoURL} className='rounded-full' />
                    </div>
                    <div>
                        <h3 className="font-semibold text-teal-900 text-lg">
                            {review.userName}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {review.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;