import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth()
    console.log(user.email);
    const axiosSecure = useAxiosSecure();

    const { data: payments } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            Payment History

            <div className="overflow-x-auto max-w-11/12 mx-auto">
                <table className="table lg:table-lg table-pin-rows">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <td>parcelName</td>
                            <td>parcelId</td>
                            <td>transectionId</td>
                            <td>Paid At</td>
                            <td>Paid Amount</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody className='font-medium'>
                        {payments?.map((p, i) => <tr key={p._id}>
                            <th>{i + 1}</th>
                            <td>{p?.parcelName}</td>
                            <td>{p?.parcelId}</td>
                            <td>{p?.transectionId}</td>
                            <td>{p?.paidAt}</td>
                            <td>${p?.amount}</td>
                            <td><button className='btn'>View</button></td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;