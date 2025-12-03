import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import AssignRiderModal from './AssignRiderModal';
import { useState } from 'react';

const AssignRider = () => {
    const modalRef = useRef();
    const [selectedParcel, setSelectedParcel] = useState()

    const axiosSecure = useAxiosSecure();

    const { data: parcels, refetch } = useQuery({
        queryKey: ['parcels', "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel?delevaryStatus=pending-pickup');
            return res.data;
        }
    })

    // query for selected parcel 
    const { data: riders = [] } = useQuery({
        enabled: !!selectedParcel,
        queryKey: ['parcel', selectedParcel?.SenderDistrict, 'available'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&region=${selectedParcel.SenderRegion}&workStatus=avilable`);
            return res.data;
        }
    })

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel)
        modalRef.current.showModal()
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl font-bold my-5'>Available Riders: {parcels?.length}</h2>

            <div className="overflow-x-auto max-w-11/12 mx-auto">
                <table className="table lg:table-md table-pin-rows">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <td>ParcelName</td>
                            <td>SenderDistrict</td>
                            <td>RevicerDistrict</td>
                            <td>Cost</td>
                            <td>CreatedAt</td>
                            <td>delevaryStatus</td>

                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody className='font-medium'>
                        {parcels?.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel?.ParcelName}</td>
                            <td>{parcel?.SenderDistrict}</td>
                            <td>{parcel?.RevicerDistrict}</td>
                            <td>{parcel?.Cost}</td>
                            <td>{parcel?.CreatedAt}</td>
                            <td>{parcel?.delevaryStatus}</td>

                            <td className='flex items-center gap-3'>

                                <button
                                    onClick={() => openAssignRiderModal(parcel)}
                                    className='btn btn-success' >Assign Riders</button>
                            </td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>

            {/* modal */}
            <AssignRiderModal modalRef={modalRef} riders={riders} selectedParcel={selectedParcel} refetch={refetch} />

        </div>
    );
};

export default AssignRider;