import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { RiDeleteBack2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcel = () => {
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel?email=${user.email}`)
            return res.data;
        }
    })
    const handelDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want cancel this request!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/parcel/${id}`)
                if (res.data.deletedCount) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });


    }

    const handelPayment = async parcel => {
        const paymentInfo = {
            Cost: parcel.Cost,
            ParcelName: parcel.ParcelName,
            parcelId: parcel._id,
            SenderEmail: parcel.SenderEmail
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
        window.open(res.data.url, "_self");
    }

    return (
        <div className='w-11/12 mx-auto mt-5'>
            My Parcel {parcels.length}
            <div className="overflow-x-auto ">
                <table className="table table-sm table-pin-rows  mt-3">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Parcel Name</th>
                            <td>Parcel Type</td>
                            <td>Sender Name</td>
                            <td>Receiver Name</td>
                            <td>Sender District</td>
                            <td>Reciver District</td>
                            <td>Total Cost</td>
                            <td>Payment Status</td>
                            <td>Delevary Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((p, i) => <tr key={p._id}>
                            <td>{i + 1}</td>
                            <td>{p.ParcelName}</td>
                            <td>{p.parcelType}</td>
                            <td>{p.SenderName}</td>
                            <td>{p.ReciverName}</td>
                            <td>{p.SenderDistrict}</td>
                            <td>{p.RevicerDistrict}</td>
                            <td>{p.Cost}</td>
                            <td>
                                {p.PaymentStatus === "paid" ?
                                    <button className='btn btn-success btn-sm' disabled>paid</button>
                                    :
                                    <button onClick={() => handelPayment(p)} className='btn btn-primary btn-sm text-black'>pay</button>}
                            </td>
                            <td></td>
                            <td className='space-x-2'>
                                <button className='btn '><FiEdit /></button>
                                <button className='btn ' onClick={() => handelDelete(p._id)}><RiDeleteBack2Line />
                                </button>
                            </td>

                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;