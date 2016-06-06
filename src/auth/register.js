/**
 * Created by eric0089 on 6/5/16.
 */

import {inject} from 'aurelia-framework';
import {Session} from '../system/session';
import {Auth} from '../system/auth';

@inject(Session, Auth)
export class Register {
   user = {
      name: '',
      email: '',
      username: '',
      password: ''
   };

   constructor(session, auth) {
      this.session = session;
      this.auth = auth;
   }

   registerUser() {
      this.auth.registerUser(this.user);
   }
}
