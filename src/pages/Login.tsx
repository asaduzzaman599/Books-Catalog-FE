/* eslint-disable @typescript-eslint/no-misused-promises */
import Loading from '@/components/Loading'
import { useGetLoggedInUserQuery, useLoginMutation } from '@/redux/features/auth/authApi'
import { setUser } from '@/redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { ILoginInput, IUser } from '@/types/globalTypes'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './../components/ui/button'
import { Input } from './../components/ui/input'
// import toast from 'react-hot-toast';

import {  toast  } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [login, result] =
    useLoginMutation();
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state=>state.user)
    
    const {isLoading,isSuccess, data,  error, status} = useGetLoggedInUserQuery(localStorage.getItem('tokenId') ?? '',{skip:!localStorage.getItem('tokenId')})
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ILoginInput>();

      if(isSuccess){
        // toast.success('User logged in successfully!')
        
        dispatch(setUser({accessToken: localStorage.getItem('tokenId') as string, user: data.result as IUser }))
        navigate('/')
       }
    if(user){
      
      toast.success('User logged in!')
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
        dispatch(setUser(result?.data?.result))
        localStorage.setItem('tokenId',result.data.result.accessToken)
        navigate('/')
      }
    }

    if(result.isError){
        console.log(result.error)
        toast.error('Something is wrong. Please check console')
    }
      
    const onSubmit =  async (data: ILoginInput) => {
        await login({data})
      };

    return (
        <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% '>
          
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='p-6 rounded shadow w-96 mx-auto grid gap-4 bg-white'>
                <div>
                    <h3 className='text-md font-medium'>Login</h3>
                </div>
            <Input
              id="email"
              placeholder="your email"
              type="email"
              autoCapitalize="none"
              required
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              required
              {...register('password', { required: 'Password is required' })}
            />

            <Button>Login</Button>
            <div className='text-right'>
              <p>Don't have account? <Link to={'/signup'} className='underline'>Sign Up</Link></p>
            </div>
            </div>
            </form>
        </div>
    );
};

export default Login;