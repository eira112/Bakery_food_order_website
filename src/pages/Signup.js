import { useState } from "react";
import { addUser } from "../services/user";
import signupPhoto from "../Assets/signupPhoto.jpeg";

const SignUp = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    addUser(user).then((response) => {
      if (response.data) {
        console.log("Sign up successful"); // Add notification here
      }
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${signupPhoto})` }}
    >
      {/* Home button */}
      <a
        href="/"
        className="absolute top-5 left-5 flex items-center text-white text-lg hover:underline z-10"
      >
        <i className="bi bi-arrow-left mr-2"></i> Go Home
      </a>

      <div className="flex justify-center items-center w-full px-4">
        <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg text-white">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <h2 className="text-lg font-light mb-6">Don't have an account?</h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
