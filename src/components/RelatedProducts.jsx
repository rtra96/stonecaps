import React, { useEffect, useState } from "react";
import { fetchProducts } from "../API";
import { Link } from "react-router-dom";
import "../App.css"; 

const RelatedProducts = ({ currentProductId, currentCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    async function getRelatedProducts() {
      try {
        const allProducts = await fetchProducts();
        const filteredProducts = allProducts.filter(
          (product) =>
            product.id !== currentProductId && product.category === currentCategory
        );
        setRelatedProducts(filteredProducts.slice(0, 4)); // Show up to 4 related products
      } catch (err) {
        console.error(err);
      }
    }

    getRelatedProducts();
  }, [currentProductId, currentCategory]);

  return (
    <div className="relativity"> 
      <div className="related-products-container">
        {relatedProducts.map((product) => (
          <div key={product.id} className="related-product-item">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={`photo of ${product.id}`}
                className="related-product-image" 
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
