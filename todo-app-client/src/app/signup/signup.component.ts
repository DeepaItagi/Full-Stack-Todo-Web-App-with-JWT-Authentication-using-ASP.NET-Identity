import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm:FormGroup;
  hide=true;
  
  constructor(
    private accountService:AccountService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      Username:['', Validators.required],
      Password:['', Validators.required]
    });
    this.accountService.getCurrentUser();
  }

  register()
  {
    this.accountService.signUp(this.registerForm.value).subscribe(()=>
    {
      console.log("Registered");
      this.registerForm.reset();
      this.toastr.success('Registered Successfully');
      this.router.navigateByUrl('/');
      
    })
  }

  cancel()
  {
    this.registerForm.reset();

  }

}
