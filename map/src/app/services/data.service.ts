import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class DataService{
    

    constructor(public http:Http){

    }



    
    getUsers(){
        return this.http.get('http://localhost:3000/api/courses/')
            .map(res => res.json());
    }



userInfo
    addUser(user){
        return this.http.post('http://localhost:3000/api/courses/', user)
            .map(res => res.json());
    }




    deleteUser(id){
        return this.http.delete('http://localhost:3000/api/courses/'+id)
            .map(res => res.json());
    }




    updateUser(user){
        return this.http.put('http://localhost:3000/api/courses/'+user.id, user)
            .map(res => res.json());
    }




}