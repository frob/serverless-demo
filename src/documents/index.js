import {inject} from 'aurelia-framework';
import {Session} from '../system/session';
import showdown from 'showdown';

@inject(Session)
export class Index {
   markdown = '#hello, markdown!';
   translation = '';
   files = [];

   constructor(session) {
      this.converter = new showdown.Converter();
      this.session = session;
      this.lambda = new AWS.Lambda()
   }

   translate() {
      this.translation = this.converter.makeHtml(this.markdown);
   }

   createPDF() {
      this.lambda.invoke({
         FunctionName: 'pdf',
         Payload: JSON.stringify({html: this.translation})
      }, (err, data) => {
         if (err) console.log(err);
         else {
            console.log(data.Payload);
            this.files.push(JSON.parse(data.Payload).filename);
         }
      })
   }

   activate() {
      this.translate();
   }
}
