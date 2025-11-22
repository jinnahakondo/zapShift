import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loader from '../../../Components/Logo/Loader/Loader';

const Payment = () => {
    const axiosSecure = useAxiosSecure()

    const { payment_id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['parcel', payment_id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${payment_id}`)
            return res.data
        }
    })
    console.log(data);
    const handelPayment = async () => {
        const paymentInfo = {
            Cost: data.Cost,
            parcelId: data._id,
            SenderEmail: data.SenderEmail,
            ParcelName: data.ParcelName
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url
    }

    if (isLoading) Loader
    return (
        <div className='max-w-11/12 mx-auto mt-5'>
            <h2 className='font-medium'> Please Pay for {data?.ParcelName} </h2>
            <p className='font-bold'>total price: ${data?.Cost}</p>
            <button onClick={handelPayment} className='btn btn-primary text-black mt-4'>pay</button>
        </div>
    );
};

export default Payment;