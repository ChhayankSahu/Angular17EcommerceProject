import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,FormsModule
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{
signInFormValue:any={};
user_data:any;




  ngOnInit(): void {
    
  }
constructor(private loginService:LoginSignupService,private router:Router){}

onSubmitSignIn()
{
  this.loginService.adminLogin(this.signInFormValue.userEmail,this.signInFormValue.password).subscribe
(
  data=>{this.user_data=data;
  
    sessionStorage.setItem("user_session_id",this.user_data.id);
      sessionStorage.setItem("role",this.user_data.role);
        this.router.navigateByUrl("/admin-dashboard");
        console.log(this.user_data);
  },
error=> {
  alert(error.error);
  console.log("Admin_page Error",error);}
);
}


}
