import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLayout } from "./Components/Layout/UserLayout";
import { Home } from "./pages/Home";
import { Toaster } from "sonner";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { CollectionPage } from "./pages/CollectionPage";
import { ProductDetails } from "./Components/Products/ProductDetails";
import { Checkout } from "./Components/Cart/Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { MyOrder } from "./pages/MyOrder";
import { OrderDetailsPage } from "./pages/OrderDetailsPage";
import { AdminLayout } from "./Components/Admin/AdminLayout";
import { AdminHomePage } from "./pages/AdminHomePage";
import { UserManagement } from "./Components/Admin/UserManagement";

const App = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/my-orders" element={<MyOrder />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
};

export default App;
