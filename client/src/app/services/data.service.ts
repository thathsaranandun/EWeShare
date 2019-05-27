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

  /**
   * Sending User Inputs and recieving predicted location details 
   * @param time 
   * @param kwh 
   * @param chargerType 
   */
  postPrediction(time:number,kwh:number,chargerType:number){
    return this.http.post('https://arcane-eyrie-52241.herokuapp.com/api/prediction',{
        'time':time,
        'kwh':kwh,
        'chargerType':chargerType
    });
  }

  postAddSite(address:string,latitude:string,longitude:string,userId:number){
    return this.http.post('https://arcane-eyrie-52241.herokuapp.com/api/addsite',{
        'address':address,
        'latitude':latitude,
        'longitude':longitude,
        'userId':userId
    });
  }

  

  getUser(name:string){
    return this.http.get('https://arcane-eyrie-52241.herokuapp.com/api/users/'+name)
  }

  postUser(name:string){
    return this.http.post('https://arcane-eyrie-52241.herokuapp.com/api/user',{'name':name})
  }

  postSignUp(fname:string,lname:string,username:string,email:string,address:string,password:string){
    return this.http.post('https://arcane-eyrie-52241.herokuapp.com/api/newuser',{
      'fname':fname,
      'lname':lname,
      'username':username,
      'email':email,
      'address':address,
      'password':password
    })
  }

  postLogIn(name:string,password:string){
    return this.http.post('https://arcane-eyrie-52241.herokuapp.com/api/userlogin',{
      'name':name,
      'password':password
    })
  }

  getLocations(){
    return this.http.get('https://arcane-eyrie-52241.herokuapp.com/api/getlocations')
  }

  //=============================================GET THE USER DETAILS==============================================================
  
getItems(id :number){
  return this.http.get('https://arcane-eyrie-52241.herokuapp.com/user/'+id)
      
}


//=============================================UPDATE THE USER DETAILS==============================================================
editUser(userId:string,fname:string,lname:string,username:string,email:string,address:string,password:string){
  return this.http.post('https://arcane-eyrie-52241.herokuapp.com/update',{
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