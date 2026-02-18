import React, { useState } from "react";
import "./Login.css";
import api from "../../api";

const Login = ({ isAdmin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (localStorage.getItem('accessToken')) {
            setMessage(`You already log in as ${localStorage.getItem("isAdmin") == "admin" ? 'Admin' : 'Seller'}`)
            setTimeout(() => {
                window.location = isAdmin ? '/admin' : '/'
            }, 2000)
            return;
        }

        try {
            const res = await api.post(`${isAdmin ? '/admin/login' : '/seller/login'}`, { email, password });
            setMessage("Login successful ✅");
            console.log(res.data);
            localStorage.setItem("isAdmin", `${isAdmin ? 'admin' : 'seller'}`);
            localStorage.setItem("accessToken", res?.data?.accessToken)
            localStorage.setItem("refreshToken", res?.data?.refreshToken)
            setTimeout(() => {
                window.location = isAdmin ? '/admin' : '/';
            }, 1500)
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">{`${isAdmin ? 'Admin Login' : 'Seller Login'}`}</h2>

                <label className="login-label">Email</label>
                <input
                    type="email"
                    placeholder={`${isAdmin ? 'admin@example.com' : 'seller@example.com'}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                />

                <label className="login-label">Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                {message && <p className="login-message">{message}</p>}
            </form>
        </div>
    );
};

export default Login;
