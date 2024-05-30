import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Protected from "./features/auth/components/Protected"
import AdminProtected from "./features/admin/AdminProtected"
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AdminBillsPage from "./pages/AdminBillsPage";
import UserPage from "./pages/UserPage";
import Signout from "./features/auth/components/Signout";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home/></Protected>
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/bill",
    element:<Protected><CartPage/></Protected>
  },
  {
    path: "/user",
    element:<Protected><UserPage/></Protected>
  },
  {
    path: "/admin/products",
    element:<AdminProtected><AdminProductsPage/></AdminProtected>
  },
  {
    path: "/admin/add-product",
    element:<AdminProtected><AddProductPage/></AdminProtected>
  },
  {
    path: "/admin/edit-product/:id",
    element:<AdminProtected><EditProductPage/></AdminProtected>
  },
  {
    path: "/admin/bills",
    element:<AdminProtected><AdminBillsPage/></AdminProtected>
  },
  {
    path: "/signout",
    element:<Signout/>
  },
]);
function App() {


  return (
    <>
      <>
        <RouterProvider router={router} />
      </>
    </>
  )
}

export default App
