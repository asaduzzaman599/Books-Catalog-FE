import App from "@/App"
import Books from "@/components/Books"
import RecentBooks from "@/components/RecentBooks"
import AddBook from "@/pages/Book/AddBook"
import DetailsBook from "@/pages/Book/DetailsBooks/DetailsBook"
import UpdateBook from "@/pages/Book/UpdateBook"
import Login from "@/pages/Login"
import ReadList from "@/pages/ReadList"
import Signup from "@/pages/Signup"
import WishList from "@/pages/WishList"
import {
    createBrowserRouter,
} from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import NotFound from "@/pages/NotFound"
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [{
      path: "/",
      element: <RecentBooks />,
      },{
        path: "/home",
        element: <RecentBooks />,
        },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id",
        element: <DetailsBook />,
        },
        {
          path: "/add-new-book",
        element: <PrivateRoute><AddBook /></PrivateRoute>,
        },
        {
          path: "/update-book/:id",
        element: <PrivateRoute><UpdateBook /></PrivateRoute>,
        },
      {
        path: "/wish-list",
        element: <PrivateRoute><WishList /></PrivateRoute>,
        },
        {
            path: "/read-list",
            element: <PrivateRoute><ReadList /></PrivateRoute>,
            }]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "*",
        element: <NotFound />
    }
  ]);

  export default router