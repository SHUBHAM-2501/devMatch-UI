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
      <h1 className="text-center font-serif my-2 text-2xl md:text-4xl">Requests</h1>
      <div className="flex flex-col items-center gap-4 mt-4 px-4 max-w-4xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="bg-base-200 shadow-md rounded-lg flex flex-col sm:flex-row w-full"
            >
              <div className="p-4 flex flex-col sm:flex-row items-center w-full gap-3">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <img
                    src={photoUrl}
                    className="w-16 h-16 rounded-full shadow-lg"
                    alt="Request"
                  />
                  <div className="text-center sm:text-left mt-2 sm:mt-0">
                    <h1 className="text-xl font-bold">{firstName} {lastName}</h1>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {about || "No description available"}
                    </p>
                    {age && gender && (
                      <p className="text-sm text-gray-300">{age + " • " + gender}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-auto justify-center sm:justify-end">
                  <button
                    className="btn btn-primary btn-sm sm:btn-md"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary btn-sm sm:btn-md"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
