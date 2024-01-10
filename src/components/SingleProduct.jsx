import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../API";
import "../App.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProductDetails() {
      try {
        const productDetails = await fetchProductById(id);
        console.log('Product details:', productDetails);
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

  return (
    <div>
      <h2>{product.title}</h2>
      <img className="productimg" src={product.image} alt={`photo of ${product.id}`} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default SingleProduct;