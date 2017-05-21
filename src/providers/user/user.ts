import { Injectable } from '@angular/core';
import { CoreProvider } from '../core/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
//import 'rxjs/add/operator/map';


@Injectable()
export class UserProvider {
  public  profile =  {
    id: undefined,
    token: undefined,
    avatar:undefined,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    fullName:undefined,
    serverURL:undefined
  };

  public server = '';
  public token = '';

  constructor(private core:CoreProvider) {
    console.log('Hello UserProvider Provider');
  }
    // check if there's a user session present
  isConnected () {
    console.log('profile.token:', this.profile.token);
    // if this session is already initialized in the service
    if (this.profile.token) {
      console.log('User is has a valid token, is connected');
      return true;
    }
    else {
      // check if there's a session in localstorage from previous use.
      // if it is, pull into our service
      var user = this.core.getStoreObject('user');

      console.log('user object:', user);

      if (user.token) this.setSession(user, '',user.token);

      if (this.profile.token) {
          console.log('User has connected befere has a valid token', this.profile);
          return true;
      }
      else {
          // no user info in localstorage, reject
          console.log('User DONT have a valid token');
          return false;
      }
    } //end if
  }; //end func

  // attempt login
  authenticate (credentials) {
    //convert user to base64
    let userAuth = 'Basic ' + window.btoa(credentials.username + ':' + credentials.password);
    let token = '';

    this.profile.username = credentials.username;

    //call login method
    return this.core.authenticate(credentials.serverURL, userAuth)
      .map(res => {
          token=res.json().authToken; 
          this.setServerURL(token, credentials.serverURL)})
      .map(res => token)
      .catch(this.handleError)
      // .map(
      //   //the API doesnt return self to user / additional call to get resourceID
      //   res => this.getUsers('(uniqueName = \'' + credentials.username + '\')')
      //     .subscribe(
      //       //get the resource data
      //       users => this.getUser(users._results[0]._internalId)
      //         .subscribe(
      //           user => this.setSession(user,credentials.serverURL, '')
      //           //() => this.profile
      //         )
      //     )
      // )
    //  .map(res => this.profile)
  };

  getProfile(userName, token){
    let filter = '(uniqueName = \'' + userName + '\')';
    let activeFilter = '((isActive = true) and ' +  filter + ')';
    let fields = '&fields=fullName,firstName,lastName';
    let url = this.core.API_ENDPOINT.API_RESOURCES +  '?filter=' + activeFilter + fields;

    console.log('get profile token', this.core.token);

    return this.core.get(url)
      .map(res => res.json()._results[0])
      .map(res => this.setSession(res,null,null))
      .catch(this.handleError);
  }

  //hande http observer error
  handleError(error) {
    return Observable.throw(error.json().errorMessage || 'Server error');
  };

  setServerURL(token, serverURL){
    this.core.token= token;
    this.core.server=serverURL;
    this.profile.serverURL = serverURL;
    this.profile.token = token;
  }

  setSession (user, serverURL, token) {
    console.log('user', user);
    if (user._internalId)  this.profile.id = user._internalId;
    if (user.uniqueName)   this.profile.username = user.uniqueName;
    if (user.avatar)       this.profile.avatar = user.avatar;
    if (user.firstName)    this.profile.firstName = user.firstName;
    if (user.lastName)     this.profile.lastName = user.lastName;
    if (user.fullName)     this.profile.fullName = user.fullName;
    if (serverURL)         this.profile.serverURL = serverURL;
    if (token)             this.profile.token = token ;

    
    this.core.token = this.profile.token;
    this.core.server = this.profile.serverURL;
    this.core.setStoreObject('user', user);
    return this.profile;
  };

  //Authenticate user
  destroySession() {
    this.core.setStoreObject('user', {});
    this.core.token = undefined;
    this.core.server = undefined;
    this.profile.token = false;
    this.profile.username = '';
  };

}
