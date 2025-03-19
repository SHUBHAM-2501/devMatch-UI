import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login(){

    const [emailId, setEmailId] = useState("dhoni@gmail.com");
    const [password, setPassword] = useState("Dhoni@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try{
            const res = await axios.post(BASE_URL+"/login", {
                emailId,
                password,
            },
        {withCredentials:true});
        dispatch(addUser(res.data));
        return navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    return<>
    <div className="flex justify-center my-10"> 
        <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title flex justify-center">Login</h2>
    <div>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Enter your email</legend>
  <input type="text"
  value={emailId}
  className="input"
  onChange={(event)=>setEmailId(event.target.value)}
  />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Enter your password</legend>
  <input type="text" 
  value={password}
  className="input"  onChange={(event)=>setPassword(event.target.value)}
   />
</fieldset>
    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div></div>

    </>
}