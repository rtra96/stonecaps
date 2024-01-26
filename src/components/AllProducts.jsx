import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../API"; 
import { useNavigate } from "react-router-dom";
import "../App.css";
import ScrollToTopIcon from '../images/uparrow.svg';

export default function AllProducts({ resetCategoryFilter }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductsAndCategories() {
      try {
        const nextProducts = await fetchProducts();
        setProducts(nextProducts);

        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (err) {
        console.error(err);
      }
    }

    getProductsAndCategories();

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Attach the click event to scroll to top
    const scrollIcon = document.getElementById('scroll-to-top-icon');
    if (scrollIcon) {
      scrollIcon.addEventListener('click', scrollToTop);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (scrollIcon) {
        scrollIcon.removeEventListener('click', scrollToTop);
      }
    };
  }, []);

  const handleSeeDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      fetchProductsByCategory(category)
        .then((products) => setProducts(products))
        .catch((error) => console.error(error));
    } else {
      // If no category is selected, fetch all products
      fetchProducts()
        .then((allProducts) => setProducts(allProducts))
        .catch((error) => console.error(error));
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <div>
        <div>
          <label htmlFor="category">Sort by Category:</label>
          <select id="category" onChange={(e) => handleCategoryChange(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h4>{product.title}</h4>
            <img className="productimg" src={product.image} alt={`photo of ${product.id}`} />
            <br /><br />
            <button className="linkybuttons" onClick={() => handleSeeDetails(product.id)}>See Details</button>
            <br /><br />
          </div>
        ))}
      </div>
      <div
        id="scroll-to-top-icon"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
        }}
      >
        <img src={ScrollToTopIcon} alt="Scroll to Top" width="30" height="30" />
      </div>
    </div>
  );
}
