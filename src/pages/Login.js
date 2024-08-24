import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../components/common/Button";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleAction = () => {
    // console.log("button is clicked");
    // const authentication = getAuth();
    // signInWithEmailAndPassword(authentication, email, password)
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/");
    //     sessionStorage.setItem(
    //       "Vir Auth Token",
    //       response._tokenResponse.refreshToken
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (
    //       error.code === "auth/invalid-email" ||
    //       error.code === "auth/user-not-found"
    //     ) {
    //       //this error gets from console.log
    //       toast.error("Please check the email");
    //     }
    //     if (error.code === "auth/wrong-password") {
    //       toast.error("Please check the password");
    //     }
    //   });
    if (email === password) {
      toast.info("Match!!");
    } else {
      toast.error("Not Match!!");
    }
  };
  const handleClear = () => {
    // console.log("button is clicked");
    // const authentication = getAuth();
    // if (email === password) {
    //   toast.info("Match!!");
    // } else {
    //   toast.error("Not Match!!");
    // }
    setEmail("");
    setPassword("");
    window.location.reload();
  };
  return (
    <section className="form-login">
      <div className="section-title">
        <h3>Matching App</h3>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        <TextField
          id="firstCode"
          label="Enter 1st code"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoFocus
        />
        <TextField
          id="secondCode"
          label="Enter 2nd code"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Box>
      <div className="form-distance">
        <Button title="Check" handleAction={handleAction} />
      </div>
      <div className="form-distance">
        <Button title="Clear" handleAction={handleClear} />
      </div>
      <ToastContainer />
    </section>
  );
}
