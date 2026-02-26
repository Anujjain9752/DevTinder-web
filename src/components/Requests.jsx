import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import axios from "axios";

const Requests = () => {
  const requests = useSelector((store) => store.requests);

  const dispatch = useDispatch();


  const reviewRequests = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(_id))
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }
  if (requests.length === 0) return <h1>No Requests Found</h1>;

  // return (
  //   <div className="text-center justify-center my-10">
  //     <h1 className="text-bold text-2xl ">Connection Requests</h1>
  //     {requests.map((request) => {
  //       const { _id, firstName, lastName, photoUrl, age, gender, about } =
  //         request.fromUserId;
  //       return (
  //         <div key={_id} className="m-4 p-4 rounded-lg bg-base-200">
  //           <img alt="photo" className="w-20 h-20" src={photoUrl} />
  //           <h2>{firstName + " " + lastName}</h2>
  //           {age && gender && <p>{age + " , " + gender}</p>}
  //           <p>{about}</p>

  //           <div>
  //             <button
  //               className="btn btn-primary"
  //               onClick={() => reviewRequests("rejected", request._id)}
  //             >
  //               Reject
  //             </button>
  //             <button
  //               className="btn btn-secondary"
  //               onClick={() => reviewRequests("accepted", request._id)}
  //             >
  //               Accept
  //             </button>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

return (
  <div className="min-h-screen bg-base-200 py-10 px-4">
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Connection Requests
      </h1>

      {requests.length === 0 ? (
        <div className="text-center text-base-content/60 text-lg">
          No requests found.
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-base-100 shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 transition hover:shadow-xl"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden bg-base-300 shrink-0">
                  <img
                    alt="profile"
                    src={photoUrl}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <p className="text-sm text-base-content/60">
                      {age} • {gender}
                    </p>
                  )}

                  <p className="text-sm mt-2 text-base-content/70 line-clamp-2">
                    {about}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() =>
                      reviewRequests("rejected", request._id)
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      reviewRequests("accepted", request._id)
                    }
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

};

export default Requests;
