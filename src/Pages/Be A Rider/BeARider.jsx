import React from 'react';
import { useForm, useWatch } from "react-hook-form"
import Rider from '../../assets/agent-pending.png'
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const BeARider = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const serviceCenters = useLoaderData()

    const regions = serviceCenters.map(r => r.region)

    const uniqueRegion = [...new Set(regions)]

    //watch change

    const riderRegion = useWatch({ control, name: 'region' })

    //find wirehouse by region
    const wirehouseByRegion = (region) => {
        const wirehouseInDistrict = serviceCenters.filter(w => w.region === region)
        const district = wirehouseInDistrict.map(d => d.district)
        return district;
    }

    const handelBeRider = async (data) => {
        const res = await axiosSecure.post('/riders', data)
        if (res.data.insertedId) {
            Swal.fire({
                text: "Your application has been sent. We will sent a confirmation email very soon!",
                icon: "success"
            });
        };

    }
    return (
        <div className='max-w-7xl mx-auto p-4 mt-24 bg-white rounded-3xl '>
            <div className='p-4 lg:p-14'>
                <h2 className='text-2xl lg:text-5xl font-extrabold '> Be a Rider</h2>
                <p className='text-accent  mt-4'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
                <div className='divider my-12'></div>
                <div className=' flex flex-col-reverse lg:flex-row gap-20 items-end'>
                    {/* left side  */}
                    <div className='flex-1 w-full' >
                        <h2 className='text-2xl font-extrabold mb-2'>Tell us about yourself</h2>
                        <form onSubmit={handleSubmit(handelBeRider)} >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-12  '>
                                {/* left column */}
                                <div className='space-y-4'>
                                    {/*  Name */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Your Name</label>
                                        <input type="text"
                                            value={user?.displayName}
                                            {...register('name')}
                                            className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                            placeholder="Your Name" />
                                    </div>
                                    {/* your email */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Your Name</label>
                                        <input type="text"
                                            value={user?.email}
                                            {...register('email')}
                                            className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                            placeholder="Your Email" />
                                    </div>
                                    {/* your nid */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Your NID</label>
                                        <input type="number"
                                            {...register('nid')}
                                            className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                            placeholder="nid no." />
                                    </div>
                                </div>
                                {/* right column */}
                                <div className='space-y-4'>
                                    {/*  age */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Your age</label>
                                        <input type="number"
                                            {...register('age')}
                                            className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                            placeholder="Your age" />
                                    </div>
                                    {/* your region */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Your Region</label>
                                        <select
                                            {...register('region')}
                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer'>
                                            <option disabled selected className=''>Select your region</option>
                                            {uniqueRegion.map(r => <option value={r} key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    {/* connect */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">contact</label>
                                        <input type="text"
                                            {...register('contact')}
                                            className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                            placeholder="Contact" />
                                    </div>
                                </div>
                            </div>
                            {/* select wirehouse  */}
                            <div className='flex flex-col gap-1'>
                                <label className="text-sm font-medium mt-4">Select Wire house</label>
                                <select
                                    {...register('wirehouse')}
                                    className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer'>
                                    <option disabled selected className=''>Select Wire house</option>
                                    {wirehouseByRegion(riderRegion).map(w => <option key={w} value={w}>{w}</option>)}
                                </select>
                            </div>
                            <button className='btn btn-primary text-black w-full mt-4'>Submit</button>
                        </form>
                    </div>
                    {/* right side  */}
                    <div>
                        <img src={Rider} alt="" className='h-[300px]' />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default BeARider;