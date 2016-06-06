/**
 * Created by eric0089 on 6/5/16.
 */

import {bindable, inject} from 'aurelia-framework';
import {Session} from'./system/session';
import {Auth} from'./system/auth';

@inject(Session, Auth)
export class NavBar{
   @bindable router;

   constructor(session, auth){
      this.session = session;
      this.auth = auth;
   }

   userLogout(){
      this.auth.logoutUser();
      // let poolData = {
      //    UserPoolId: 'us-east-1_fgCWraBkF',
      //    ClientId: '57lq262n28o7ddt8i36jcjj7qd'
      // };
      //
      // var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      //
      // var cognitoUser = userPool.getCurrentUser();
      //
      // if (cognitoUser != null) {
      //    cognitoUser.getSession(function (err, session) {
      //       if (err) {
      //          alert(err);
      //          return;
      //       }
      //       console.log('session validity: ' + session.isValid());
      //    });
      // }
      //
      // this.session.name = null;
      // this.session.email = null;
      //
      // cognitoUser.signOut();
   }
}
