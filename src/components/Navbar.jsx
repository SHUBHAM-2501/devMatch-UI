import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

export default function Navbar(){

  const user = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login");
    }catch(err){
      console.error(err.message);
    }

  }


    return<>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">devMatch 🧑🏼‍💻</Link>
  </div>
  <div className="flex gap-2 mx-7">
    {user&&(<div className="dropdown dropdown-end flex">
      <p className="mx-4 my-2.5">
        Welcome, {user.firstName}</p>

      <div tabIndex={0} role="button" 
      className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to = "/Profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>)}
  </div>
</div>
    </>
}