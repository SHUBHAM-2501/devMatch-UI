import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest} from "../utils/requestSlice";

export default function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10">NO REQUEST FOUND</h1>;

  return (
    <>
      <h1 className="text-center font-serif my-2 text-4xl">Requests</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="hero bg-base-200 w-150 h-40 shadow-md rounded-lg flex items-center p-4"
            >
              <img
                src={photoUrl}
                className="w-16 h-16 rounded-full shadow-lg"
                alt="Request"
              />
              <div className="ml-10">
                <h1 className="text-xl font-bold">{firstName}</h1>
                <p className="text-m text-gray-300">
                  {about || "No description available"}
                </p>
                {age && gender && (
                  <p className="text-m text-gray-300">{age + " " + gender}</p>
                )}
              </div>
              <div className="ml-auto">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
