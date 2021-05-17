import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  hide=true;
  
  constructor(
    private accountService:AccountService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      Username:['',Validators.required],
      Password:['',Validators.required]
    });
    this.accountService.getCurrentUser();
  }

  logIn()
  { console.log(this.loginForm.value);
    this.accountService.signIn(this.loginForm.value).subscribe(()=>
    {
      this.toastr.success("Login success");
      this.loginForm.reset();
      this.router.navigateByUrl('/');
      console.log("Login success");
    })
  }

  cancel()
  {
    this.loginForm.reset();
  }

}
