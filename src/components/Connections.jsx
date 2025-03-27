import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Connections() {
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
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if(!connections) return;

  if(connections.length === 0) return <h1 className="flex justify-center my-10">NO CONNECTIONS FOUND</h1>

return (
    <>
    <h1 className="text-center font-serif my-2  text-4xl">Connections</h1>
    <div className="flex flex-col items-center gap-4 mt-4">
          {connections.map((connection) => (
                <div key={connection._id} className="hero bg-base-200 w-150 h-40 shadow-md rounded-lg flex items-center">
                     <div className="hero-content flex-col lg:flex-row items-center w-full">
                          <img
                                src={connection.photoUrl}
                                className="w-16 h-16 rounded-full shadow-lg"
                                alt="Connection" />
                          <div className="ml-10 text-center flex-grow">
                                <h1 className="text-xl font-bold">{connection.firstName}</h1>
                                <p className="text-m text-gray-300">
                                     {connection.about || "No description available"}
                                </p>
                                {connection.age && connection.gender && <p className="text-m text-gray-300">
                                     {connection.age + " " + connection.gender}
                                </p>}
                          </div>
                          <div className="ml-auto">
                                <button className="btn btn-primary">Chat</button>
                          </div>
                     </div>
                </div>
          ))}
     </div></>
);
}
