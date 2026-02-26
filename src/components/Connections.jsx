import { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return <h1 className="text-center my-10">No Connections Found</h1>;
  }

  // return (
  //   <div className="text-center justify-center my-10">
  //     <h1 className="text-bold text-2xl">Connections</h1>

  //     {connections.map((connection) => {
  //       const { _id, firstName, lastName, photoUrl, age, gender, about } =
  //         connection;

  //       return (
  //         <div key={_id} className="m-4 p-4 rounded-lg bg-base-200">
  //           <img
  //             alt="photo"
  //             className="w-20 h-20 object-cover"
  //             src={photoUrl}
  //           />
  //           <h2>
  //             {firstName} {lastName}
  //           </h2>
  //           {age !== undefined && gender && (
  //             <p>
  //               {age}, {gender}
  //             </p>
  //           )}
  //           <p>{about}</p>
  //           <Link to={"/chat/" + _id} className="btn btn-primary">
  //             Chat
  //           </Link>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
return (
  <div className="min-h-screen bg-base-200 py-10 px-4">
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-10">
        Your Connections
      </h1>

      {connections.length === 0 ? (
        <div className="text-center text-base-content/60 text-lg">
          No connections found.
        </div>
      ) : (
        <div className="grid gap-6">
          {connections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = connection;

            return (
              <div
                key={_id}
                className="bg-base-100 shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden bg-base-300 shrink-0">
                  <img
                    src={photoUrl}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h2>

                  {age !== undefined && gender && (
                    <p className="text-sm text-base-content/60">
                      {age} • {gender}
                    </p>
                  )}

                  <p className="text-sm mt-2 text-base-content/70 line-clamp-2">
                    {about}
                  </p>
                </div>

                {/* Chat Button */}
                <div>
                  <Link
                    to={"/chat/" + _id}
                    className="btn btn-primary px-6"
                  >
                    Chat
                  </Link>
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

export default Connections;
