import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../API";
import { useCart } from "./CartContext";
import "../App.css";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    async function getProductDetails() {
      try {
        const productDetails = await fetchProductById(id);
        setProduct(productDetails);
      } catch (err) {
        console.error(err);
      }
    }

    getProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div>
      <h4>{product.title}</h4>
      <img
        className="productimg"
        src={product.image}
        alt={`photo of ${product.id}`}
      />
      <p className="how-much-dat-is">${product.price}</p>
      <p>{product.description}</p>
      <div className="linky-container">
        <button className="linkybuttons" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="linkybuttons">
          <Link to="/cart">
            Checkout ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;

