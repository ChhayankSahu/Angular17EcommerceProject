import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit{
all_products:any;
show_checkout_flag:boolean=false;
  constructor(private router:Router,private customerService:CustomerService)
  {

  }
  
  ngOnInit(): void {
    this.getAllProduct();
  }
getAllProduct()
{
  this.customerService.allProduct().subscribe(
    data=>{this.all_products=data;
      console.log(this.all_products);
    },error=>{console.log("my error",error);}
  );
}
buyProduct(id:number)
{
this.show_checkout_flag=true;
this.customerService.quickBuyProduct(id);
this.router.navigateByUrl("/checkout");
}

addToCart()
{
  alert("this is showcase for addToCart method");
}
}
