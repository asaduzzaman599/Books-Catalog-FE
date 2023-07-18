/* eslint-disable @typescript-eslint/no-misused-promises */
import Loading from '@/components/Loading'
import { useGetLoggedInUserQuery, useSignupMutation } from '@/redux/features/auth/authApi'
import { setUser } from '@/redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { ISignupInput, IUser } from '@/types/globalTypes'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './../components/ui/button'
import { Input } from './../components/ui/input'
import {toast} from 'react-toastify'
const Signup = () => {
    const navigate = useNavigate()
    const [signup, result] =
    useSignupMutation();
    
    const {user} = useAppSelector(state=>state.user)
    
    const {isLoading,isSuccess, data, error} = useGetLoggedInUserQuery(localStorage.getItem('tokenId') ?? '',{
      skip: !localStorage.getItem('tokenId')
    })
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
      } = useForm<ISignupInput>();

      if(isSuccess){
        dispatch(setUser({accessToken: localStorage.getItem('tokenId') as string, user: data.result as IUser }))
       }

    if(user){
      navigate('/')
    }

    if(error){
      localStorage.removeItem('tokenId')
    }

    if(result.isLoading, isLoading){
        return <Loading />
    }

    if(result.isSuccess){
        if(result.data.result){
        navigate('/login')
      }
    }

    if(result.isError){
      console.log(result.error)
        toast.error('Something is wrong. Please check console')
    }
      
    const onSubmit = async (data: ISignupInput) => {
        await signup({data})
      };
    return (
        <div className='h-screen w-full flex items-center justify-center  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='p-6 rounded shadow w-96 mx-auto grid gap-4 bg-white'>
                <div>
                    <h3 className='text-md font-medium'>Sign Up</h3>
                </div>
            <Input
              id="firstName"
              placeholder="First Name"
              required
              {...register('name.firstName', { required: 'First Name is required' })}
            />
            <Input
              id="lastName"
              placeholder="Last Name"
              autoCapitalize="none"
              {...register('name.lastName', { required: 'Last Name is required' })}
            />
            <Input
              id="signUpEmail"
              placeholder="your email"
              required
              type="email"
              autoCapitalize="none"
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              id="phone"
              placeholder="Phone Number"
              autoCapitalize="none"
              required
              {...register('phone', { required: 'Phone is required' })}
            />
            <Input
              id="signUpPassword"
              placeholder="your password"
              required
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />

            <Button>Login</Button>
            <div className='text-right'>
              <p>Already have account? <Link to={'/login'} className='underline'>Log in</Link></p>
            </div>
            </div>
            </form>
        </div>
    );
};

export default Signup;