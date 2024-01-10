import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ProductList = lazy(() => import("./ProductList"));
const ProductDetails = lazy(() => import("./ProductDetails"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetails />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
