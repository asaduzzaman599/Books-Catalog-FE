
import Loading from './components/Loading'
import MainLayout from './layout/MainLayout'
import { useGetLoggedInUserQuery } from './redux/features/auth/authApi'
import { setUser } from './redux/features/user/userSlice'
import { useAppDispatch } from './redux/hooks/hooks'
import { IUser } from './types/globalTypes'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

function App() {
const token = localStorage.getItem('tokenId')
 const {isLoading,isSuccess, data, error} = useGetLoggedInUserQuery(token ?? '',{skip:!token})
 const dispatch = useAppDispatch()

 if(isLoading){
  return <Loading />
 }
 
 if(isSuccess){
  
  dispatch(setUser({accessToken: localStorage.getItem('tokenId') as string, user: data.result as IUser }))
 }
 if(error){
  localStorage.removeItem('tokenId')
 }

  return (
    <>
    <Tooltip id="my-tooltip" />
      <MainLayout />
    </>
  )
}

export default App
