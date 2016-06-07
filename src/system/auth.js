/**
 * Created by eric0089 on 6/5/16.
 */

import {inject} from 'aurelia-framework';
import {Session} from './session';

@inject(Session)
export class Auth{

   // App specific
   identityPoolId = 'us-east-1:35b6094e-ff5b-44a5-ac52-e879ae263c91';
   userPoolId = 'us-east-1_fgCWraBkF';
   appClientId = '57lq262n28o7ddt8i36jcjj7qd';
   region = 'us-east-1';

   // constructed
   loginId = `cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
   poolData = {
      UserPoolId: this.userPoolId,
      ClientId: this.appClientId
   };

   constructor(session){
      this.session = session;
   }

   registerUser(user) {
      // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
      AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

      let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);

      let attributeList = [];

      let dataEmail = {
         Name: 'email',
         Value: user.email
      };
      
      let dataName = {
         Name: 'name',
         Value: user.name
      };

      attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
      attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName));

      userPool.signUp(user.username, user.password, attributeList, null, (err, result) => {
         if (err) {
            console.log(err);
            return;
         }
         this.session.registered = true;
      });
   }

   confirmUser(username, code){
      // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
      AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

      let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);

      let userData = {
         Username: username,
         Pool: userPool
      };

      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

      cognitoUser.confirmRegistration(code, true, (err, result) => {
         if (err) {
            console.log(err);
            return;
         }
         this.session.confirmed = true;
      });
   }

   loginUser(username, password){
      // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
      AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

      let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);

      let authenticationData = {
         Username: username,
         Password: password
      };

      let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

      let userData = {
         Username: username,
         Pool: userPool
      };

      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
         onSuccess: (result) => {
            this.session.user = cognitoUser;
            this.setCredentials(result.getIdToken().getJwtToken());
         },
         onFailure: (err) => {
            console.log(err);
         }
      });
   }

   getSession(){
      let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);

      let cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
         cognitoUser.getSession((err, session) => {
            if (err) {
               this.logoutUser();
               return;
            }
            this.session.user = cognitoUser;
            this.setCredentials(session.getIdToken().getJwtToken());
         });
      }
      else this.logoutUser();
   }
   
   logoutUser(){
      let userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);
      let cognitoUser = userPool.getCurrentUser();
      this.session.user = null;
      if(cognitoUser != null) cognitoUser.signOut();
   }

   /* Helper Functions */

   setCredentials(token){
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
         IdentityPoolId: this.identityPoolId,
         Logins:{}
      });
      AWS.config.credentials.params.Logins[this.loginId] = token;
   }

   getUserAttributes(cognitoUser){
      return new Promise((resolve, reject) => {
         cognitoUser.getUserAttributes((err, result) => {
            if(err) reject(err);
            else resolve(result);
         })
      })
   }
}
