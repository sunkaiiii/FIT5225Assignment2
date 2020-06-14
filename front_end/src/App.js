import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut,  AmplifySignUp } from '@aws-amplify/ui-react';
import home from './home.jpg';
import history from './history';



import './App.css';

function App() {
  const federated = {
    googleClientId: "809481499442-vimc5m64loseslleop38cl0202l3o6kb.apps.googleusercontent.com",
    
   /*  oauthConfig: {
      "aws_cognito_region": "us-east-1",
      "aws_user_pools_id": "us-east-1_8q1Us58Wn",
      "aws_user_pools_web_client_id": "4rfukfbpbe8of0lara1o4it4h5",
      redirectSignIn: "http://localhost:3000/", //   if local test set it as:   redirectSignIn: "http://localhost:3000/",  online :https://master.d3nspps4hsc7d5.amplifyapp.com/
      redirectSignOut: "http://localhost:3000/",
      scope:[
        "email",
        "openid",
        "profile"
    ],
    responseType: "code" ,
    }   */
  }

  return (
    <AmplifyAuthenticator federated={federated}> 
    <AmplifySignUp 
       usernameAlias="email"
       formFields={[
        {
          type: 'given_name',
          label: 'Firstname',
          placeholder: 'your firstname',
          required: true,
          handleInputChange: (event, cb) => {
            console.log('custom username field');
            //perform any actions needed
            cb(event);
          },
        },
        {
          type: 'family_name',
          label: 'Family name',
          placeholder: 'your Family name ',
          required: true,
          handleInputChange: (event, cb) => {
            console.log('custom givenname field');
            //perform any actions needed
            cb(event);
          },
        },
      {
          type: 'password',
          label: 'Password',
          placeholder: 'enter your password',
          required: true,
          handleInputChange: (event, cb) => {
            console.log('custom pwd field');
            cb(event);
          },
        },
      {
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email',
          required: true,
          handleInputChange: (event, cb) => {
            console.log('custom pwd field');
            cb(event);
          }
        },
      ]}
      slot="sign-up"
    />
    
    <AmplifySignOut/>
  <div className="App" style={{width:'100%',height:'40%', margin: 'auto'}} >
    
    <img
        src={home}
        alt="kk"
        className="img-home"
        />   
  <h1>welcome to image detection system</h1>
  <form>
    <button  onClick={() => history.push('/StorageImage')}>Click button to upload image</button>
 </form>
  </div>
  </AmplifyAuthenticator>
  );
}

export default App;
