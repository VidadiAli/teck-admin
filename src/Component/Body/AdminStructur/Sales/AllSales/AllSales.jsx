import React, { useEffect, useState } from "react";
import "./AllSales.css";
import api from "../../../../../api";
import CreateSales from "../EditSales/CreateSales";

const AllSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateComponent, setShowCreateComponent] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("az-AZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const fetchSales = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      setLoading(true);
      const res = await api.get("/seller/get", { headers: { Authorization: `Bearer ${token}` } });
      setSales(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const createSeller = () => {
    setShowCreateComponent(true)
  }

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h2>Sales Team</h2>
        <button className="sales-btn sales-primary" onClick={createSeller}>Create Seller</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="sales-grid">
          {sales.map((sale) => (
            <div key={sale._id} className="sales-card">
              <h3>{sale.name}</h3>
              <p><strong>Email:</strong> {sale.email}</p>
              <p><strong>Phone:</strong> {sale.phone}</p>
              <p><strong>Company:</strong> {sale.company}</p>
              <p><strong>Created:</strong> {formatDate(sale.createdAt)}</p>
              <p><strong>Updated:</strong> {formatDate(sale.updatedAt)}</p>

              <div className="card-actions">
                <button className="sales-btn sales-warning">Edit</button>
                <button className="sales-btn sales-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {
        showCreateComponent && (
          <CreateSales setShowCreateComponent={setShowCreateComponent} />
        )
      }
    </div>
  );
};

export default AllSales;
