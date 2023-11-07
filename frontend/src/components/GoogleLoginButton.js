import React from 'react'
import {GoogleLogin} from "react-google-login"

const GoogleLoginButton = () => {
    const handleGoogleSignIn = async (response) => {
        const idToken = response.tokenId;
        console.log(idToken);
      };
  return (
    <div style={{position:'absolute'}}>
        <GoogleLogin
      clientId="805286160007-u9l2316h9qod36qhd4ue7hdp9phl9pdj.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={handleGoogleSignIn}
      onFailure={(error) => console.log(error)}
    />
    </div>
  )
}

export default GoogleLoginButton