import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

//admin before login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin implements CanActivate
{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role=sessionStorage.getItem("role");
    if(role=="admin")
      {
        this.router.navigate(["/admin-dashboard"]);
        return false;
      }else
     { return true;}
  }


}




//admin after login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService
{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role=sessionStorage.getItem("role");
    if(role=="admin")
      {
       return true;
      }else
      this.router.navigate(["/admin-login"]);
      return false;
  }
}

//customer(buyer/seller) before login check
@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardLogin implements CanActivate
{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role=sessionStorage.getItem("role");
    if(role=="seller")
      {
        this.router.navigate(["/seller-dashboard"]);
       return false;
      }else if(role=="buyer")
        {
          this.router.navigate(["/buyer-dashboard"]);
         return false;
        }
        else
      {  return true;}
  }
}



//buyer after login check
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService
{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role=sessionStorage.getItem("role");
    if(role=="buyer")
      {
       return true;
      }else
      this.router.navigate(["/sign-in"]);
      return false;
  }
}

//seller after login check
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService
{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let role=sessionStorage.getItem("role");
    if(role=="seller")
      {
       return true;
      }else
      this.router.navigate(["/sign-in"]);
      return false;
  }
}