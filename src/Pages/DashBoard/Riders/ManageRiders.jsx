import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

const ManageRiders = () => {
    const axiosSecure = useAxiosSecure()

    const { data: riders, refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/riders')
            return data
        }
    })

    // rider approve function
    const handelApprove = async (rider) => {
        const { data } = await axiosSecure.patch(`/riders/${rider._id}`, rider)
        if (data.acknowledged) {
            refetch()
            Swal.fire({
                text: "rider application accepted",
                icon: "success"
            });
        };
    }

    //rider delete 
    const handelDeleteRider = async id => {

        Swal.fire({
            title: "want to reject this user?",
            text: "The application will be deleted !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/riders/${id}`)
                refetch()
                console.log(res);
                Swal.fire({
                    title: "Deleted!",
                    text: "ider application rejected.",
                    icon: "success"
                });
            }
        });
    }


    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-2xl font-extrabold mb-12'>Total Application: {riders?.length}</h2>

            <div className="overflow-x-auto max-w-11/12 mx-auto">
                <table className="table lg:table-md table-pin-rows">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Contact</td>
                            <td>Nid</td>
                            <td>Region</td>
                            <td>Wirehouse</td>
                            <td>WorkingStatus</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody className='font-medium'>
                        {riders?.map((r, i) => <tr key={r._id}>
                            <th>{i + 1}</th>
                            <td>{r?.name}</td>
                            <td>{r?.email}</td>
                            <td>{r?.contact}</td>
                            <td>{r?.nid}</td>
                            <td>{r?.region}</td>
                            <td>{r?.wirehouse}</td>
                            <td>{r?.workingStatus}</td>
                            <td className='flex items-center gap-3'>
                                {r?.status === "approved" ?
                                    <button className='btn btn-success disabled:bg-green-500 disabled:text-gray-700' disabled>Approved</button>
                                    :

                                    <button className='btn btn-success '
                                        onClick={() => handelApprove(r)}
                                    >Approve</button>

                                }

                                <button className='btn btn-error' onClick={() => handelDeleteRider(r._id)}><span className='text-black text-xl'><MdDelete /></span></button>

                            </td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRiders;