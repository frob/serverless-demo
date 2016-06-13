/**
 * Created by eric0089 on 6/11/16.
 */

import {inject} from 'aurelia-framework';
import {Auth} from '../system/auth';
import {Session} from'../system/session';

@inject(Auth, Session)
export class Index {
   files = [];

   constructor(auth, session) {
      this.auth = auth;
      this.session = session;
      this.bucket = new AWS.S3({params: {Bucket: 'serverless-objects'}});
      this.lambda = new AWS.Lambda();
   }

   getDocuments() {
      return new Promise((resolve, reject) => {
         this.lambda.invoke({FunctionName: 'serverless-query'}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
         });
      });
   }

   activate() {
      let calls = [];

      calls.push(this.auth.getUserAttributes());
      calls.push(this.getDocuments());

      return Promise.all(calls)
         .then(responses => {
            responses[0].map(item => {
               this[item.Name] = item.Value;
            });
            return JSON.parse(responses[1].Payload).Items.map(item =>{
               return this.files.push(item);
            });
         })
   }
}
