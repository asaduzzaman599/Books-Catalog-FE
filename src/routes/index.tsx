import Books from "@/components/Books"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import {
    createBrowserRouter,
} from "react-router-dom"
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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