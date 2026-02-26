import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

  if (!user) return null;   // ✅ safety check


  const { _id, firstName, lastName, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.log(err)
    }
  };

  // return (
  //   <div className="card bg-base-300 w-96 shadow-sm">
  //     <figure>
  //       <img className="w-48 h-48" src={user.photoUrl} alt="photo" />
  //     </figure>
  //     <div className="card-body">
  //       <h2 className="card-title">{firstName + " " + lastName}</h2>
  //       {/* {age && gender && <p>{age + " " + gender}</p>} */}
  //       {age !== undefined && gender && <p>{age} {gender}</p>}
  //       <p>{about}</p>
  //       <div className="card-actions justify-center my-4">
  //         <button
  //           className="btn btn-primary"
  //           onClick={()=>handleSendRequest("ignored", _id)}
  //         >
  //           Ignore
  //         </button>
  //         <button
  //           className="btn btn-secondary"
  //           onClick={()=>handleSendRequest("interested", _id)}
  //         >
  //           Interested
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

return (
  <div className="w-full max-w-sm mx-auto">
    <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">

      {/* Image Section */}
      <div className="relative w-full h-80 bg-base-200">
        <img
          src={user.photoUrl}
          alt="profile"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Name + Age on Image */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}
          </h2>
          {age !== undefined && gender && (
            <p className="text-sm opacity-90">
              {age} • {gender}
            </p>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="p-5">
        <p className="text-sm text-base-content/70 line-clamp-3 min-h-[60px]">
          {about || "No bio available."}
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6">
          <button
            className="btn btn-outline btn-error flex-1"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-primary flex-1"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default UserCard;
