import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const CompletedDelivres = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], } = useQuery({
        queryKey: ['parcels', user.email, 'parcel_delivred'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/riders?riderEmail=${user.email}&delevaryStatus=parcel_delivred`)
            return res.data;
        }
    })

    const calculatePayout = parcel => {
        if (parcel.SenderDistrict === parcel.RevicerDistrict) {
            return parcel.Cost * 0.8;
        }
        else {
            parcel.Cost * 0.6;
        }
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Total Delivried: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Name</th>
                            <th>Total: </th>
                            <th>Payout </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) => <tr>
                                <th>{i + 1}</th>
                                <td>{parcel.ParcelName}</td>
                                <td>${parcel.Cost}</td>
                                <td>{calculatePayout(parcel)}</td>
                                <td>
                                    {parcel.delevaryStatus}
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDelivres;