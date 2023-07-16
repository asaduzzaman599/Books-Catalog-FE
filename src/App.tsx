
import Loading from './components/Loading'
import MainLayout from './layout/MainLayout'
import { useGetLoggedInUserQuery } from './redux/features/auth/authApi'
import { setUser } from './redux/features/user/userSlice'
import { useAppDispatch } from './redux/hooks/hooks'
import { IUser } from './types/globalTypes'

function App() {

 const {isLoading,isSuccess, data} = useGetLoggedInUserQuery(localStorage.getItem('tokenId') ?? '')
 const dispatch = useAppDispatch()

 if(isLoading){
  return <Loading />
 }
 
 if(isSuccess){
  
  dispatch(setUser({accessToken: localStorage.getItem('tokenId') as string, user: data.result as IUser }))
 }

  return (
    <>
      <MainLayout />
    </>
  )
}

export default App
