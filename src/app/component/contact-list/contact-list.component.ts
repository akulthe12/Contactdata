import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { contact } from '../contactmodel';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  data: contact[] = [];
constructor(private api:ApiService){}
ngOnInit():void{
  this.getcontact();
 
}
  getcontact() {
    this.api.getcontact().subscribe((res) => {
      const contactArr = Object.entries(res).map(entry => entry[1]);
      this.data.push(...contactArr);
  })
}
delete(id:number)
{
 this.api.deletecontact(id).subscribe(res=>{
  alert('contact deleted successfully!!')
  this.getcontact();
 })
}
logout()
{
  localStorage.removeItem("logindata")
}
}
