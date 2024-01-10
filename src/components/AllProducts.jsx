import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div>
      <h2>All Products</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <img className="productimg" src={product.image} alt={`photo of ${product.id}`} />
            <p>Price: ${product.price}</p>
            <Link to={`/products/${product.id}`}><button>See Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
