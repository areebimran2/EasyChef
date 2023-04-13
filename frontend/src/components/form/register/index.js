import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate, useOutletContext } from "react-router-dom";

const RegisterForm = () => {
    let navigate = useNavigate();

    const [usererror, setUserError] = useState([]);
    const [avatarerror, setAvatarError] = useState([]);
    const [emailerror, setEmailError] = useState([]);
    const [phoneerror, setPhoneError] = useState([]);
    const [pass1error, setPass1Error] = useState([]);
    const [pass2error, setPass2Error] = useState([]);

    const handleRegister = (event) => {
        event.preventDefault();
        var data = new FormData();
        data.append("username", $("#username").val());
        data.append("first_name", $("#firstName").val());
        data.append("last_name", $("#lastName").val());
        data.append("email", $("#email").val());
        if ($("#pfp").prop("files")["0"] !== undefined) {
            data.append("avatar", $("#pfp").prop("files")["0"]);
        }
        data.append("phone_number", $("#phone").val());
        data.append("password", $("#pw1").val());
        data.append("password2", $("#pw2").val());
        fetch("http://localhost:8000/accounts/register/", {
            method: "POST",
            body: data,
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate('/login');
                }
                return response.json();
            })
            .then((data) => {
                console.log("data: ", data);
                if (Array.isArray(data.username)) {
                    setUserError(data.username);
                }
                if (Array.isArray(data.avatar)) {
                    setAvatarError(data.avatar);
                }
                if (Array.isArray(data.email)) {
                    setEmailError(data.email);
                }
                if (Array.isArray(data.phone_number)) {
                    setPhoneError(data.phone_number);
                }
                if (Array.isArray(data.password)) {
                    setPass1Error(data.password);
                }
                if (Array.isArray(data.password2)) {
                    setPass2Error(data.password2);
                }
            });
        // re direct to profile page and fetch profile data
    };

    return (
        <form className="card bg-light-brown px-5 py-4 d-inline-block">
            <h2 className="text-center mb-4 mt-4">Register</h2>
            <div className="d-flex justify-content-center mb-3">
                <label className="form-label mb-2 mt-auto me-2">Username:</label>
                <input
                    className="form-control"
                    style={{ marginLeft: "3px" }}
                    type="text"
                    id="username"
                    onChange={() => setUserError([])}
                />
            </div>
            {usererror.map((item) => (
                <div class="d-flex justify-content-center mb-4" style={{ marginLeft: "90px" }} id="login-error">{item}</div>
            ))}
            <div className="d-flex justify-content-center mb-3">
                <label className="form-label mb-2 mt-auto me-2">Password:</label>
                <input
                    className="form-control"
                    style={{ marginLeft: "6px" }}
                    type="password"
                    id="pw1"
                    onChange={() => setPass1Error([])}
                />
            </div>
            {pass1error.map((item) => (
                <div class="d-flex justify-content-center mb-4" style={{ marginLeft: "90px" }} id="login-error">{item}</div>
            ))}
            <div className="d-flex justify-content-center mb-3" style={{ marginRight: "70px" }}>
                <label className="form-label mb-2 mt-auto me-2">Confirm password:</label>
                <input
                    className="form-control"
                    style={{ marginLeft: "6px" }}
                    type="password"
                    id="pw2"
                    onChange={() => setPass2Error([])}
                />
            </div>
            {pass2error.map((item) => (
                <div class="d-flex justify-content-center mb-4" style={{ marginLeft: "90px" }} id="login-error">{item}</div>
            ))}
            <div class="d-flex justify-content-center mb-3">
                <label class="form-label mb-auto mt-auto me-2">First name:</label>
                <input type="text" class="form-control" name="firstName" id="firstName" />
            </div>
            <div class="d-flex justify-content-center mb-3">
                <label class="form-label mb-auto mt-auto me-2">Last name:</label>
                <input type="text" class="form-control" name="lastName" id="lastName" />
            </div>
            <div class="d-flex justify-content-center mb-3">
                <label class="form-label mb-auto mt-auto me-2">Email:</label>
                <input type="email" class="form-control" style={{ marginLeft: "41px" }} name="email" id="email" onChange={() => setEmailError([])} />
            </div>
            {emailerror.map((item) => (
                <div class="d-flex justify-content-center mb-4" style={{ marginLeft: "90px" }} id="login-error">{item}</div>
            ))}
            <div class="d-flex justify-content-center mb-3" style={{ marginLeft: "140px" }}>
                <label class="form-label mb-auto mt-auto me-2">Avatar:</label>
                <input type="file" class="form-control" style={{ marginLeft: "35px" }} name="pfp" id="pfp" onChange={() => setAvatarError([])}/>
            </div>
            {avatarerror.map((item) => (
                <div class="d-flex justify-content-center mb-4" style={{ marginLeft: "90px" }} id="login-error">{item}</div>
            ))}
            <div class="d-flex justify-content-center mb-3" style={{ marginLeft: "1px" }}>
                <label class="form-label mb-auto mt-auto me-2">Phone:</label>
                <input type="phone" class="form-control" style={{ marginLeft: "35px" }} name="phone" id="phone" onChange={() => setPhoneError([])}/>
            </div>
            {phoneerror.map((item) => (
                <div class="d-flex justify-content-center mb-4" style={{ marginLeft: "90px" }} id="login-error">{item}</div>
            ))}


            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-brown" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
