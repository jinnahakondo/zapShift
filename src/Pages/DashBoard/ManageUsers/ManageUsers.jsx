import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Loader from '../../../Components/Logo/Loader/Loader';
import { FiShield } from "react-icons/fi";
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';
import useRole from '../../../Hook/useRole';


const ManageUsers = () => {
    const [search, setSearch] = useState('')

    const { refetch: refetchagain } = useRole();

    const axiosSecure = useAxiosSecure()
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`)
            return res.data;
        }
    })

    const handelAddAdmin = async (user) => {
        const roleInfo = { role: 'admin' };
        Swal.fire({
            text: `Do you want to ${user.displayName} as an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/user/${user._id}/role`, roleInfo);
                if (res.data.modifiedCount) {
                    refetch();
                    refetchagain();
                    Swal.fire({
                        title: "approved!",
                        text: `${user.displayName} selected as an admin`,
                        icon: "success"
                    });
                }

            }
        });

    }

    const handelRemoveAdmin = async (user) => {
        const roleInfo = { role: 'user' };

        {
            refetch();
            Swal.fire({
                text: `Do you want to ${user.displayName} as an user?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/user/${user._id}/role`, roleInfo);
                    if (res.data.modifiedCount) {
                        refetch();
                        refetchagain();
                        Swal.fire({
                            title: "approved!",
                            text: `${user.displayName} selected as an user`,
                            icon: "success"
                        });
                    }

                }
            });
        }
    }

    if (isLoading) <Loader />
    return (

        <div className='max-w-11/12 mx-auto'>
            <div className='my-5 '>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search" required placeholder="Search" />
                </label>
            </div>
            <div className='overflow-x-auto '>
                <table className="table lg:table-lg table-pin-rows">
                    <thead>
                        <tr>
                            <th>#</th>
                            <td>displayName</td>
                            <td>email</td>
                            <td>role</td>
                            <td>Action</td>
                            <td>Other Action</td>
                        </tr>
                    </thead>
                    <tbody className='font-medium'>
                        {
                            users.map((user, i) => <tr >
                                <th>{i + 1}</th>
                                <td>{user?.displayName}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>
                                    {
                                        user.role === 'user' ?
                                            <button className='btn btn-success' onClick={() => handelAddAdmin(user)}><FiShield /></button>
                                            :
                                            <button className='btn btn-error' onClick={() => handelRemoveAdmin(user)}><FiShieldOff /></button>
                                    }
                                </td>
                                <td>Action</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;