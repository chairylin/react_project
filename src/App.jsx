import React from "react";
import { RestaurantPage } from "./pages/RestaurantPage/RestaurantPage";
import { Layout } from "./components/Layout/Layout";
import { ThemeContextProvider } from "./components/ThemeContextProvider/ThemeContextProvider";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { CartPage } from "./pages/CartPage/CartPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Restaurant } from "./components/Restaurant/Restaurant";

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeContextProvider>
          <Layout>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/restaurants" element={<RestaurantPage />}>
                <Route path=":restaurantId" element={<Restaurant />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/redirect" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </ThemeContextProvider>
      </Provider>
    </BrowserRouter>
  );
};
