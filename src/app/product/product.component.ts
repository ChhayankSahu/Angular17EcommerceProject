import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object-model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  all_Product_Data: any;
  addEditProductForm!: FormGroup;
  addEditProduct: boolean = false;
  popUp_header!: string;
  add_product!: boolean;
  edit_prodcut!: boolean;
  prodcut_data: any;
  single_product_data: any;
  product_dto!: Product;
  edit_product_id: any;


  constructor(private formbuilder: FormBuilder, private productService: ProductService, private router: Router) { }
  ngOnInit(): void {

    this.addEditProductForm = this.formbuilder.group(
      {
        name: ["", [Validators.required]],
        uploadPhoto: ["", [Validators.required]],
        productDesc: ["", [Validators.required]],
        mrp: ["", [Validators.required]],
        dp: ["", [Validators.required]],
        status: ["", [Validators.required]]
      });
      this.getAllProduct();

  }
  get rf() {
    return this.addEditProductForm.controls;
  }

  getAllProduct() {
    // return this.apiService.get(this.product_url);
    this.productService.allProduct().subscribe(data => {
      this.all_Product_Data = data;
      console.log("my all product data: ", this.all_Product_Data);


    }, error => {
      console.log("my error all product errror ", error);

    });
  }

  addProductPopup() {
    this.add_product = true;
    this.edit_prodcut = false;
    this.popUp_header = "Add new Product";
    this.addEditProductForm.reset();
  }


  addNewProduct() {
    // return this.apiService.post(this.product_url,product_dto);
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) return;
    this.prodcut_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.prodcut_data.name,
      uploadPhoto: this.prodcut_data.uploadPhoto,
      productDesc: this.prodcut_data.productDesc,
      mrp: this.prodcut_data.mrp,
      dp: this.prodcut_data.dp,
      status: this.prodcut_data.status
    };
    this.productService.addNewProduct(this.product_dto).subscribe(data => {
      console.log(data);
      this.getAllProduct();
    }, error => {
      console.log("addnew productErrror ", error);
    });
  }


  //edit section


  editProductPopup(id:any)
  {
    this.add_product = false;
    this.edit_prodcut = true;
    this.popUp_header = "Edit Product";

    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe(data=>{
      this.single_product_data=data;
      console.log("single product data",this.single_product_data);
      this.edit_product_id=this.single_product_data.id;
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status

      });
    },e=>{console.log("error ",e);

    });
  }

  updateProduct() {
    // return this.apiService.put(this.product_url+id,product_dto);
    this.addEditProduct=true;
    if(this.addEditProductForm.invalid)return;
    this.prodcut_data=this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.prodcut_data.name,
      uploadPhoto: this.prodcut_data.uploadPhoto,
      productDesc: this.prodcut_data.productDesc,
      mrp: this.prodcut_data.mrp,
      dp: this.prodcut_data.dp,
      status: this.prodcut_data.status
    };
    this.productService.updateProduct(this.edit_product_id,this.product_dto).subscribe(data=>{
      console.log("update sussessful data-> ",data);
      this.getAllProduct();
      
    },e=>{console.log("error in update",e);
    });
  }
  deleteProduct(id: any) {
    // return this.apiService.delete(this.product_url+id);
    let conf=confirm("do you want to delete this product Id: "+id);
    if(conf)
     { this.productService.deleteProduct(id).subscribe(data=>{
      console.log("delete sussess fll",data);
      this.getAllProduct();
      
        },e=>{console.log("error in delete ",e);
        });}
        else {alert("you pressed cancel");}
  }

}
