import React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {GoogleLogin,GoogleLogout} from "react-google-login";
import * as service from "../../services/security-service";

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


const responsefGoogle = (response) => {
    console.log('Failure',response);
}



export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    const signup = (user1) =>
        service.register(user1)
            .then(() => navigate('/home'))
            .catch(e => alert(e));
    const responseGoogle = (response) => {
        const user = {
            username: response.profileObj.givenName,
            password: response.profileObj.googleId,
            email : response.profileObj.email,
            profilePhoto: response.profileObj.imageUrl
        }

        console.log('Logged In',user);
        const t= signup(user).then(response => response);
        console.log(t)
    }
    return (

        <div>

            <h1>Login</h1>


            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setLoginUser({...loginUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <button onClick={login}
                    className="btn btn-primary mb-5">Login
            </button>

             <GoogleLogin
                clientId="959350101705-iulfiifgd5jt2n09cuuu9vj3a9lnqb0v.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responsefGoogle}
                cookiePolicy={'single_host_origin'}
            />


        </div>

    );
};