import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "../services/authApi";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            // Login API
            const response =
await login(formData);

localStorage.setItem(
    "token",
    response.data.token
);

navigate("/");

            alert("Login Successful");

            navigate("/");

        } catch (err) {

            console.log(err);

            alert("Invalid Email or Password");

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-blue-600">

                        AI Planner

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Welcome Back

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label className="font-medium">

                            Email

                        </label>

                        <div className="relative mt-2">

                            <Mail
                                size={20}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                placeholder="example@gmail.com"

                                required

                                className="w-full border rounded-lg pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

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
                                size={20}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input

                                type={showPassword ? "text" : "password"}

                                name="password"

                                value={formData.password}

                                onChange={handleChange}

                                required

                                className="w-full border rounded-lg pl-11 pr-12 py-3 focus:ring-2 focus:ring-blue-500 outline-none"

                            />

                            <button

                                type="button"

                                onClick={() => setShowPassword(!showPassword)}

                                className="absolute right-3 top-3"

                            >

                                {

                                    showPassword

                                        ? <EyeOff size={20} />

                                        : <Eye size={20} />

                                }

                            </button>

                        </div>

                    </div>

                    {/* Remember Me */}

                    <div className="flex justify-between items-center">

                        <label className="flex items-center gap-2 text-sm">

                            <input type="checkbox" />

                            Remember Me

                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-blue-600 text-sm"
                        >

                            Forgot Password?

                        </Link>

                    </div>

                    <button

                        type="submit"

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"

                    >

                        Login

                    </button>

                </form>

                <div className="text-center mt-6">

                    <p className="text-gray-500">

                        Don't have an account?

                        <Link

                            to="/signup"

                            className="text-blue-600 ml-2 font-semibold"

                        >

                            Sign Up

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}