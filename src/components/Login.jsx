import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");

  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  // return (
  //   <div className="flex justify-center my-10">
  //     <div className="card bg-base-300 w-96 shadow-sm">
  //       <div className="card-body">
  //         <h2 className="card-title justify-center">
  //           {isLoginForm ? "Login" : "Signup"}
  //         </h2>
  //         <div>
  //           {" "}
  //           {!isLoginForm && (
  //             <>
  //               {" "}
  //               <label className="form-control w-full max-w-xs my-2">
  //                 <div className="label">
  //                   <span className="label-text">First Name</span>
  //                 </div>
  //                 <input
  //                   type="text"
  //                   value={firstName}
  //                   className="input input-bordered w-full max-w-xs"
  //                   onChange={(e) => setFirstName(e.target.value)}
  //                 />
  //               </label>
  //               <label className="form-control w-full max-w-xs my-2">
  //                 <div className="label">
  //                   <span className="label-text">Last Name</span>
  //                 </div>
  //                 <input
  //                   type="text"
  //                   value={lastName}
  //                   className="input input-bordered w-full max-w-xs"
  //                   onChange={(e) => setLastName(e.target.value)}
  //                 />
  //               </label>{" "}
  //             </>
  //           )}
  //           <label className="form-control w-full max-w-xs my-2">
  //             <div className="label">
  //               <span className="label-text">Email ID</span>
  //             </div>
  //             <input
  //               type="text"
  //               value={emailId}
  //               className="input input-bordered w-full max-w-xs"
  //               onChange={(e) => setEmailId(e.target.value)}
  //             />
  //           </label>
  //           <label className="form-control w-full max-w-xs my-2">
  //             <div className="label">
  //               <span className="label-text">Password</span>
  //             </div>
  //             <input
  //               type="text"
  //               value={password}
  //               className="input input-bordered w-full max-w-xs"
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </label>
  //         </div>
  //         {error && <p className="text-red-500 text-center mt-2">{error}</p>}
  //         <div className="card-actions justify-center m-2">
  //           <button
  //             className="btn btn-primary"
  //             onClick={isLoginForm ? handleLogin : handleSignUp}
  //           >
  //             {isLoginForm ? "Login" : "SignUp"}
  //           </button>
  //         </div>

  //         <p
  //           className="m-auto cursor-pointer py-2"
  //           onClick={() => setIsLoginForm((value) => !value)}
  //         >
  //           {isLoginForm
  //             ? "New User? Singup Here"
  //             : "Existing User? Login Here"}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );



return (
  <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">
          {isLoginForm ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-base-content/60 mt-1">
          {isLoginForm
            ? "Login to continue to DevTinder"
            : "Join DevTinder and connect with developers"}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">

        {!isLoginForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={emailId}
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="bg-error/10 text-error text-sm rounded-lg p-2 text-center">
            {error}
          </div>
        )}

        <button
          className="btn btn-primary w-full mt-2"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Create Account"}
        </button>
      </div>

      {/* Toggle */}
      <div className="text-center mt-6">
        <p
          className="text-sm text-base-content/70 cursor-pointer hover:text-primary transition-colors"
          onClick={() => {
            setError("");
            setIsLoginForm((value) => !value);
          }}
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  </div>
);


};

export default Login;
