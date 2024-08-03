import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
public user_url="http://localhost:3000/user";
public product_url="http://localhost:3000/products/";
public order_url="http://localhost:3000/orders/";

private single_product_id=new BehaviorSubject(null);
currentProduct=this.single_product_id.asObservable();
  constructor(private apiservice:ApiService) { }

allProduct():Observable<any>
{
  return this.apiservice.get(this.product_url);
}
quickBuyProduct(prodcut_id:any)
{
  this.single_product_id.next(prodcut_id);
}
individualProduct(id:any)
{
  return this.apiservice.get(this.product_url+id);
}
userDetail(id:any)
{
  return this.apiservice.get(this.user_url+"/"+id);
}

insertNewOrder(order_dto:any)
{
  return this.apiservice.post(this.order_url,order_dto);
}
orderDashboardData ():Observable<any>
{
return this.apiservice.get(this.order_url);
}
productDashboardData():Observable<any>{
  return this.apiservice.get(this.product_url);
}


}
