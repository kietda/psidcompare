import React, { useEffect } from "react";
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

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Vir Auth Token");
    if (!authToken) {
      navigate("/login");
    }
  }, []);
  const handleAction = () => {
    // console.log("button is clicked");
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        navigate("/");
        // console.log(response);
        sessionStorage.setItem(
          "Vir Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
      });
  };
  return (
    <section className="form-login">
      <div className="section-title">
        <h3>Register Form</h3>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
        <TextField
          id="email"
          label="Enter the Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="Enter the Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <div className="form-distance">
        <Button title="Register" handleAction={handleAction} />
      </div>
      <ToastContainer />
    </section>
  );
}
