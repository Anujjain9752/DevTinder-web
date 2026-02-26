// import { useState } from "react";
// import UserCard from "./UserCard";
// import axios from "axios";
// import { BASE_URL } from "../utils/contants";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user.firstName);

//   const [lastName, setLastName] = useState(user.lastName);
//   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//   const [age, setAge] = useState(user.age || "");
//   const [gender, setGender] = useState(user.gender);
//   const [about, setAbout] = useState(user.about);
//   const [error, setError] = useState("");
//   const [showToast, setShowToast] = useState(false);

//   const dispatch = useDispatch();

//   const saveProfile = async () => {
//     setError("");
//     try {
//       const res = await axios.patch(
//         BASE_URL + "/profile/edit",
//         {
//           firstName,
//           lastName,
//           photoUrl,
//           age,
//           gender,
//           about,
//         },
//         {
//           withCredentials: true,
//         },
//       );

//       dispatch(addUser(res.data.data));

//       setShowToast(true);

//       setTimeout(() => {
//         setShowToast(false);
//       }, 3000);

//     } catch (err) {
//       setError(err.response.data);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center my-10">
//         <div className="flex justify-center mx-10">
//           <div className="card bg-base-300 w-96 shadow-sm">
//             <div className="card-body">
//               <h2 className="card-title justify-center">Edit Profile</h2>
//               <div>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">FirstName</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={firstName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">LastName</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={lastName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">photoUrl</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={photoUrl}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setPhotoUrl(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">Age</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={age}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setAge(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">Gender</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={gender}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">About</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={about}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setAbout(e.target.value)}
//                   />
//                 </label>
//               </div>
//               {error && <p className="text-red-500">{error}</p>}
//               <div className="card-actions justify-center m-2">
//                 <button className="btn btn-primary" onClick={saveProfile}>
//                   Save Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <UserCard
//           user={{ firstName, lastName, photoUrl, age, gender, about }}
//         />
//       </div>
//       {showToast && (
//         <div className="toast toast-top toast-center">
//           <div className="alert alert-success">
//             <span>Profile Saved Successfully</span>
//           </div>
//         </div>
//       )}
//     </>
//   );






// };

// export default EditProfile;

import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left Side - Form */}
          <div className="bg-base-100 shadow-xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Profile Photo URL"
                value={photoUrl}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                  onChange={(e) => setAge(e.target.value)}
                />

                {/* BACKEND SAFE ENUM VALUES */}
                <select
                  value={gender}
                  className="select select-bordered w-full focus:ring-2 focus:ring-primary"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <textarea
                placeholder="Tell something about yourself..."
                value={about}
                rows="4"
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary"
                onChange={(e) => setAbout(e.target.value)}
              />

              {error && (
                <div className="bg-error/10 text-error text-sm rounded-lg p-2">
                  {error}
                </div>
              )}

              <button
                className="btn btn-primary w-full mt-2"
                onClick={saveProfile}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="flex justify-center items-start">
            <div className="w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">
                Live Preview
              </h3>
              <UserCard
                user={{ firstName, lastName, photoUrl, age, gender, about }}
              />
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success shadow-lg">
            <span>Profile updated successfully 🎉</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;