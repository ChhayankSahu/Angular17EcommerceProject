import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

userProfileForm!:FormGroup;
userProfile:boolean=false;
user_id!:number;
user_data:any;
user_update_data:any;
user_dto!:User
user_profile_pic:any;
user_role:any;
user_language:any;


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
this.user_id= Number(sessionStorage.getItem("user_session_id"));
this.userProfileForm=this.formBuilder.group(
{

  name: ['', [Validators.required]],
      mobNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]], 
      dob: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required]],
        addLine1: ['', [Validators.required]],
        addLine2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        language: ['', [Validators.required]],
        aboutYou: ['', [Validators.required]],
        uploadPhoto: ['', [Validators.required]]
  
}
);
this.editUserData(this.user_id);

  }

get rf()
{
  return this.userProfileForm.controls;
}

constructor(private formBuilder:FormBuilder,private router :Router ,private userService:UserService)
{}

editUserData(user_id:any)
{
  this.userService.getUserData(user_id).subscribe(
    data=>{
      this.user_data=data;
      this.user_profile_pic=this.user_data.uploadPhoto;
      this.user_language=this.user_data.language;
      this.userProfileForm.setValue({
        name:this.user_data.name,
        aboutYou:this.user_data.aboutYou,
        age:this.user_data.age,
        dob:this.user_data.dob,
        email:this.user_data.email,
        gender:this.user_data.gender,
          addLine1: this.user_data.address.addLine1,
          addLine2: this.user_data.address.addLine2,
          city: this.user_data.address.city,
          state: this.user_data.address.state,
          zipCode: this.user_data.address.zipCode,
        language:this.user_data.language,
        password:this.user_data.password,
        mobNumber:this.user_data.mobNumber,
        uploadPhoto:''
      });


    },error=>{
      console.log("myerror",error);
    }
  );
}

updateProfile()
{
  this.userProfile=true;
  if(this.userProfileForm.invalid)
  {return; }
  this.user_update_data=this.userProfileForm.value;

  this.user_dto={aboutYou:this.user_update_data.aboutYou,
    age:this.user_update_data.age,
    agreetc:this.user_update_data.agreetc,
    dob:this.user_update_data.dob,
    email:this.user_update_data.email,
    gender:this.user_update_data.gender,
    address:{
      id: 0,
      addLine1: this.user_update_data.addLine1,
      addLine2: this.user_update_data.addLine2,
      city: this.user_update_data.city,
      state: this.user_update_data.state,
      zipCode: this.user_update_data.zipCode
    },
    language:this.user_update_data.language,
    password:this.user_update_data.password,
    mobNumber:this.user_update_data.mobNumber,
    uploadPhoto:(this.user_update_data.uploadPhoto==""? this.user_profile_pic:this.user_update_data.uploadPhoto),
    role:this.user_update_data.role,
    name:this.user_update_data.name}

    
    this.userService.updateUserData(this.user_id,this.user_dto).subscribe(
      data=>{alert("profile update sussessful !");
        if(this.user_role=="admin")
        {this.router.navigateByUrl("/admin-dashboard");}
        else if(this.user_role='seller') {this.router.navigateByUrl("/seller-dashboard");}
        else if(this.user_role=="buyer")
        {this.router.navigateByUrl("/buyer-dashboard");}
       },error=>{console.log("my error",error); }
    );



}

}
