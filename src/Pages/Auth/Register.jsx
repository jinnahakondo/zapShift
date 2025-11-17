import React from 'react';
import { useForm } from "react-hook-form"
import userImage from '../../assets/image-upload-icon.png'


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handelLogin = (data) => {
        console.log(data);
    }
    return (
        <div className='max-w-[450px]'>
            <div className='mb-5 space-y-2'>
                <h2 className='text-4xl font-extrabold'>Create an Account</h2>
                <p className='text-accent'>Register with ZapShift</p>
                <img src={userImage} />
            </div>
            <form onSubmit={handleSubmit(handelLogin)}>
                <fieldset className="fieldset space-y-3">
                    {/* Name  */}
                    <div>
                        <label className="label font-bold text-sm">Name</label>
                        <input type="text"

                            className="input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Name"

                        />
                    </div>
                    {/* email  */}
                    <div>
                        <label className="label font-bold text-sm">Email</label>
                        <input type="email"
                            className="input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Email"
                        />

                    </div>
                    {/* password  */}
                    <div>
                        <label className="label font-bold text-sm">Password</label>
                        <input type="password"
                            className="input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Password"
                            {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ })}
                        />
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-500'>Password must be at least 6 characters, include 1 lowercase, 1 uppercase, and 1 digit</p>
                        }
                    </div>
                    <button className="btn btn-primary text-black mt-4">Register</button>
                </fieldset>
            </form>
        </div >
    );
};

export default Register;