/**
 * Created by eric0089 on 6/11/16.
 */

import {inject} from 'aurelia-framework';
import {Auth} from '../system/auth';

@inject(Auth)
export class Index {

   fileChooser = [];

   constructor(auth) {
      this.auth = auth;

      //AWS.config.credentials.get();
      this.bucket = new AWS.S3({params: {Bucket: 'serverless-inbox'}});
   }

   uploadFile() {
      let file = this.fileChooser.files[0];
      let params = {Key: file.name, ContentType: file.type, Body: file};
      this.bucket.upload(params, (err, data) => {
         if (err) console.log(err);
         else(console.log(data));
      })
   }

   getProfile() {
      this.auth.getUserAttributes()
         .then(response => {
            response.map(item => {
               return this[item.Name] = item.Value;
            })
         })
         .catch(error => {
            console.log(error);
         })
   }

   activate() {
      this.getProfile();
   }
}
