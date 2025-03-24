import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogInForm, setIsLogInForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center">
              {isLogInForm ? "Login" : "SignUp"}
            </h2>
            <div>
              {!isLogInForm && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      value={firstName}
                      className="input"
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      value={lastName}
                      className="input"
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </fieldset>
                </>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter your email</legend>
                <input
                  type="text"
                  value={emailId}
                  className="input"
                  onChange={(event) => setEmailId(event.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter your password</legend>
                <input
                  type="password"
                  value={password}
                  className="input"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={isLogInForm ? handleLogin : handleSignUp}
              >
                {isLogInForm ? "Login" : "SignUp"}
              </button>
            </div>
          </div>
          <p
            className="m-auto cursor-pointer"
            onClick={() => setIsLogInForm(!isLogInForm)}
          >
            {isLogInForm
              ? "New user Sign Up to continue..."
              : "Existing user? Login Here"}{" "}
          </p>
        </div>
      </div>
    </>
  );
}
