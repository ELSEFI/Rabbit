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

const App = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQMXlLj7WF3wOoUvBEuQ1Y9aAxukF8ieXzHoE4dDL2UrBN7GFvbiVWfVmk5v0cWmhxHTbirVEaWyatvo",
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
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          </Route>

          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
};

export default App;
