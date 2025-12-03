import userImage from '../../assets/image-upload-icon.png'
import { useForm } from "react-hook-form"
import { Link, useNavigate, useLocation } from 'react-router';
import SocialLogin from './SocialLogin';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Loader from '../../Components/Logo/Loader/Loader';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm()

    const location = useLocation()
    const from = location.state || '/'

    const { login, loading, user } = useAuth()

    const navigate = useNavigate()

    const handelLogin = (data) => {
        login(data.email, data.password)
            .then(() => {
                toast.success("logged in successfully")
                navigate(from)
            })
            .catch(error => console.log(error.code))
    }
    if (loading) <Loader />
    if (user) return navigate(from)

    return (
        <div className='max-w-[450px] '>
            <div className='mb-5 space-y-2'>
                <h2 className='text-4xl font-extrabold'>Welcome Back</h2>
                <p className='text-accent'>login with ZapShift</p>
                <img src={userImage} />
            </div>
            <form onSubmit={handleSubmit(handelLogin)}>
                <fieldset className="fieldset text-base">
                    {/* email  */}
                    <div>
                        <label className="label font-bold text-sm">Email</label>
                        <input type="email"
                            className="input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Email"
                            {...register('email')} />

                    </div>
                    {/* password  */}
                    <div>
                        <label className="label font-bold text-sm">Password</label>
                        <input type="password"
                            className="input w-full rounded-lg focus:border-[#94A3B8] focus:border-2 text-base focus:outline-none" placeholder="Password"
                            {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ })} />
                        {errors.password?.type === 'required' && <p className='text-red-500'>password is required</p>}
                        {errors.password?.type === "minLength" && <p className='text-red-500'>password must be at least 6 character</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must be at least 6 characters, include 1 lowercase, 1 uppercase, and 1 digit</p>}
                    </div>
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary text-black mt-4 text-base">Login</button>
                </fieldset>
            </form>
            <p className='text-accent'>Don't have any Account? <Link to='/register'
                state={location.state}
                className='text-blue-500'>Register</Link></p>
            <p className='my-4 text-accent text-center'>Or</p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;