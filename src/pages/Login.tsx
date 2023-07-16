import { useLoginMutation } from '@/redux/features/auth/authApi'
import { setUser } from '@/redux/features/user/userSlice'
import { useAppDispatch } from '@/redux/hooks/hooks'
import { ILoginInput } from '@/types/globalTypes'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from './../components/ui/button'
import { Input } from './../components/ui/input'

const Login = () => {
    const navigate = useNavigate()
    const [login, result] =
    useLoginMutation();
    const dispatch = useAppDispatch()

    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ILoginInput>();

    

    if(result.isLoading){
        return <div>Loading...</div>
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
      
    const onSubmit =  (data: ILoginInput) => {
        console.log(data);
        login({data}).catch(err=>console.log(err))
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