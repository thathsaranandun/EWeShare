import { Injectable } from '@angular/core'
// import {Observable} from 'rxjs/observable';
// import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/* 
interface User {
  name: string
} */

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}


  getUser(name:string){
    return this.http.get('http://localhost:5000/api/users/'+name)
  }

  postUser(name:string){
    return this.http.post('http://localhost:5000/api/user',{'name':name})
  }

  postSignUp(fname:string,lname:string,username:string,email:string,address:string,password:string){
    return this.http.post('http://localhost:5000/api/newuser',{
      'fname':fname,
      'lname':lname,
      'username':username,
      'email':email,
      'address':address,
      'password':password
    })
  }

  postLogIn(name:string,password:string){
    return this.http.post('http://localhost:5000/api/userlogin',{
      'name':name,
      'password':password
    })
  }
}