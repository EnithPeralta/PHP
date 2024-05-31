import React, { useState, useEffect } from "react";
import ProductShow from "./components/ProductShow";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const productos = await axios.get("http://localhost/php/api/index.php");
      setProducts(productos.data);
    };
    fetchData();
  }, [products.length]);

  const eliminarProduct = async (id) => {
    const eliminar = await axios.delete(
      `http://localhost/php/api/index.php/${id}`
    );
    products.find((producto) => {
      producto.id === id && products.splice(products.indexOf(producto), 1);
    });
    setProducts([...products]);
  };
 
  return (
    <>
      <div>
        <ProductShow  products={products}
          eliminarProduct={eliminarProduct} />
      </div>
    </>
  );
}

export default App;
