import React, { useEffect, useState } from "react";
import "./SalesNavbar.css";
import api from "../../../../../api";

const SalesNavbar = ({ setSellerItem }) => {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await api.get("/seller/getMeAsSeller", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSellerItem(res?.data)
        setSeller(res.data);
        console.log(res?.data)
      } catch (err) {
        console.error("Error fetching seller:", err);
      }
    };

    fetchSeller();
  }, []);

  const handleSignOut = () => {
    localStorage.clear()
    window.location = "/login";
  };

  return (
    <nav className="sales-navbar">
      <div className="logo">
        <span>🏢</span>
      </div>

      <div className="seller-info">
        {seller && (
          <>
            <span className="seller-name">{seller.name}</span>
            <span className="seller-email">{seller.email}</span>
          </>
        )}
        <button className="btn-seller signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default SalesNavbar;
