import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Address, Order, Product, User } from '../../../core/Model/object-model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  single_product_id:any;
  user_id:any;
individual_product!:Product;
user_detail!:User;
user_address!:any;
user_contact_number:any;
order_dto!:Order;
ngOnInit(): void {
  this.customerService.currentProduct.subscribe(data=>{
    this.single_product_id=data;
    this.user_id=Number(sessionStorage.getItem("user_session_id"));
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);


  },error=>{console.log("my error ",error);}

  );
}
constructor(private customerService:CustomerService, private router:Router)
{

}

productDetail(single_product_id:any)
{
  this.customerService.individualProduct(single_product_id).subscribe(data=>{
    this.individual_product=data;
    console.warn("my single product ",this.individual_product);
  },error=>{
    console.log("my error",error);
  });
}
userAddress(user_id:any)
{this.customerService.userDetail(user_id).subscribe(data=>{
this.user_address=data.address;
this.user_contact_number=data.mobNumber;
},error=>{
  console.log("my error",error);
});

}


placeorder()
{
  this.order_dto={
    id:0,
    userId:this.user_id,
    sellerId:2,
    product:{
      id:this.individual_product.id,
      name:this.individual_product.name,
      dp:this.individual_product.dp,
      mrp:this.individual_product.mrp,
      productDesc:this.individual_product.productDesc,
      status:this.individual_product.status,
      uploadPhoto:this.individual_product.uploadPhoto
    },
    deliveryAddress:{
      id:0,
      addLine1:this.user_address.addLine1,
      addLine2:this.user_address.addLine2,
      city:this.user_address.city,
      state:this.user_address.state,
      zipCode:this.user_address.zipCode
    },
    contact:this.user_contact_number,
    dateTime:new Date().toLocaleDateString()
  }
  console.log("place order dto",this.order_dto);
  this.customerService.insertNewOrder(this.order_dto).subscribe(data=>{
    alert("your order is placed successfully!");
    this.router.navigateByUrl("/buyer-dashboard");
  },error=>{
    console.log("order error",error);
    
  });
}
}
