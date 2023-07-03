import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "cart", Component: Cart },
        { path: "checkout", Component: Checkout },
        { path: "invoices", Component: Invoices },
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
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={<Layout />}>
//       <Route index element={<Home />} />
//       <Route path="account" element={<AccountLayout />}>
//         <Route index element={<Account />} />
//         <Route path="pemesanan" element={<Pemesanan />} />
//         <Route path="alamat" element={<Alamat />} />
//       </Route>
//       <Route path="cart" element={<Cart />} />
//       <Route path="checkout" element={<Checkout />} />
//       <Route path="invoices" element={<Invoices />} />
//       <Route path="login" element={<Login />} />
//       <Route path="register" element={<Register />} />
//     </Route>
//   </Routes>
// </BrowserRouter>
