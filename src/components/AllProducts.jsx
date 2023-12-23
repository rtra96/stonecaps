import React,{ useEffect, useState} from "react";
import { fetchProducts } from "../API";
import { useNavigate } from "react-router-dom";

export default function AllProducts (){
    const [products, setProducts] =useState([]);
    const navigate = useNavigate ();
    console.log(products);
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
    
        <div>
            products
         </div>
  
     </div>
 );
}

