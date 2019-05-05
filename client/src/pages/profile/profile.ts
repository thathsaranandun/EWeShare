import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { DataService } from '../../app/services/data.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile{
  users:{};

  user = {
      address:'',
      email:'',
      password:'',
      userFname:'',
      userLname:'',
      userName:''

}

  userFname:string='';
  userLname:string='';
  userEmail:string='';
  userName:string='';
  userAddress:string='';
  userPassword:string='';

  nextPage=EditPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService: DataService) {
  
}




  ngOnInit() 
  {
    
 
    //retireve data from the local storage
    var test = localStorage.getItem('userid');
    let arr = JSON.parse(test);
    console.log(arr);
    

  
    this.dataService.getItems(arr).subscribe(users=> {
     
      console.log(users);
       console.log(this.user);
      
              this.users=users;


              let json = JSON.stringify(users);
              localStorage.setItem('users', json);

              var test = localStorage.getItem('users');
              let arr = JSON.parse(test);
              console.log(arr.address);
              console.log(arr.email);
              console.log(arr.userFName);


              this.userFname=arr.userFName;
              this.userLname=arr.userLName;
              this.userEmail=arr.email;
              this.userName=arr.username;
              this.userPassword=arr.password;
              this.userAddress=arr.address;


              

  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
     
  }







}



