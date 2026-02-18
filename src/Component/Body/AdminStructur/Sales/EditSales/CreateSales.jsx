import React, { useState } from "react";
import "./CreateSales.css";
import api from "../../../../../api";

const CreateSales = ({ setShowCreateComponent }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("accessToken"); 
      if(!token) return;

      const res = await api.post(
        "/seller/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: "success", text: "Seller created successfully!" });
      setFormData({ name: "", email: "", phone: "", company: "", password: "" });

    } catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-modal">
      <div className="create-card">
        <button
          className="close-btn-create-c"
          onClick={() => setShowCreateComponent(false)}
        >
          &times;
        </button>
        <h2>Create Seller</h2>

        {message && (
          <p className={message.type === "error" ? "error-msg" : "success-msg"}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="create-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-create-c primary-create-c" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSales;
