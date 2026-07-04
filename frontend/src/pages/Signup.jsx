import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import {register} from "../services/authApi";

export default function Signup() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            // API Call Here
            const response =
await register(formData);

localStorage.setItem(
    "token",
    response.data.token
);

navigate("/");

            alert("Account Created Successfully!");

            navigate("/login");

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex justify-center items-center">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-blue-600">

                        AI Planner

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Create your account

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label className="font-medium">

                            Full Name

                        </label>

                        <div className="relative mt-2">

                            <User
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    {/* Email */}

                    <div>

                        <label className="font-medium">

                            Email

                        </label>

                        <div className="relative mt-2">

                            <Mail
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                required
                                className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    {/* Password */}

                    <div>

                        <label className="font-medium">

                            Password

                        </label>

                        <div className="relative mt-2">

                            <Lock
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >

                                {
                                    showPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                }

                            </button>

                        </div>

                    </div>

                    {/* Confirm Password */}

                    <div>

                        <label className="font-medium">

                            Confirm Password

                        </label>

                        <div className="relative mt-2">

                            <Lock
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
                    >

                        Create Account

                    </button>

                </form>

                <div className="text-center mt-6">

                    <p className="text-gray-500">

                        Already have an account?

                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold ml-2"
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}