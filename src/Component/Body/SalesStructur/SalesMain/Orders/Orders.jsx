import React, { useEffect, useState } from "react";
import "./Orders.css";
import api from "../../../../../api";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/getOrdersAsSeller");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/updateStatus/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="order-page">
      <h2>Seller Orders</h2>

      {orders.length === 0 && <p>Order yoxdur</p>}

      {orders.map(order => (
        <div className="order-card" key={order._id}>
          
          <img src={order.product.itemImage} alt="" />

          <div className="order-info">
            <h3>{order.product.itemName}</h3>
            <p>Qiymət: ${order.product.price}</p>
            <p>Müştəri: {order.customer?.username}</p>
            <p>Status:
              <span className={`status ${order.orderStatus}`}>
                {order.orderStatus}
              </span>
            </p>

            {order.orderStatus === "pending" && (
              <div className="order-buttons">
                <button
                  className="approve"
                  onClick={() => updateStatus(order._id, "completed")}
                >
                  Təsdiq et
                </button>

                <button
                  className="cancel"
                  onClick={() => updateStatus(order._id, "cancelled")}
                >
                  Ləğv et
                </button>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
