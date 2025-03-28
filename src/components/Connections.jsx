import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    <h1 className="text-center font-serif my-2 text-4xl">Connections</h1>
    <div className="flex flex-col items-center gap-4 mt-4 px-4 w-full max-w-4xl mx-auto">
          {connections.map((connection) => (
                <div key={connection._id} className="bg-base-200 shadow-md rounded-lg w-full">
                     <div className="p-4 flex flex-col sm:flex-row items-center justify-between w-full gap-3">
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                               <img
                                     src={connection.photoUrl}
                                     className="w-16 h-16 rounded-full shadow-lg"
                                     alt="Connection" />
                               <div className="text-center sm:text-left">
                                    <h1 className="text-xl font-bold">{connection.firstName}</h1>
                                    <p className="text-sm text-gray-300 line-clamp-1">
                                         {connection.about || "No description available"}
                                    </p>
                                    {connection.age && connection.gender && <p className="text-sm text-gray-300">
                                         {connection.age + " " + connection.gender}
                                    </p>}
                               </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                              <Link to={`/chat/${connection._id}`} className="btn btn-primary btn-sm">Chat</Link>
                          </div>
                     </div>
                </div>
          ))}
     </div></>
);
}
