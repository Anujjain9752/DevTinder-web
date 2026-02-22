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

  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold text-2xl ">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div key={_id} className="m-4 p-4 rounded-lg bg-base-200">
            <img alt="photo" className="w-20 h-20" src={photoUrl} />
            <h2>{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + " , " + gender}</p>}
            <p>{about}</p>

            <div>
              <button
                className="btn btn-primary"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
