import Lottie from 'lottie-react';
import React from 'react';
import ErrorAnimation from '../../assets/Page Not Found 404 (1).json'
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='grid place-items-center h-screen'>
            <div className='w-[70%]'>
                <Lottie animationData={ErrorAnimation} />
                <button
                    onClick={() => navigate(-1)}
                    className='btn bg-black text-white'>Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;