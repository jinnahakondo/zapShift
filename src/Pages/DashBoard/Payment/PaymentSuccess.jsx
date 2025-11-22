import React, { use, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useState } from 'react';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();

    const sessionId = searchParams.get('session_id')

    const axiosSecure = useAxiosSecure();

    const [paymentInfo, setPaymentInfo] = useState([])

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    setPaymentInfo({
                        transectionId: res.data.transectionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div>
            <h2 className='text-2xl text-green-500'>Payment Successfull</h2>
            <p>Your transection id: {paymentInfo.transectionId}</p>
            <p>Your tracking id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;