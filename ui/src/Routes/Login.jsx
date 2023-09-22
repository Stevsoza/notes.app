import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import getUser from "../utils/getUser";
import styles from "./login.module.scss";
const host = import.meta.env.VITE_HOST;

function Login() {
  const [value, setValue] = useState({ user: "", password: "" });
  const [msj, setMsj] = useState("");
  const [isMsj, setIsMsj] = useState(false);
  const navigate = useNavigate();

  const nameFunction = async () => {
    try {
      const user = await getUser();
      // let { username } = user;
      if (user && user.username) {
        setName(user.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    nameFunction();
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
      // body: JSON.stringify({})
    };
    fetch(`${host}/api/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn === true) {
          navigate("/react-app/home");
        } else {
          navigate("/react-app/login");
        }
      });
  }, []);

  const handleChange = (e) => {
    setValue((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateUser = () => {
    if (value.user == "") {
      setMsj("No valid user");
      setIsMsj(true);
    } else if (value.password == "") {
      setMsj("No valid password");
      setIsMsj(true);
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: value.user, password: value.password }),
    };

  if (value.user != "" && value.password != "") {
      fetch(`${host}/api/login`, requestOptions)
        .then((response) => response.json())
        .then(
          (data) =>
            data.message ? navigate("/react-app/home") : setIsMsj(true),
          setMsj("No valid member")
        );
    }
  };

  const showOff = () => {
    setIsMsj(false);
  };

  return (
    <div className={styles.main}>
      {isMsj && <Alert showOff={showOff} msg={msj} />}
      <div id="form" className={styles.form}>
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem",
            margin: "2rem 2rem",
            fontWeight: "bold",
          }}
        >
          Log in
        </div>
        <div id="form-user" className={styles["form-group"]}>
          <label htmlFor="user">User</label>
          <input
            id="user"
            name="user"
            type="text"
            placeholder="user..."
            value={value.user}
            onChange={handleChange}
            autoComplete="false"
          />
        </div>
        <div id="form-password" className={styles["form-group"]}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password..."
            value={value.password}
            onChange={handleChange}
            autoComplete="false"
          />
        </div>
        <div id="form-button" className={styles["form-group"]}>
          <button onClick={validateUser}>Log in</button>
        </div>
        <div id="form-link" className={styles["form-group"]}>
          <center>Don't have an account?</center>
          <Link to="/react-app/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
