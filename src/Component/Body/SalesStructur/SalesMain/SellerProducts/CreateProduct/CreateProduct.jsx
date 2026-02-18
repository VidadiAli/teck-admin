import React, { useEffect, useState } from "react";
import "./CreateProduct.css";
import api from "../../../../../../api";
import { uploadImage } from "../../../../../../uploadImage";

const CreateProduct = ({ setShowCreate }) => {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState(null)
  const [imgType, setImgType] = useState(0)

  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    serialNumber: "",
    hasDiscount: false,
    discountPercent: 0,
    rating: 0,
    salesCount: 0,
    stock: "",
    itemImage: "",
    salesCompany: "",
    productBarcod: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories/getCategories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMessage({ type: "error", text: "Token mövcud deyil" });
        return;
      }

      if (imgType == 0) {
        setMessage({ type: "error", text: "Şəkil tipi təyin et!" });
        return;
      }

      let imageUrl = formData.itemImage;
      if (imgType == 1 && file) {
        imageUrl = await getImageUrl();  
      }

      if (!imageUrl) {
        setMessage({ type: "error", text: "Şəkil yüklənmədi" });
        return;
      }

      await api.post(
        "/products/createProductBySeller",
        { ...formData, itemImage: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage({ type: "success", text: "Product created successfully!" });
      setFormData({
        itemName: "",
        price: "",
        serialNumber: "",
        hasDiscount: false,
        discountPercent: 0,
        rating: 0,
        salesCount: 0,
        stock: "",
        itemImage: "",
        salesCompany: "",
        productBarcod: "",
        category: "",
      });
      setShowCreate(false);
      window.location.reload();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Error occurred" });
    } finally {
      setLoading(false);
    }
  };


  const getImageUrl = async () => {
    if (!file) return null;
    const url = await uploadImage(file);
    setImgUrl(url);  
    return url;
  };

  return (
    <div className="product-overlay">
      <div className="product-card">
        <button className="close-btn" onClick={() => setShowCreate(false)}>
          ✕
        </button>

        <h2>Create Product</h2>

        {message && (
          <p className={message.type === "error" ? "error-msg" : "success-msg"}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <input
            name="itemName"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <input
            name="serialNumber"
            placeholder="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />

          <input
            name="productBarcod"
            placeholder="Product Barcod"
            value={formData.productBarcod}
            onChange={handleChange}
            required
          />

          <input
            name="salesCompany"
            placeholder="Sales Company"
            value={formData.salesCompany}
            onChange={handleChange}
            required
          />

          {
            imgType == 0 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setImgType(1) }}>şəkil yüklə</button>
                <button onClick={() => { setImgType(2) }}>Şəkil url əlavə et</button>
              </div>
            )
          }

          {
            imgType == 1 ? <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            /> :
              imgType == 2 ? <input
                type="text"
                value={formData?.itemImage}
                onChange={handleChange}
                placeholder="https://past-image-link-is-here.png"
                name="itemImage"
                required
              /> : <></>
          }

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                name="hasDiscount"
                checked={formData.hasDiscount}
                onChange={handleChange}
              />
              Has Discount
            </label>

            <input
              name="discountPercent"
              type="number"
              placeholder="Discount %"
              min="0"
              max="100"
              value={formData.discountPercent}
              onChange={handleChange}
              disabled={!formData.hasDiscount}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
