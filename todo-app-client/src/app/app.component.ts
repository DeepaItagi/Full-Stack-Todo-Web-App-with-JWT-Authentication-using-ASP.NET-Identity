import { Component, OnInit } from '@angular/core';
import { UserToken } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-app';

  constructor(private accountService:AccountService){}
  ngOnInit(){
    this.setCurrentUser();
    
  }
  
  setCurrentUser()
  {
    const user:UserToken=JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  
}
