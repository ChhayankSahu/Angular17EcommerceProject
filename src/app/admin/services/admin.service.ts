import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = "http://localhost:3000/user/";//for single user bby userid
  public product_url = "http://localhost:3000/products/";
  public orders_url = "http://localhost:3000/orders/";
  public all_users_url = "http://localhost:3000/users/";//for all users

  constructor(private apiService:ApiService) { }

  userDashboardData()
{
return this.apiService.get(this.user_url);
}
prodoctDashboardData()
{
  return this.apiService.get(this.product_url);
}

allUser():Observable<any>
{
  return this.apiService.get(this.all_users_url);
}
addUser(userDTO: any)
{
  return this.apiService.post(this.user_url,userDTO);
}
//get single user  data
singleUser(userId:any)
{return this.apiService.get(this.user_url+userId);}
//update data of  individual user
editUser(userId:any,userDTO:any):Observable<any>{
  return this.apiService.put(this.user_url+userId,userDTO);
}

///de;ete user
deleteUser(userId:any){
  return this.apiService.delete(this.user_url+userId);
}

}
