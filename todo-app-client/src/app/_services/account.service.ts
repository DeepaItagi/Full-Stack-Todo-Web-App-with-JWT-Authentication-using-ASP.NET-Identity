import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserToken } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loggedIn=false;
  basrUrl="https://localhost:44334/api/";
  private currentUserSource = new ReplaySubject<UserToken>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  //Signup a user
  signUp(model:any)
  {
    return this.http.post(this.basrUrl+'Account/register', model).pipe(
      map((user:UserToken)=>
      {
          this.setCurrentUser(user);
          this.loggedIn=true;
      })
    ) 
  }

  //Signin a user
  signIn(model:any)
  {
    return this.http.post(this.basrUrl+'account/login', model).pipe(
      map((response:UserToken)=>
      {
        const user=response;
        if(user){
          this.setCurrentUser(user);
          console.log(user);
          this.loggedIn=true;
        }
      })
    )
  }

  //Stores the current user token in local storage.
  setCurrentUser(user:UserToken){
     localStorage.setItem('user', JSON.stringify(user));
     this.currentUserSource.next(user);
  }

  
  getCurrentUser()
  {
    this.currentUser$.subscribe((user)=>
    { this.loggedIn=!!user;
      console.log(user);
      
    }, error =>{
      console.log(error);
      
    })
  }

  //Logout 
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    console.log("logout");
    this.loggedIn=false;
  }
  
}
