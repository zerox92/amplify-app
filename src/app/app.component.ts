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
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  public launchHostedUI() {
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

  public signIn(signInForm: FormGroup) {
    try {
     console.log("Signing in with::" + signInForm.username)
       Auth.signIn(signInForm.username, signInForm.password)
       .then(user => console.log(user))
       .catch(err => console.log(err))
     } catch (err) {
         console.log(err);
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
    // Auth.federatedSignIn({provider: 'Google'}).then(() =>
    //   Auth.currentSession()
    // )
  }

  public facebookLogin() {
    // Auth.federatedSignIn({provider: 'Facebook'}).then(() =>
    //   Auth.currentSession()
    // )
  }

  public appleLogin() {
    // Auth.federatedSignIn({provider: 'SignInWithApple'}).then(() =>
    //   Auth.currentSession()
    // )
  }

  public amazonLogin() {
    // Auth.federatedSignIn({provider: 'LoginWithAmazon'}).then(() =>
    //   Auth.currentSession()
    // )
  }
}
