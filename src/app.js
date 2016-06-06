import {inject} from 'aurelia-framework';
import {Session} from './system/session';
import {Auth} from './system/auth';

@inject(Session, Auth)
export class App {
   constructor(session, auth){
      this.session = session;
      this.auth = auth;
   }

   configureRouter(config, router) {
      config.title = 'Serverless Architecture';
      config.options.pushState = true;
      config.map([
         {route: ['', 'home'], name: 'home', moduleId: 'home', nav: true, title: 'Home'},
         {route: 'page2', name: 'page2', moduleId: 'page2', nav: true, title: 'Page2'},
         {route: 'register', name: 'register', moduleId: 'auth/register', nav: false, title: 'Register'},
         {route: 'confirm', name: 'confirm', moduleId: 'auth/confirm', nav: false, title: 'Confirm'},
         {route: 'login', name: 'login', moduleId: 'auth/login', nav: false, title: 'Login'}
      ]);

      this.router = router;
   }

   activate(){
      this.auth.getSession();
   }
}

