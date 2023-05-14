import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { contact } from '../contactmodel';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent{
  
  
  contactform!:FormGroup;
 

  constructor(private fb:FormBuilder,private router:Router,private api:ApiService){}
  ngOnInit():void{
    this.contactform=this.fb.group({
      firstname:new FormControl('',Validators.required),
      lastname:new FormControl('',Validators.required),
      mobno:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),

    })
    
   
  }
  submitcontact(data:contact)
  {
  this.api.addcontact(data).subscribe((res)=>{
    this.contactform.reset();
    this.router.navigate(["/contactlist"])
  })
  
  }
 
}