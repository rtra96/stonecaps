import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCategories, formatPrice } from "../API";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ScrollToTopIcon from "../images/uparrow.svg";
import PriceIcon from "../images/price.svg";
import CategoriesIcon from "../images/categories.svg";

export default function AllProducts({ resetCategoryFilter }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductsAndCategories() {
      try {
        const nextProducts = await fetchProducts();
        setProducts(nextProducts);
        setSortedProducts(nextProducts);

        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (err) {
        console.error(err);
      }
    }

    getProductsAndCategories();

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollIcon = document.getElementById("scroll-to-top-icon");
    if (scrollIcon) {
      scrollIcon.addEventListener("click", scrollToTop);
    }

    return () => {
      if (scrollIcon) {
        scrollIcon.removeEventListener("click", scrollToTop);
      }
    };
  }, []);

  const handleSeeDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "all") {
      setSortedProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === category
      );
      setSortedProducts(filteredProducts);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);

    const sortedProductsClone = [...sortedProducts];

    if (order === "asc") {
      sortedProductsClone.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedProductsClone.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedProductsClone);
  };

  return (
    <div className="product-grid-container">
      <div className="categories">
        <div className="category-select">
          <label htmlFor="category">Sort           
          <img src={CategoriesIcon} 
               alt="categorized view"
               style={{ maxWidth: "30px", maxHeight: "30px" }} /></label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">all</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-select">
          <label htmlFor="sortOrder">Sort 
          <img src={PriceIcon} 
               alt="Sort by Price"
               style={{ maxWidth: "30px", maxHeight: "30px" }} /></label>
          <select
            id="sortOrder"
            value={sortOrder || ""}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">none</option>
            <option value="asc">lowest to highest</option>
            <option value="desc">highest to lowest</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <h4 className = "product-item-content">{product.title}</h4>
            <img
              className="productimg"
              src={product.image}
              alt={`photo of ${product.id}`}
            />
            <br />
            <br />
            <p className="how-much-dat-is">${formatPrice(product.price)}</p>
            <button
              className="linkybuttons see-details-button"
              onClick={() => handleSeeDetails(product.id)}
            >
              See Details
            </button>
            <br />
            <br />
          </div>
        ))}
      </div>

      <div
        id="scroll-to-top-icon"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
        }}
      >
        <img src={ScrollToTopIcon} alt="Scroll to Top" width="30" height="30" />
      </div>
    </div>
  );
}
