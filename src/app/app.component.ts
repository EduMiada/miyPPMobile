import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; // = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, user: UserProvider) {
    let self = this;
    
    let promise = new Promise(resolve => {
      resolve(user.isConnected());
    });

    promise.then(function(connected){
      console.log('user connected',connected);
      if (!connected){
        self.rootPage = LoginPage;
      }else{
        self.rootPage = TabsPage;
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
