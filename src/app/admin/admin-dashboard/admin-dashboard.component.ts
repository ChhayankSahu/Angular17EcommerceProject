import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  user_dashboard_data: any;
  total_user_number: number = 0;
  admin_user_number: number = 0;
  seller_user_number: number = 0;
  buyer_user_number: number = 0;

  product_dashboard_data: any;
  total_product_number: number = 0;
  published_product_number: number = 0;
  inactive_product_number: number = 0;
  draft_product_number: number = 0;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.adminUserDashboardData();
    this.adminProductDashboardData();


  }
  constructor(private adminService: AdminService, private router: Router) {

  }


  user_dashboard() {
    this.router.navigateByUrl("/admin/user");
  }
  product_dashboard() {
    this.router.navigateByUrl("/admin/product");
  }
  adminUserDashboardData() {
    this.adminService.allUser().subscribe(
      data => {
        this.user_dashboard_data = data;
        console.log(this.user_dashboard_data);
        for (let user in this.user_dashboard_data) {
          if (this.user_dashboard_data[user].role == "admin") { ++this.admin_user_number; }
          else if (this.user_dashboard_data[user].role == "seller") { ++this.seller_user_number; }
          else if (this.user_dashboard_data[user].role == "buyer") { ++this.buyer_user_number; }
          ++this.total_user_number;
        }
      }, error => { console.log("myerror", error); }
    );
  }

  adminProductDashboardData() {
    this.adminService.prodoctDashboardData().subscribe(
      data => {
        this.product_dashboard_data = data;
        console.log(this.product_dashboard_data);
        for (let status in this.product_dashboard_data) {
          if (this.product_dashboard_data[status].status == "publish") { ++this.published_product_number; }
          else if (this.product_dashboard_data[status].status == "inactive") { ++this.inactive_product_number; }
          else if (this.product_dashboard_data[status].status == "draft") { ++this.draft_product_number; }
          ++this.total_product_number;
        }
      }, error => { console.log("myerror", error); }
    );
  }



}
