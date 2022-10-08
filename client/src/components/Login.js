import { useState } from "react";
import { useNavigate } from "react-router";
import apiCall from "../apiCall";
import { loginUser } from "../redux/api_calls";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

function Login() {
  function closeForm() {
    let loginForm = document.querySelector(".login-form-container");
    loginForm.classList.remove("active");
  }

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const n = useDispatch();
  const dispatch = useDispatch();
  function login(e) {
    //dispatch(loginSuccess(null));
    e.preventDefault();

    apiCall.post("/v1/login", { Email, Password }).then(({ data }) => {
      if (!data?.success) {
        alert(data.message);
      } else {
        dispatch(loginSuccess(data.payload));
        console.log(data.payload.user);
        n(`/${data.payload.role.Name}`);
      }
    });
  }
  return (
    <div className="login-form-container">
      <i onClick={closeForm} className="fas fa-times" id="form-close"></i>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <form style={{ width: "100% " }}>
            <h3>login</h3>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              className="box"
              placeholder="enter your Email"
            />
            <input
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="box"
              placeholder="enter your password"
            />
            <br />
            <input
              onClick={login}
              type="submit"
              value="login now"
              className="bttn"
            />
            <br />

            <br />

            <p>
              forget password? <a href="#">click here</a>
            </p>
            <p>
              don't have and account? <a href="#">register now</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
