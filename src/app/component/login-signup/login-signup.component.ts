import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signup,login } from '../contactmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {
 isshow=false;
constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router){}
signupform!:FormGroup;
loginupform!:FormGroup;
ngOnInit():void{
this.signupform=this.formBuilder.group({
  name:['',Validators.required],
email:['',Validators.required],
password:['',Validators.required]
})
this.loginupform=this.formBuilder.group({
email:['',Validators.required],
password:['',Validators.required]
})
}
signup()
{
  this.isshow=true;
}
login()
{
  this.isshow=false; 
}
submitsignup()
{
  this.http.post<signup>("http://localhost:3000/signup/",this.signupform.value).subscribe(res =>{
    alert("user successfully signup");
    this.signupform.reset();
    this.isshow = false;
   })
}
loginuser()
{
  this.http.get<login[]>("http://localhost:3000/signup/").subscribe(res=>{
    //matching email & password
    const user=res.find((a:any)=>{
      return a.email===this.loginupform.value.email && a.password===this.loginupform.value.password;
    })
    if(user)
    {
      alert("successfully logged in")
      this.loginupform.reset();
      this.router.navigate(["/contactlist"])
      //storing data in local storage
      localStorage.setItem('logindata',JSON.stringify(user))
    }
    else{
      alert("user not found with these credentials")
      this.loginupform.reset();
    }
  },
err=>{
  alert("somthing went wrong try after sometimes")
   this.loginupform.reset();
  })
}
}



