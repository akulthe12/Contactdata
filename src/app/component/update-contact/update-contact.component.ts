import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { contact } from '../contactmodel';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent {
  public contactid!:number;
  public contactdata:contact={ }as contact;
constructor(private api:ApiService , private activateRoute:ActivatedRoute, private router:Router)
{

}
ngOnInit():void{
  this.activateRoute.params.subscribe((param:Params)=>{
    this.contactid=param['id']
  })
  this.api.fetchdata(this.contactid).subscribe((data:contact)=>{
    this.contactdata=data;
    console.log(data)
  })
}
update()
{
  this.api.updatecontact(this.contactdata,this.contactid).subscribe((res)=>{
    alert("Data updated sucessfully")
    this.router.navigate(['/contactlist'])
  })
}
}
