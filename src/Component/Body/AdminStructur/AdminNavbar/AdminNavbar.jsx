import React, { useEffect, useState } from "react";
import "./AdminNavbar.css";
import api from "../../../../api";

const AdminNavbar = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                window.location = '/admin-login'
                return;
            }

            try {
                console.log(1)
                const res = await api.get("/admin/getMe", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAdmin(res.data);
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
                localStorage.removeItem("accessToken");
                window.location = '/admin-login'
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            await api.post("/admin/logout", { refreshToken });

            localStorage.removeItem("accessToken");  
            localStorage.removeItem("refreshToken"); 
            setAdmin(null);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <nav className="admin-navbar">
            <div className="navbar-logo">
                <span>🏠</span>
            </div>

            <div className="navbar-info">
                {loading ? (
                    <span className="navbar-loading">Loading...</span>
                ) : admin ? (
                    <>
                        <span className="navbar-name">{admin.name}</span>
                        <span className="navbar-email">{admin.email}</span>
                        <button className="navbar-signout" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <span className="navbar-noadmin">Not logged in</span>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;
