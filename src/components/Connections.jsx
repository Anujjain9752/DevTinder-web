import { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // handle error case
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }
  if (connections.length === 0) return <h1>No connections Found</h1>;

  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold text-2xl ">Connections</h1>
      {connections.map((connection) => {
        
          const {firstName, lastName, photoUrl, age, gender , about} = connection;
        return(
        <div className="m-4 p-4 rounded-lg bg-base-200">
           
         <img alt="photo" className="w-20 h-20" src={connection.photoUrl} />
         <h2>{firstName+" "+lastName}</h2>
         {age && gender && <p>{age+ " , "+gender}</p>}
         <p>{about}</p>
          


        </div>)
})}
    </div>
  );
};

export default Connections;
