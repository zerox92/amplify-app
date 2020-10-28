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
}
