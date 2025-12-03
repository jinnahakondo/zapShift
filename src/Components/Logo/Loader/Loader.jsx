import React from 'react';
import Lottie from "lottie-react";
import Loading from "../../../assets/Loading (1).json";
const Loader = () => {
    return (
        <div className='grid place-items-center h-screen'>
            <div className='h-20 w-20'>
                <Lottie animationData={Loading} loop={true} />
            </div>
           
        </div>
    );
};

export default Loader;