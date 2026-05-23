import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();

    const [admindata, setUserData] = useState({
        name: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...admindata,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!admindata.name) {
            errors.name = "Please enter your name";
        }
        if (!admindata.password) {
            errors.password = "Please enter your password";
        } else if (admindata.password !== "sian123"){
            errors.password = "Please enter correct password";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/admin', {
                method: 'POST',
                body: JSON.stringify(admindata),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Response from server:', data);
            navigate('/AdminUi');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div style={{ backgroundImage: "URL(https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}>
            <div className="container" style={{ height: "100vh", width: "100%", justifyContent: "center", alignItems: "center", display: 'flex' }}>
                <form method="POST" onSubmit={handleSubmit} style={{ padding: "10px", backgroundColor: "#c3c1c1fc", padding: "20px", width: "500px", height: "400px", borderRadius: "12px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" , margin:"20px", backdropFilter:"blur(20px)" }}>
                    <h1>Admin Form</h1>

                    <input style={{ margin: "10px", padding: "10px", borderRadius: "10px", width: "300px" }}
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={admindata.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}

                    <div style={{display:"flex"}}>
                        <input style={{ margin: "0px", padding: "10px", borderRadius: "10px", width: "300px", position: "relative", left: "17px" }}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            name="password"
                            value={admindata.password}
                            onChange={handleChange}
                        />
                        <button
                            style={{ backgroundColor: 'transparent', position: 'relative', top: '0px', left: "-20px", border: "none" }}
                            type="button"
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/16527/16527676.png"
                                alt="Show Password"
                                style={{ width: '20px', height: '20px' }}
                            />
                        </button>
                    </div>
                    {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}

                    <input type="submit" value="Submit" style={{margin:"10px", backgroundColor: "blue", color: "white", padding: "10px", borderRadius: "10px", width: "80px", textAlign: "center" }} />

                    <Link style={{ margin: "0px" }} to="/">User Login</Link>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
