import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import notfound from "../../MyRecipes/Card/local-file-not-found.png";

const ProfileEdit = () => {
    let navigate = useNavigate()

    const token = localStorage.getItem('token')

    const [avatarerror, setAvatarError] = useState([])
    const [emailerror, setEmailError] = useState([])
    const [phoneerror, setPhoneError] = useState([])
    const [pass1error, setPass1Error] = useState([])
    const [pass2error, setPass2Error] = useState([])
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/view`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login')
                    }
                } else {
                    return response.json()
                }
            })
            .then(json => {
                $('#username').val(json.username)
                $('#firstName').val(json.first_name)
                $('#lastName').val(json.last_name)
                $('#email').val(json.email)
                $('#phone').val(json.phone_number)
                $("#profilePic").attr("src", json.avatar !== null ? json.avatar : notfound)
            })
    }, [])

    const handleEdit = (event) => {
        event.preventDefault()
        var data = new FormData()
        data.append('first_name', $('#firstName').val())
        data.append('last_name', $('#lastName').val())
        data.append('email', $('#email').val())
        if ($('#pfp').prop('files')['0'] !== undefined) {
            data.append('avatar', $('#pfp').prop('files')['0'])
        }
        data.append('phone_number', $('#phone').val())
        data.append('password', $('#pw1').val())
        data.append('password2', $('#pw2').val())
        fetch('http://localhost:8000/accounts/profile/edit/',
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: data
            })
            .then(response => {
                if (response.status === 401) { // unauthorize
                    navigate('/login')
                }
                return response.json()
            })
            .then(data => {
                console.log('data: ', data)
                console.log(phoneerror)
                if (Array.isArray(data.avatar)) {
                    setAvatarError(data.avatar)
                }
                if (Array.isArray(data.email)) {
                    setEmailError(data.email)
                }
                if (Array.isArray(data.phone_number)) {
                    setPhoneError(data.phone_number)
                }
                if (Array.isArray(data.password)) {
                    setPass1Error(data.password)
                }
                if (Array.isArray(data.password2)) {
                    setPass2Error(data.password2)
                }
            })
        // re direct to profile page and fetch profile data
    }

    return (
        <div class="container-800 ms-auto me-auto">
            <h1>Edit My Profile</h1>
            <form class="card bg-light-brown mt-5 mb-5 p-3">
                <div class="avatar d-flex justify-content-center mt-5">
                    <img id="profilePic" src="" alt="Avatar" />
                </div>

                <div class="pfp-label mt-5 mb-2 text-center">
                    <label for="pfp" class="form-label-custom"><b>Edit Profile Picture</b></label>
                </div>
                <div class="avatar-change d-flex justify-content-center mb-1">
                    <input type="file" class="form-control" id="pfp" accept="image/png, image/jpeg" onChange={() => setAvatarError([])}/>
                </div>
                {avatarerror.map((item) => (
                    <div id="login-error" className="text-center">{item}</div>
                ))}

                <div class="input mx-auto mb-2">
                    <label for="username" class="d-flex form-label-custom justify-content-center mt-3"><b>Username</b></label>
                    <div class="d-flex justify-content-center">
                        <input type="text" class="form-control w-100" name="username" id="username" readOnly />
                    </div>
                </div>

                <div class="user-edit mb-3 mt-3">
                    <div class="input">
                        <label for="firstName" class="form-label-custom"><b>First Name</b></label>
                        <input type="text" class="form-control" name="firstName" id="firstName" />
                    </div>

                    <div class="input">
                        <label for="lastName" class="form-label-custom"><b>Last Name</b></label>
                        <input type="text" class="form-control" name="lastName" id="lastName" />
                    </div>

                    <div class="input mt-3">
                        <label for="email" class="form-label-custom"><b>Email</b></label>
                        <input type="email" class="form-control mb-1" name="email" id="email" onChange={() => setEmailError([])}/>
                        {emailerror.map((item) => (
                            <div id="login-error">{item}</div>
                        ))}
                    </div>

                    <div class="input mt-3">
                        <label for="phone" class="form-label-custom"><b>Phone Number</b></label>
                        <input type="tel" class="form-control" name="phone" id="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={() => setPhoneError([])}/>
                        {phoneerror.map((item) => (
                            <div id="login-error">{item}</div>
                        ))}
                    </div>

                    <div class="input mt-3">
                        <label for="pw1" class="form-label-custom"><b>Password</b></label>
                        <input type="password" class="form-control" name="pw1" id="pw1" onChange={() => setPass1Error([])}/>
                        {pass1error.map((item) => (
                            <div id="login-error">{item}</div>
                        ))}
                    </div>

                    <div class="input mt-3">
                        <label for="pw2" class="form-label-custom"><b>Confirm Password</b></label>
                        <input type="password" class="form-control" name="pw2" id="pw2" onChange={() => setPass2Error([])}/>
                        {pass2error.map((item) => (
                            <div id="login-error">{item}</div>
                        ))}
                    </div>
                </div>

                <div class="cancel-save d-flex justify-content-around mt-3 mb-5">
                    <button class="btn btn-blue" onClick={() => navigate('/profile')}>Cancel</button>
                    <button class="btn btn-blue" onClick={handleEdit}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit;