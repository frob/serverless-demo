/**
 * Created by eric0089 on 6/5/16.
 */

import {inject} from 'aurelia-framework';
import {Session} from '../system/session';
import {Auth} from '../system/auth';

@inject(Session, Auth)
export class Login{
   username = '';
   password = '';

   constructor(session, auth){
      this.session = session;
      this.auth = auth;
   }

   loginUser(){
      this.auth.loginUser(this.username, this.password);
      // AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});
      //
      // var authenticationData = {
      //    Username: this.username,
      //    Password: this.password
      // };
      //
      // var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      //
      // let poolData = {
      //    UserPoolId: 'us-east-1_fgCWraBkF',
      //    ClientId: '57lq262n28o7ddt8i36jcjj7qd'
      // };
      //
      // var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      //
      // var userData = {
      //    Username: this.username,
      //    Pool: userPool
      // };
      //
      // var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      //
      // cognitoUser.authenticateUser(authenticationDetails, {
      //    onSuccess: (result) => {
      //       AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      //          IdentityPoolId: 'us-east-1:35b6094e-ff5b-44a5-ac52-e879ae263c91',
      //          Logins: {
      //             'cognito-idp.us-east-1.amazonaws.com/us-east-1_fgCWraBkF': result.getIdToken().getJwtToken()
      //          }
      //       });
      //
      //       cognitoUser.getUserAttributes((err, result) => {
      //          if (err) {
      //             alert(err);
      //             return;
      //          }
      //          for (i = 0; i < result.length; i++) {
      //             this.session[result[i].getName()] = result[i].getValue();
      //          }
      //       });
      //    },
      //
      //    onFailure: (err) => {
      //       alert(err);
      //    }
      //
      // });

   }
}
