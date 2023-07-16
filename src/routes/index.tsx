import App from "@/App"
import Books from "@/components/Books"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import {
    createBrowserRouter,
} from "react-router-dom"
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{
      path: "/",
      element: <Books />,
      }]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
  ]);

  export default router