/**
 * Created by eric0089 on 6/5/16.
 */

import {inject} from 'aurelia-framework';
import {Session} from '../system/session';
import {Auth} from '../system/auth';

@inject(Session, Auth)
export class Confirm{
   username = '';
   code = '';

   constructor(session, auth) {
      this.session = session;
      this.auth = auth;
   }

   confirmUser() {
      this.auth.confirmUser(this.username, this.code);
   }

   activate(params){
      this.username = params.username;
   }
}
