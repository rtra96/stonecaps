import React, { useEffect, useState } from "react";
import { fetchProducts } from "../API";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const nextProducts = await fetchProducts();
        console.log('API Response:', nextProducts);

        setProducts(nextProducts);
      } catch (err) {
        console.error(err);
      }
    }

    getProducts();
  }, []);

  const handleSeeDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <h2>All Products</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <img className="productimg" src={product.image} alt={`photo of ${product.id}`} />
            <br />
            <button onClick={() => handleSeeDetails(product.id)}>See Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
