import React, { useState } from "react";
import "./CreateCategory.css";
import api from "../../../../../../api";

const CreateCategory = ({ setShowCategory }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {

      await api.post(
        "/categories/createCategory",
        { name }
      );

      setMessage({ type: "success", text: "Category created successfully!" });
      setName("");
      setShowCategory(false);
      
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-overlay">
      <div className="category-modal">
        <button
          className="category-close"
          onClick={() => setShowCategory(false)}
        >
          ✕
        </button>

        <h2 className="category-title">Create Category</h2>

        {message && (
          <p
            className={
              message.type === "error"
                ? "category-error"
                : "category-success"
            }
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="category-form">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="category-submit"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
