import React, { useEffect } from 'react';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import notfound from "../../MyRecipes/Card/local-file-not-found.png";

const ProfileView = () => {
    let navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/profile/view`, {
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

    return (
        <div class="container-800 ms-auto me-auto">
                <h1>View My Profile</h1>
                <form class="card bg-light-brown mt-5 mb-5 p-3">
                    <div class="avatar d-flex justify-content-center mt-5">
                        <img id="profilePic" src="" alt="Avatar"/>
                    </div>
                    
                    <div class="pfp-label mt-3 mb-4 text-center">
                        <label for="pfp" class="form-label-custom"><b>Profile Picture</b></label>
                    </div>

                    <div class="input mx-auto mb-2">
                        <label for="username" class="d-flex form-label-custom justify-content-center"><b>Username</b></label>
                        <div class="d-flex justify-content-center">
                            <input type="text" class="form-control w-100" name="username" id="username" readOnly/>
                        </div>
                    </div>

                    <div class="user-edit mb-3 mt-4">
                        <div class="input">
                            <label for="firstName" class="form-label-custom"><b>First Name</b></label>
                            <input type="text" class="form-control" name="firstName" id="firstName" readOnly/>
                        </div>
                        
                        <div class="input">
                            <label for="lastName" class="form-label-custom"><b>Last Name</b></label>
                            <input type="text" class="form-control" name="lastName" id="lastName" readOnly/>
                        </div>
                        
                        <div class="input mt-3">
                            <label for="email" class="form-label-custom"><b>Email</b></label>
                            <input type="email" class="form-control" name="email" id="email" readOnly/>
                        </div>

                        <div class="input mt-3">
                            <label for="phone" class="form-label-custom"><b>Phone Number</b></label>
                            <input type="tel" class="form-control" name="phone" id="phone" readOnly
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                        </div>
                    </div>
                    <div class="cancel-save d-flex justify-content-center mt-5 mb-5">
                        <button class="btn btn-blue" onClick={() => navigate('/profile/edit')}>Edit Profile</button>
                    </div>
                </form>    
            </div>
    )
}

export default ProfileView;