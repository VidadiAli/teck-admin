import React, { useEffect, useState } from "react";
import "./SalesProducts.css";
import api from "../../../../../api";
import CreateProduct from "./CreateProduct/CreateProduct";
import CreateCategory from "./CreateCategory/CreateCategory";

const SalesProducts = ({ sellerItem }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false)
  const [showCategory, setShowCategory] = useState(false)

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await api.get(`/products/getProductsBySeller/${sellerItem?._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = () => {
    setShowCreate(true)
  }

  const createCategory = () => {
    setShowCategory(true)
  }


  useEffect(() => {
    if (!sellerItem?._id) return;
    fetchProducts();
  }, [sellerItem]);

  return (
    <div className="sales-products-wrapper">

      <div className="products-header">
        <h2>Products</h2>

        <div className="header-actions">
          <button className="action-btn products-primary" onClick={createProduct}>
            ➕ Create Product
          </button>

          <button className="action-btn products-soft" onClick={createCategory}>
            ➕ Create Category
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {products.map((item) => (
            <div className="product-card" key={item._id}>

              {item.itemImage && (
                <img src={item.itemImage} alt={item.itemName} />
              )}

              <h3>{item.itemName}</h3>

              <p className="price">
                ${item.price}
              </p>

              {item.hasDiscount && (
                <p className="discount">
                  {item.discountPercent}% Discount
                </p>
              )}

              <p className="category">
                {item.category?.name || "No Category"}
              </p>

            </div>
          ))}
        </div>
      )}

      {
        showCreate && (
          <CreateProduct setShowCreate={setShowCreate} />
        )
      }

      {
        showCategory && (
          <CreateCategory setShowCategory={setShowCategory} />
        )
      }
    </div>
  );
};

export default SalesProducts;
