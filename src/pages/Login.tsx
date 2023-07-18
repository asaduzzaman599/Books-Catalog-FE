/* eslint-disable @typescript-eslint/no-misused-promises */
import Loading from '@/components/Loading'
import { useGetLoggedInUserQuery, useLoginMutation } from '@/redux/features/auth/authApi'
import { setUser } from '@/redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks'
import { ILoginInput, IUser } from '@/types/globalTypes'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from './../components/ui/button'
import { Input } from './../components/ui/input'

const Login = () => {
    const navigate = useNavigate()
    const [login, result] =
    useLoginMutation();
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state=>state.user)
    
    const {isLoading,isSuccess, data} = useGetLoggedInUserQuery(localStorage.getItem('tokenId') ?? '')
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ILoginInput>();

      if(isSuccess){
        dispatch(setUser({accessToken: localStorage.getItem('tokenId') as string, user: data.result as IUser }))
       }
    if(user){
      navigate('/')
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
    }
      
    const onSubmit =  async (data: ILoginInput) => {
        await login({data})
      };

    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='p-6 rounded shadow w-96 mx-auto grid gap-4'>
                <div>
                    <h3 className='text-md font-medium'>Login</h3>
                </div>
            <Input
              id="email"
              placeholder="your email"
              type="email"
              autoCapitalize="none"
              {...register('email', { required: 'Email is required' })}
            />
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />

            <Button>Login</Button>
            </div>
            </form>
        </div>
    );
};

export default Login;