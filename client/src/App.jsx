import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Invoices from "./pages/Invoices/Invoices";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AccountLayout from "./pages/Account/AccountLayout";
import Pemesanan from "./pages/Account/Pemesanan";
import Alamat from "./pages/Account/Alamat";
import currentToken from "./utils/getCurrentToken";
import AddAlamat from "./pages/Account/AddAlamat";
import LayoutAdmin from "./pages/admin/LayoutAdmin";
import { useSelector } from "react-redux";
import GetCategory from "./pages/admin/Category/GetCategory";
import GetInvoice from "./pages/admin/Invoice/GetInvoice";
import GetTags from "./pages/admin/Tag/GetTags";
import LayoutCategory from "./pages/admin/Category/LayoutCategory";
import LayoutInvoice from "./pages/admin/Invoice/LayoutInvoice";
import LayoutProduct from "./pages/admin/Product/LayoutProduct";
import LayoutTag from "./pages/admin/Tag/LayoutTag";
import AddProduct from "./pages/admin/Product/AddProduct";
import UpdateProduct from "./pages/admin/Product/UpdateProduct";
import AddCategory from "./pages/admin/Category/AddCategory";
import UpdateCategory from "./pages/admin/Category/UpdateCategory";
import AddTag from "./pages/admin/Tag/AddTag";
import UpdateTag from "./pages/admin/Tag/UpdateTag";
import GetProduct from "./pages/admin/Product/GetProduct";

function App() {
  const user = useSelector((state) => state.auth.user);

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "cart", Component: Cart },
        {
          path: "checkout",
          Component: Checkout,
          loader: () => {
            if (!currentToken) {
              return redirect("/");
            }
            return null;
          },
        },
        {
          path: "invoices/:id",
          Component: Invoices,
          loader: () => {
            if (!currentToken) {
              return redirect("/");
            }
            return null;
          },
        },
        {
          path: "login",
          Component: Login,
          loader: () => {
            if (currentToken) {
              return redirect("/");
            }
            return null;
          },
        },
        {
          path: "register",
          Component: Register,
          loader: () => {
            if (currentToken) {
              return redirect("/");
            }
            return null;
          },
        },
        {
          path: "account",
          Component: AccountLayout,
          loader: () => {
            if (!currentToken) {
              return redirect("/");
            }
            return null;
          },
          children: [
            { index: true, Component: Account },
            { path: "pemesanan", Component: Pemesanan },
            { path: "alamat", Component: Alamat },
            { path: "add", Component: AddAlamat },
          ],
        },
      ],
    },
    // admin site

    {
      path: "/admin",
      Component: LayoutAdmin,
      loader: () => {
        if (!currentToken || user.role !== "admin") {
          return redirect("/");
        }
        return null;
      },
      children: [
        {
          index: true,
          element: <Navigate replace to={"/admin/product"} />,
        },
        {
          path: "product",
          Component: LayoutProduct,
          children: [
            {
              index: true,
              Component: GetProduct,
            },
            { path: "add", Component: AddProduct },
            { path: "update:/id", Component: UpdateProduct },
          ],
        },
        {
          path: "invoice",
          Component: LayoutInvoice,
          children: [{ index: true, Component: GetInvoice }],
        },
        {
          path: "category",
          Component: LayoutCategory,
          children: [
            { index: true, Component: GetCategory },
            { path: "add", Component: AddCategory },
            { path: "update/:id", Component: UpdateCategory },
          ],
        },
        {
          path: "tag",
          Component: LayoutTag,
          children: [
            { index: true, Component: GetTags },
            { path: "add", Component: AddTag },
            { path: "update/:id", Component: UpdateTag },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
