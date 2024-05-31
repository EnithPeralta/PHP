import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductShow from './components/ProductShow';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/php/api/index.php')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductShow products={products} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;