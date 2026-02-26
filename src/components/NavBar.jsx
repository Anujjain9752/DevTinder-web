import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };

  // return (
  //   <div className="navbar bg-base-300 shadow-sm">
  //     <div className="flex-1">
  //       <Link to="/" className="btn btn-ghost text-xl">
  //         🤖DevTinder
  //       </Link>
  //     </div>
  //     {user && (
  //       <div className="flex gap-2">
  //         <div className="form-control">Welcome, {user.firstName}</div>
  //         <div className="dropdown dropdown-end mx-5 flex">
  //           <div
  //             tabIndex={0}
  //             role="button"
  //             className="btn btn-ghost btn-circle avatar"
  //           >
  //             <div className="w-10 rounded-full">
  //               <img alt="user photo" src={user.photoUrl} />
  //             </div>
  //           </div>
  //           <ul
  //             tabIndex="-1"
  //             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  //           >
  //             <li>
  //               <Link to="/profile" className="justify-between">
  //                 Profile
  //                 <span className="badge">New</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/connections">Connections</Link>
  //             </li>
  //             <li>
  //               <Link to="/requests">Requests</Link>
  //             </li>
  //             <li>
  //               <a onClick={handleLogout}>Logout</a>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );


return (
  <div className="navbar bg-base-100 border-b border-base-300 px-4 md:px-8 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
    {/* Left Section */}
    <div className="flex-1">
      <Link
        to="/"
        className="text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-200"
      >
        <span className="text-primary">Dev</span>Tinder
      </Link>
    </div>

    {/* Right Section */}
    {user && (
      <div className="flex items-center gap-4">
        {/* Welcome Text (Hidden on small screens) */}
        <p className="hidden md:block text-sm font-medium text-base-content/70">
          Welcome, <span className="font-semibold">{user.firstName}</span>
        </p>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary hover:ring-offset-2 transition-all"
          >
            <div className="w-10 rounded-full">
              <img
                alt="user"
                src={user.photoUrl}
                className="object-cover"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-base-100 shadow-xl border border-base-200 p-2"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <div className="divider my-1"></div>
            <li>
              <button
                onClick={handleLogout}
                className="text-error hover:bg-error hover:text-white rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>
);

};

export default NavBar;
