import React from "react";
import { Footer } from "../Components/footer";
import Navbarr from "../Components/navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/forgetPassword.css";
import { useState } from "react";


const ResetPassword = () => {
    let res1 ;
    const [email, setEmail] = useState("");
    const [token,setToken] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const ChangePassword = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
    console.log(form.checkValidity())
  
    if (form.checkValidity() === true) {
      setValidated(true);
    };
        let values = {
            "email": email,
            "token":token,
            "password": password
        };

        try {
            fetch("https://localhost:7061/api/User/AdvisorReset", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
                    "Access-Control-Max-Age": 86400,
                },
                body: JSON.stringify(values),
            })
                .then((res) => {
                    res1 = res
                    if (res.status == 200) {
                        window.location = '/loginadv';
                        return res.text();
                    }
                    else{

                    }
                    
                })
                .then((data) => {
                    if(res1.status == 200){
                        alert(data);
                        console.log(data);
                    }
                    
                });
        } catch (error) {
            console.log("Error-> ", error);
        }
    }
    return (
        <>
            <Navbarr />
            <div className="forgetPassword">
                <Form noValidate validated={validated} style={{ borderRadius: "20px", boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.2)" }}
                    className="forgetPasswordForm"
                    id="forgetPasswordForm">
                    <h3 className="forgetPasswordHeader">Reset Password</h3>
                    <center> <p>
                        <span>A Token has been sent to your email.</span>
                        <span>Enter your credentials.</span>
                    </p></center>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                  Please enter a valid Email
                </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required type="text" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required type="Password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                  Please provide a password
                </Form.Control.Feedback>
                    </Form.Group>
                    <center><Button style={{ fontFamily: "Arial", borderRadius: "14px", width: "50%", borderTop: "0px" }}
                        variant="primary"
                        type="submit"
                        onClick={ChangePassword}
                        id = "btnSave"
                    >
                        Change Password
                    </Button></center>
                </Form>
            </div>
            <Footer />
        </>
    );
}

export default ResetPassword
