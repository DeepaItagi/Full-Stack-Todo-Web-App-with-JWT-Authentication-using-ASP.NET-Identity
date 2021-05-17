import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  constructor(
    public accountService:AccountService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

}
