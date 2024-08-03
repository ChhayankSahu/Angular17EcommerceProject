import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';

declare var $:any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {


  ngOnInit(): void {
  //  throw new Error('Method not implemented.');
    this.getAllUser();
  this.addEditUserForm= this.formBuilder.group({
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
      uploadPhoto: ['', [Validators.required]],
      agreetc: ['', [Validators.required]],
      role: ['', [Validators.required]]
  });
  }
    constructor(private formBuilder:FormBuilder,private router:Router,private adminService:AdminService){}
    allUserata:any;
    singleUserData:any;
  addEditUserForm!:FormGroup;
  userDTO!:User;
  user_reg_data:any;
  editUserId:any;
  uploadFileName!:string;
  addEditUserFlag:boolean=false;
  addUserFlag:boolean=false;
  editUserFlag:boolean=false;
popupHeader!:string;
signInFormValue:any={};

getAllUser()
{
  this.adminService.allUser().subscribe(
    data=>{this.allUserata=data;},error=>{console.log("myerror",error);}
  );
}
get rf()
{return this.addEditUserForm.controls;}
addUserPopup()
{
  this.editUserFlag=false;
  this.addUserFlag=true;
  this.popupHeader="Add new User";
  this.addEditUserForm.reset();

}
addUser()
{
  this.addEditUserFlag=true;
  if(this.addEditUserForm.invalid)
    {
      alert('Error!!:-)\n\n'+JSON.stringify(this.addEditUserForm.value));return;
    }
    this.user_reg_data=this.addEditUserForm.value;
    this.userDTO={aboutYou:this.user_reg_data.aboutYou,
      age:this.user_reg_data.age,
      agreetc:this.user_reg_data.agreetc,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode
      },
      language:this.user_reg_data.language,
      password:this.user_reg_data.password,
      mobNumber:this.user_reg_data.mobNumber,
      uploadPhoto:this.user_reg_data.uploadPhoto,
      role:this.user_reg_data.role,
      name:this.user_reg_data.name}
      
        this.adminService.addUser(this.userDTO).subscribe(
          data=>{
            this.addEditUserForm.reset();
            this.getAllUser();

            $('#addEditUserModal').modal('toggle');
          },error=>{console.log("my error",error);}
        );
      }

      editUserPopup(userId: any)
      {
        this.editUserId=userId;
        this.editUserFlag=true;
        this.addUserFlag=false;
        this.popupHeader="Edit user";

        this.adminService.singleUser(userId).subscribe(
          data=>{
            this.singleUserData=data;
            this.uploadFileName=this.singleUserData.uploadPhoto;
            this.addEditUserForm.setValue({
              name:this.singleUserData.name,
              aboutYou:this.singleUserData.aboutYou,
              age:this.singleUserData.age,
              agreetc:this.singleUserData.agreetc,
              dob:this.singleUserData.dob,
              email:this.singleUserData.email,
              gender:this.singleUserData.gender,
                addLine1: this.singleUserData.address.addLine1,
                addLine2: this.singleUserData.address.addLine2,
                city: this.singleUserData.address.city,
                state: this.singleUserData.address.state,
                zipCode: this.singleUserData.address.zipCode,
              language:this.singleUserData.language,
              password:this.singleUserData.password,
              mobNumber:this.singleUserData.mobNumber,
              uploadPhoto:'',
              role:this.singleUserData.role



            });
            this.addEditUserForm.controls;
          },error=>{console.log("myError",error);}
        );

      }

      updateUser()
      {
  if(this.addEditUserForm.invalid)
    {
      alert('Error!!:-)\n\n'+JSON.stringify(this.addEditUserForm.value));return;
    }
    this.user_reg_data=this.addEditUserForm.value;
    this.userDTO={aboutYou:this.user_reg_data.aboutYou,
      age:this.user_reg_data.age,
      agreetc:this.user_reg_data.agreetc,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode
      },
      language:this.user_reg_data.language,
      password:this.user_reg_data.password,
      mobNumber:this.user_reg_data.mobNumber,
      uploadPhoto:(this.user_reg_data.uploadPhoto==""? this.uploadFileName:this.user_reg_data.uploadPhoto),
      role:this.user_reg_data.role,
      name:this.user_reg_data.name}
      
        this.adminService.editUser(this.editUserId,this.userDTO).subscribe(
          data=>{
            this.addEditUserForm.reset();
            this.getAllUser();
            $('#addEditUserModal').modal('toggle');
          },error=>{console.log("my error",error);}
        );
  
      }


      deleteUser(userId:any)
      {
          this.adminService.deleteUser(userId).subscribe(data=>{
            this.getAllUser();
          },error=>{console.log("my error",error);});
      }
}
