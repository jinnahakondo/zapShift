import React from 'react';
import { useForm } from "react-hook-form"
import userImage from '../../assets/image-upload-icon.png'
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { createUser, setLoading, updateUserProfile } = useAuth()

    const location = useLocation();

    console.log(location);

    const navigate = useNavigate()

    const handelLogin = (data) => {

        createUser(data.email, data.password)

            .then(() => {

                // <-----image hosting----->
                const image = data.photo[0]
                const formData = new FormData();
                formData.append('image', image)
                const image_Api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHostKey}`

                axios.post(image_Api, formData)
                    .then(res => {

                        navigate(location.state || '/')

                        toast.success('account created successfully')

                        const photoURL = res.data.data.url;

                        updateUserProfile({ displayName: data.name, photoURL })
                            .then(() => {
                                console.log('profile updated');
                            })
                            .catch(error => console.log(error.code))
                    })
                // </-----image hosting----->

            })
            .catch(error => toast.error(error.code))
    }
    return (
        <div className='max-w-[450px]'>
            <div className='mb-5 space-y-2'>
                <h2 className='text-4xl font-extrabold'>Create an Account</h2>
                <p className='text-accent'>Register with ZapShift</p>
                <img src={userImage} />
            </div>
            <form onSubmit={handleSubmit(handelLogin)}>
                <fieldset className="fieldset">
                    {/* Name  */}
                    <div>
                        <label className="label font-bold text-sm">Name</label>
                        <input type="text"
                            {...register('name')}
                            className="input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Name"

                        />
                    </div>
                    {/* photo  */}
                    <div>
                        <label className="label font-bold text-sm">Photo</label>
                        <input type="file"
                            {...register('photo')}
                            className="file-input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Choose your photo"

                        />
                    </div>
                    {/* email  */}
                    <div>
                        <label className="label font-bold text-sm">Email</label>
                        <input type="email"
                            {...register('email')}
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
            <p className='text-accent'>Already have an account? <Link to='/login'
                state={location.state}
                className='text-blue-500'>Login</Link></p>
            <p className='my-4 text-accent text-center'>Or</p>
            <SocialLogin></SocialLogin>
        </div >
    );
};

export default Register;