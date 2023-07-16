import App from "@/App"
import Books from "@/components/Books"
import ReadList from "@/components/ReadList"
import WishList from "@/components/WishList"
import AddBook from "@/pages/Book/AddBook"
import DetailsBook from "@/pages/Book/DetailsBook"
import UpdateBook from "@/pages/Book/UpdateBook"
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
          path: "/add-book",
        element: <AddBook />,
        },
        {
          path: "/update-book/:id",
        element: <UpdateBook />,
        },
      {
        path: "/wish-list",
        element: <WishList />,
        },
        {
            path: "/read-list",
            element: <ReadList />,
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