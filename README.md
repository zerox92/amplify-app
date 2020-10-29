# AmplifyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Usage

Add your `aws-export.js` to `amplify-app/src` to hook your resource. Sample `aws-exports.js` provided below.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## APP UI
![APP UI](./Read_Me_Images/UI.png?raw=true "Title")

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Sample `aws-exports.js`

 ~~~
const awsmobile = {
    "aws_project_region": "",
    "aws_cognito_identity_pool_id": "",
    "aws_cognito_region": "",
    "aws_user_pools_id": "",
    "aws_user_pools_web_client_id": "",
    "oauth": {
      "domain": '',
      "scope": ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      "redirectSignIn": 'http://localhost:4200/',
      "redirectSignOut": 'http://localhost:4200/',
      "responseType": 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
};

export default awsmobile;
 ~~~
