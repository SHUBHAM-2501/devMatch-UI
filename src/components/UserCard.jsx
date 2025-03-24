import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { use, useEffect } from "react";

export default function UserCard(user) {
  const { _id, firstName, lastName, about, skills, age, gender } = user.user;
  
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" +_id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      console.log(_id);
      dispatch(removeUserFromFeed(_id));
      
    } catch (err) {
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user.user.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {age && gender && <p>{age + " " + gender}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondery bg-pink-600"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
