import React from "react";
import {GoogleLogin,GoogleLogout} from "react-google-login";


const responseGoogle = (response) => {
  console.log('Logged In',response.profileObj);
}
const responsefGoogle = (response) => {
  console.log('Failure',response);
}
const Messages = () => {
  return( <GoogleLogin
      clientId="959350101705-iulfiifgd5jt2n09cuuu9vj3a9lnqb0v.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responsefGoogle}
      cookiePolicy={'single_host_origin'}
  /> );
};
export default Messages;