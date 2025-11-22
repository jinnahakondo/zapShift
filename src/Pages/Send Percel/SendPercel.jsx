import React, { use } from 'react';
import { useForm, useWatch } from "react-hook-form"
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';


const SendPercel = () => {
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]

    const SenderRegion = useWatch({ control, name: "SenderRegion" })
    const ReciverRegion = useWatch({ control, name: "ReciverRegion" })

    const districtByRegion = (region) => {
        const regionDistrict = serviceCenters.filter(c => c.region === region);
        const districts = regionDistrict.map(d => d.district)
        return districts;
    }


    const handelSendParcel = (data) => {
        const isSameDistrict = data.SenderDistrict === data.revicerDistrict;
        const parcelType = data.parcelType === 'Document'
        const parcelWeight = parseFloat(data.ParcelWeight)
        let cost = 0;

        if (parcelType) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log('cost', cost);
        data.Cost = cost;
        Swal.fire({
            title: "Are you sure?",
            text: `You have to pay ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I Aggree",
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post('/parcel', data)
                    .then((res) => {
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                text: "your request has been recieved",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Pay Now",
                                cancelButtonText: 'Letter',
                                timer: 5000,

                            }).then((result) => {
                                if (result.isConfirmed) {
                                    console.log('confirmed');
                                }
                            })
                        }

                    })
            }
        });

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

                                {...register('parcelType', { required: true })}
                                className='radio text-green-500 checked:border-green-500 border-4 border-gray-400' /> <span className='ml-1'> Document</span>
                        </label>
                        {/* none-document  */}
                        <label className='text-base font-semibold ml-10'>
                            <input type="radio"
                                value={'None-Document'}

                                {...register('parcelType')}
                                className='radio border-4 border-gray-400 text-green-500 checked:border-green-500 ' /> <span className='ml-1'> None-Document</span>
                        </label>
                        {errors.parcelType?.type === "required" && <p className='text-red-500'>please select parcel type</p>}
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
                    {/* sender & reciver details  */}
                    <div>

                        <div>
                            <h2 className='text-lg font-extrabold mb-7'>Sender Details</h2>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                                {/* sender info  */}
                                <div className='space-y-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                                        {/* Sender Name */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Sender Name</label>
                                            <input type="text"
                                                defaultValue={user.displayName}
                                                {...register('SenderName')}

                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500"
                                                placeholder="Sender Name" />
                                        </div>
                                        {/* Sender Pickup Wire house */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Sender Pickup Wire house</label>
                                            <select
                                                {...register('SenderPickUpWireHose')}
                                                className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer'>
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

                                    {/* Sender email */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">sender Email</label>
                                        <input
                                            defaultValue={user.email}
                                            {...register('SenderEmail')}
                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'
                                            type='email'
                                            placeholder='Sender email'
                                        />

                                    </div>
                                    {/* region  */}
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex flex-col gap-1'>
                                            <fieldset className="fieldset">
                                                <label className="text-sm font-medium ">Your Region</label>
                                                <select
                                                    defaultValue="select your region"
                                                    {...register('SenderRegion')}
                                                    className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer">
                                                    <option disabled> select your district</option>
                                                    {regions.map(r => <option value={r} key={r}>{r}</option>)}
                                                </select>

                                            </fieldset>
                                        </div>

                                    </div>
                                    {/* district  */}
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex flex-col gap-1'>
                                            <fieldset className="fieldset">
                                                <label className="text-sm font-medium ">Your district</label>
                                                <select
                                                    defaultValue="select your district"
                                                    {...register('SenderDistrict')}
                                                    className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer">
                                                    <option disabled>select your district</option>
                                                    {districtByRegion(SenderRegion).map(d => <option value={d} key={d}>{d}</option>)}
                                                </select>

                                            </fieldset>
                                        </div>

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
                                {/* reciver info  */}
                                <div className='space-y-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
                                        {/* Reciver Name */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Reciver Name</label>
                                            <input type="text"
                                                {...register('ReciverName')}
                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500" placeholder="Reciver Name" />
                                        </div>
                                        {/* Reciver Pickup Wire house */}
                                        <div className='flex flex-col gap-1'>
                                            <label className="text-sm font-medium ">Receiver Delivery Wire house</label>
                                            <select
                                                {...register('ReciverWirehouse')}
                                                className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer'>
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
                                        {/* receiver Contact No */}
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
                                    {/* receiver email */}
                                    <div className='flex flex-col gap-1'>
                                        <label className="text-sm font-medium ">Receiver Email</label>
                                        <input
                                            {...register('RecieverEmail')}

                                            className='input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500'
                                            type='email'
                                            placeholder='Reciver email'
                                        />

                                    </div>
                                    {/* region  */}
                                    <div className='flex flex-col gap-1'>
                                        <fieldset className="fieldset">
                                            <label className="text-sm font-medium ">Reciver Region</label>
                                            <select
                                                {...register('ReciverRegion')}
                                                defaultValue="Pick a browser"
                                                className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer">
                                                <option disabled selected>Select Reciver Region</option>
                                                {regions.map(r => <option value={r} key={r}>{r}</option>)}
                                            </select>

                                        </fieldset>
                                    </div>
                                    {/*reciver district  */}
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex flex-col gap-1'>
                                            <fieldset className="fieldset">
                                                <label className="text-sm font-medium ">Reciver district</label>
                                                <select
                                                    defaultValue="select your district"
                                                    {...register('RevicerDistrict')}
                                                    className="input border-2 border-gray-300 rounded-lg w-full outline-none focus:border-green-500 select cursor-pointer">
                                                    <option disabled>select Reciver district</option>
                                                    {districtByRegion(ReciverRegion).map(d => <option value={d} key={d}>{d}</option>)}
                                                </select>

                                            </fieldset>
                                        </div>

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