import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, UrlSerializer } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';


/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {


  
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  enteredDataStatus:boolean=false;
  userId:string='';
  userFname:string='';
  userLname:string='';
  userEmail:string='';
  userName:string='';
  userAddress:string='';
  userPassword:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataService) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');

    var test = localStorage.getItem('data');
     let arr = JSON.parse(test);
      console.log(arr);

      this.enteredDataStatus=false;
      this.userId=arr[0];
      this.userFname=arr[1];
      this.userLname=arr[2];
      this.userEmail=arr[3];
      this.userName=arr[4];
      this.userAddress=arr[5];
      this.userPassword=arr[6];

  
  }


 




 


    edit(){
      
     
      
      this.dataService.editUser(this.userId,this.userFname, this.userLname,this.userEmail, this.userName,this.userAddress, this.userPassword).subscribe((data) =>
       {

        // this.userFname=this.userFname;
        // this.userLname=this.userLname;
        // this.userEmail=this.userEmail;
        // this.userName=this.userName;
        // this.userAddress=this.userAddress;
        // this.userPassword=this.userPassword;

         
                
            
               console.log(data);
                this.enteredDataStatus=true;
  
                // //store data in the local storage
                // let json = JSON.stringify(data);
                // localStorage.setItem('data', json);
  
                // //retireve data from the local storage
                // var test = localStorage.getItem('data');
                // let arr = JSON.parse(test);
                // console.log(arr);
  

      

               alert("User Details Updated Successfully.")
      
            // }else
            // {

            //   alert("User Details Updated Failed.")

            // }
    
    
    
    
    
  });
    
  }
 
}






