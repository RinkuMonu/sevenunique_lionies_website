import { Routes, Route } from "react-router-dom";
import Layout from "./layout.jsx";
import Home from "./pages/Home";
import "./index.css";
import PrivacyPolicy from "./pages/Privacy.jsx";
import TermsConditions from "./pages/Terms.jsx";
import RefundPolicy from "./pages/Refund.jsx";
import CartOffCanvas from "./components/Header/CartOffCanvas.jsx";
import LoginModal from "./components/Header/Login.jsx";
import UserProfilePage from "./pages/Userprofile.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductListingPage from "./components/ProductListingPage.jsx";
import CheckoutPage from "./components/Checkout.jsx";
import { AddProductWithVariant } from "./components/admin/addProduct.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<CartOffCanvas />} />
        <Route path="login" element={<LoginModal />} />
        <Route path="userprofile" element={<UserProfilePage />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<LoginModal />} />
        <Route path="productlist" element={<ProductListingPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsConditions />} />
        <Route path="refund" element={<RefundPolicy />} />
        {/*  for test do not remove */}
        <Route path="add" element={<AddProductWithVariant />} />
        {/*  for test do not remove */}
        <Route
          path="*"
          element={
            <div className="text-center py-20">
              <h1 className="text-6xl font-bold text-gray-400">404</h1>
              <p className="text-xl text-gray-500">Page Not Found</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
