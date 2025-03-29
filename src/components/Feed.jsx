import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFeed } from "../utils/feedSlice";

export default function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) return <div className="flex justify-center my-10">Loading...</div>;
  

  if (!feed) return <div className="flex justify-center my-10">Loading...</div>;

  const isEmpty = 
    (Array.isArray(feed) && feed.length === 0) || 
    (feed.data && Array.isArray(feed.data) && feed.data.length === 0);

  if (isEmpty) {
    return <h1 className="flex justify-center my-10">NO FEED FOUND</h1>;
  }

  return (
    <div className="flex justify-center mt-10">
      {Array.isArray(feed) ? (
        feed.length > 0 ? <UserCard user={feed[0]} /> : null
      ) : (
        feed.data && feed.data.length > 0 && <UserCard user={feed.data[0]} />
      )}
    </div>
  );
}
