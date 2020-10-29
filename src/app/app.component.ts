import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Amplify } from "aws-amplify";
import Auth, { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-app';

  constructor(private fb: FormBuilder) { }


  public createForm: FormGroup;

	async ngOnInit() {
    this.createForm = this.fb.group({

    });
  }

  public launchHostedUI() {
    // try {
    //   Auth.federatedSignIn({'provider': 'Cognito'}).then(
    //     cred => {
    //       this.authState = AuthState.SignedIn;
    //       console.log(cred);
    //     }
    //   ).catch(
    //     e => {
    //       console.log("THis is calleddd");
    //       console.log(e);
    //     }
    //   );
    // } catch (error) {
    //   console.log("Error Calling signInWithGoogle");
    //   console.log(error);
    // }


    Auth.federatedSignIn();
  }

  public globalSignOut() {
    Auth.signOut({ global: true })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  public currentSession() {
    Auth.currentSession()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  async public signIn() {
    try {
     // Test Data
     var username = "anjuz"
     var password = "Windows@123"
         const user = await Auth.signIn(username, password).toPromise();
         if (user.challengeName === 'SMS_MFA' ||
             user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            console.log("logged in")
         } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
             // const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
             // You need to get the new password and required attributes from the UI inputs
             // and then trigger the following function with a button click
             // For example, the email and phone_number are required attributes
             // const {username, email, phone_number} = getInfoFromUserInput();
             // const loggedUser = await Auth.completeNewPassword(
             //    user,              // the Cognito User Object
             //    newPassword,       // the new password
                 // OPTIONAL, the required attributes
             //    {
             //        email,
             //        phone_number,
             //    }
             //);
         } else if (user.challengeName === 'MFA_SETUP') {
             // This happens when the MFA method is TOTP
             // The user needs to setup the TOTP before using it
             // More info please check the Enabling MFA part
             Auth.setupTOTP(user);
         } else {
             // The user directly signs in
             console.log(user);
         }
     } catch (err) {
         if (err.code === 'UserNotConfirmedException') {
             // The error happens if the user didn't finish the confirmation step when signing up
             // In this case you need to resend the code and confirm the user
             // About how to resend the code and confirm the user, please check the signUp part
         } else if (err.code === 'PasswordResetRequiredException') {
             // The error happens when the password is reset in the Cognito console
             // In this case you need to call forgotPassword to reset the password
             // Please check the Forgot Password part.
         } else if (err.code === 'NotAuthorizedException') {
             // The error happens when the incorrect password is provided
         } else if (err.code === 'UserNotFoundException') {
             // The error happens when the supplied username/email does not exist in the Cognito user pool
         } else {
             console.log(err);
         }
     }
  }

  public currentAuthenticatedUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
    .catch(err => console.log(err));
  }

  public currentUserCredentials() {
    Auth.currentUserCredentials()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  public CurrentCredentials() {
    Auth.currentCredentials()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  public googleLogin() {
    Auth.federatedSignIn({provider: 'Google'}).then(() =>
      Auth.currentSession()
    )
  }

  public facebookLogin() {
    Auth.federatedSignIn({provider: 'Facebook'}).then(() =>
      Auth.currentSession()
    )
  }

  public appleLogin() {
    Auth.federatedSignIn({provider: 'SignInWithApple'}).then(() =>
      Auth.currentSession()
    )
  }

  public amazonLogin() {
    Auth.federatedSignIn({provider: 'LoginWithAmazon'}).then(() =>
      Auth.currentSession()
    )
  }
}
