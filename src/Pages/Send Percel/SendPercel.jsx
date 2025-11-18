import React from 'react';
import { useForm } from "react-hook-form"


const SendPercel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handelSendParcel = (data) => {
        console.log(data);
    }
    return (
        <div className='mt-8 bg-white rounded-4xl p-5 lg:px-24 lg:py-20'>
            <h2 className='text-2xl md:text-5xl font-extrabold text-secondary'>Send A Parcel</h2>
            <div className='divider mt-12'></div>
            <h2 className='text-xl lg:text-2xl text-secondary font-extrabold my-7'>Enter your parcel details</h2>
            <form onSubmit={handleSubmit(handelSendParcel)}>
                <fieldset className="fieldset">
                    {/* parcel type  */}
                    <div className=''>
                        {/* document  */}
                        <label className='text-base font-semibold'>
                            <input type="radio"
                                value={'Document'}
                                name='parcel-type'
                                {...register('parcel-type')}
                                className='radio text-green-500 checked:border-green-500 border-4 border-gray-400' /> <span className='ml-1'> Document</span>
                        </label>
                        {/* none-document  */}
                        <label className='text-base font-semibold ml-10'>
                            <input type="radio"
                                value={'None-Document'}
                                name='parcel-type'
                                {...register('parcel-type')}
                                className='radio border-4 border-gray-400 text-green-500 checked:border-green-500 ' /> <span className='ml-1'> None-Document</span>
                        </label>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                        {/* Parcel Name */}
                        <div className='flex flex-col gap-1'>
                            <label className="text-sm font-medium ">Parcel Name</label>
                            <input type="text"
                                {...register('ParcelName')}
                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                placeholder="Parcel Name" />
                        </div>
                        {/* Parcel Weight */}
                        <div className='flex flex-col gap-1'>
                            <label className="text-sm font-medium ">Parcel Weight</label>
                            <input type="number"
                                {...register('ParcelWeight')}
                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                placeholder="Parcel Weight (KG)" />
                        </div>
                    </div>
                    <div className='divider my-7'></div>
                    {/* seller & reciver details  */}
                    <div>
                        {/* seller info  */}
                        <div>
                            <h2 className='text-lg font-extrabold mb-7'>Sender Details</h2>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                                <div className='space-y-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                                        {/* Sender Name */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Sender Name</label>
                                            <input type="text"
                                                {...register('SenderName')}
                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                                placeholder="Sender Name" />
                                        </div>
                                        {/* Sender Pickup Wire house */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Sender Pickup Wire house</label>
                                            <select
                                                {...register('SenderPickUpWireHose')}
                                                className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'>
                                                <option disabled selected className=''>Select Wire house</option>
                                                <option >Gaibandha</option>
                                                <option >Sadullapur</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                                        {/* Address */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Address</label>
                                            <input type="text"
                                                {...register('SenderAddress')}
                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500" placeholder="Address" />
                                        </div>
                                        {/* Sender Contact No */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">sender Contact No</label>
                                            <input
                                                {...register('SenderContact')}
                                                className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'
                                                type='number'
                                                placeholder='Sender Contact No'
                                            />

                                        </div>
                                    </div>
                                    {/* region  */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Your Region</label>
                                        <select
                                            {...register('SenderRegion')}
                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'>
                                            <option disabled selected className=''>Select your region</option>
                                            <option >Gaibandha</option>
                                            <option >Sadullapur</option>
                                        </select>
                                    </div>
                                    {/* Pickup Instruction  */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Pickup Instruction</label>
                                        <textarea
                                            {...register("PickUpInstruction")}
                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 h-20 p-2'
                                            placeholder='Pickup Instruction'
                                        ></textarea>
                                    </div>
                                </div>
                                <div className='space-y-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                                        {/* Reciver Name */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Reciver Name</label>
                                            <input type="text"
                                                {...register('ReciverName')}
                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500" placeholder="Reciver Name" />
                                        </div>
                                        {/* Sender Pickup Wire house */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Receiver Delivery Wire house</label>
                                            <select
                                                {...register('ReciverWirehouse')}
                                                className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'>
                                                <option disabled selected className=''>Select Wire house</option>
                                                <option value={'gaibandha'} >Gaibandha</option>
                                                <option value={'sadullapur'} >Sadullapur</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                                        {/* Receiver Address */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Receiver Address</label>
                                            <input type="text"
                                                {...register('ReciverAddress')}
                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500" placeholder="Receiver Address" />
                                        </div>
                                        {/* reciver Contact No */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">reciver Contact No</label>
                                            <input
                                                {...register('ReciverContact')}
                                                className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'
                                                type='number'
                                                placeholder='Sender Contact No'
                                            />

                                        </div>
                                    </div>
                                    {/* region  */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Reciver Region</label>
                                        <select
                                            {...register('ReciverRegion')}
                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'>
                                            <option disabled selected className=''>Select Reciver region</option>
                                            <option value={'gaibandha'} >Gaibandha</option>
                                            <option value={'sadullapur'}>Sadullapur</option>
                                        </select>
                                    </div>
                                    {/* Pickup Instruction  */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Pickup Instruction</label>
                                        <textarea
                                            {...register('ReciverPickupInstruction')}
                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 h-20 p-2'
                                            placeholder='Pickup Instruction'
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='my-12 text-base font-medium text-accent'> PickUp Time 4pm-7pm Approx.</p>
                    <div>
                        <button className='btn btn-primary text-black'>Proceed to Confirm Booking</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default SendPercel;