/**
 * Created by eric0089 on 6/11/16.
 */

import {inject} from 'aurelia-framework';
import {Auth} from '../system/auth';

@inject(Auth)
export class Index{

   constructor(auth){
      this.auth = auth;
   }

   getProfile(){
      this.auth.getUserAttributes()
         .then(response =>{
            response.map(item => {
               return this[item.Name] = item.Value;
            })
         })
         .catch(error => {
            console.log(error);
         })
   }

   activate(){
      this.getProfile();
   }
}
