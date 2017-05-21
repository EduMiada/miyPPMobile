import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { trigger, state, style, transition, animate, keyframes  } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})

export class LoginPage {
  
  private loginForm:FormGroup;
  private submitted = false;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public Loading:LoadingController, 
              public user:UserProvider, public toast:ToastController) {
    
    this.loginForm = formBuilder.group({
      username:  ['', Validators.required],
      password:  ['', Validators.required],
      serverURL: ['http://ppmlatam182.ca.com', Validators.required]
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   onLogin(form) {
    let loading = this.Loading.create({
      content: "Connecting to PPM Server...",
      duration: 2000,
      dismissOnPageChange:true
    });

    this.submitted=true;

    if(form.valid){
      loading.present();
      //console.log(form.value);
      this.user.authenticate(form.value)
      .subscribe(
        data => {
          console.log('user login return', data);
          this.user.getProfile(form.value.username, data)
            .subscribe(
              data => console.log('profile returb', data),
              err => {loading.dismiss() ; this.showToast(err)},
              () =>  {loading.dismiss() ; this.navCtrl.setRoot(TabsPage)}
            )
          },
          
        err => {loading.dismiss() ; this.showToast(err)}
        
     );
//    this.nav.push(TabsPage);
  


    }



    // this.user.authenticate(value)
    //   .subscribe(
    //     data => console.log(data),
    //     err => alert(err),
    //     () =>   this.nav.push(TabsPage)

    //   );

  }


  showToast(message) {
    //this.loading.dismiss();
    let toast = this.toast.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    // toast.onDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    //  this.nav.present(toast);
    toast.present();
  }


}
