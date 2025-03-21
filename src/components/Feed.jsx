import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

export default function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      
    } catch (err) {
    }
  };

  useEffect(() => {
    getFeed();
  });

  return (
    <>
      {feed && (
        <div className="flex justify-center mt-10 ">
          <UserCard user={feed.data[0]} />
        </div>
      )}
    </>
  );
}
