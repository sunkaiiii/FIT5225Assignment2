import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import home from './home.jpg';
import history from './history';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import './App.css';

function App() {
  const federated = {
    googleClientId: "809481499442-vimc5m64loseslleop38cl0202l3o6kb.apps.googleusercontent.com",
    oauthConfig: {
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      scope:[
        "email",
        "openid",
        "profile"
    ],
    responseType: "code" ,
    }
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
        alt=""
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
Amplify.configure(awsmobile);
export default App;
