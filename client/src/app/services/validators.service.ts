import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';

@Injectable()
export class ValidatorsService {

  constructor(private http: Http) {
    this.availableEmail = this.availableEmail.bind(this);
    this.existingEmail = this.existingEmail.bind(this);
   }
  equalValidator({ value }: FormGroup): { [key: string]: any } {
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : { equal: true };
  }
  availableEmail(control: FormControl) : Observable<any>{
    return this.http.get('api/availableEmail/' + control.value).map(function(data : any){
      let res = data.json()
      return res.available ? null : {notAvailable : true };
    }).debounceTime(500);
  }
  existingEmail(control: FormControl) : Observable<any>{
    return this.http.get('api/availableEmail/' + control.value).map(function(data){
      let res = data.json();
      return res.available ? {existEmail : true } : null;
    }).debounceTime(500);
  }
}
