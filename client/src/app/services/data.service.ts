import { Injectable } from '@angular/core'
// import {Observable} from 'rxjs/observable';
 import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/* 
interface User {
  name: string
} */

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Sending User Inputs and recieving predicted location details 
   * @param time 
   * @param kwh 
   * @param chargerType 
   */
  postPrediction(time:number,kwh:number,chargerType:number){
    return this.http.post('http://localhost:5000/api/prediction',{
        'time':time,
        'kwh':kwh,
        'chargerType':chargerType
    });
  }

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


//=============================================GET THE USER DETAILS==============================================================
  
getItems(id :number){
  return this.http.get('http://localhost:5000/user/'+id)
      
}


//=============================================UPDATE THE USER DETAILS==============================================================
editUser(userId:string,fname:string,lname:string,username:string,email:string,address:string,password:string){
  return this.http.post('http://localhost:5000/update',{
    'userId':userId,
    'userFName':fname,
    'userLName':lname,
    'username':username,
    'email':email,
    'address':address,
    'password':password
  })
}



}