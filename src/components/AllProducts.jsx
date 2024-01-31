import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../API";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ScrollToTopIcon from "../images/uparrow.svg";

export default function AllProducts({ resetCategoryFilter }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Set default category to 'all'
  const [sortOrder, setSortOrder] = useState(null); // Default to null for no initial sorting
  const [sortedProducts, setSortedProducts] = useState([]); // Separate state for sorted products
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductsAndCategories() {
      try {
        const nextProducts = await fetchProducts();
        setProducts(nextProducts);
        setSortedProducts(nextProducts); // Initialize sortedProducts with initial products

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

    // Attach the click event to scroll to top
    const scrollIcon = document.getElementById("scroll-to-top-icon");
    if (scrollIcon) {
      scrollIcon.addEventListener("click", scrollToTop);
    }

    // Cleanup event listener on component unmount
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
      // If 'all' is selected, set sortedProducts to all products
      setSortedProducts(products);
    } else {
      // If a specific category is selected, set sortedProducts to filtered products
      const filteredProducts = products.filter(
        (product) => product.category === category,
      );
      setSortedProducts(filteredProducts);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);

    // Clone the sorted products array to avoid mutating the original state
    const sortedProductsClone = [...sortedProducts];

    if (order === "asc") {
      sortedProductsClone.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedProductsClone.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedProductsClone);
  };

  return (
    <div>
      <div>
        <div className="category-select">
          <label htmlFor="category">Sort by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {/* Add the default 'all' option... was not provided by this API */}
            <option value="all">all</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-select">
          <label htmlFor="sortOrder">Sort by Price:</label>
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

      {sortedProducts.map((product) => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <img
            className="productimg"
            src={product.image}
            alt={`photo of ${product.id}`}
          />
          <br />
          <br />
          <button
            className="linkybuttons"
            onClick={() => handleSeeDetails(product.id)}
          >
            See Details
          </button>
          <br />
          <br />
        </div>
      ))}

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
