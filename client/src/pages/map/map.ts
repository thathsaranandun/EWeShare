import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import {LocDetailsPage} from '../loc-details/loc-details';
import { DataService } from '../../app/services/data.service';




@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  longitude: any;
  latitute: any;
  loaded: boolean = true;
  locations:any;
  mapmarks: google.maps.Marker[] = [];
  markerWindows:any[]=[];
  longitudes:any[]=[];
  latitudes:any[]=[];

  constructor(public nac:NavController, public navParams: NavParams,public dataService:DataService) {
  }

  ngOnInit(){
    this.initMap();
  }



  initMap() {

    this.dataService.getLocations().subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.locations.length; i++) {
        console.log(data.locations[i].longitude); //use i instead of 0
        console.log(data.locations[i].latitude);
        this.longitudes.push(data.locations[i].longitude);
        this.latitudes.push(data.locations[i].latitude);
        console.log('latitude:' + this.latitudes[i] + ' longitude:' + this.longitudes[i]);
        var available=data.locations[i].booked
        console.log(available)
        var markerIcon = '../assets/img/map/green_map_m.svg'
        if(available=='yes'){
          markerIcon='../assets/img/map/green_map_m.svg'
        }else if(available=='no'){
          markerIcon='../assets/img/map/orange_map_m.svg'
        }else{
          markerIcon='../assets/img/map/ash_map_m.svg'
        }
        let coord = new google.maps.LatLng(this.latitudes[i], this.longitudes[i]);
        let marker: google.maps.Marker = new google.maps.Marker({
          map: this.map,
          position: coord,
          icon: markerIcon

        });
        this.mapmarks.push(marker);
        console.log(this.mapmarks[i])
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapopts);
        this.markerDetails(this.mapmarks[i],this.markerWindows,i)
      }
    });

    let coord = new google.maps.LatLng(6.9407, 79.8796);
    let mapopts: google.maps.MapOptions = {
      center: coord,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };

    



  }

  markerDetails(marker,markerWindows:any[],i){
  const markerWindow = new google.maps.InfoWindow({
    content: '<h4>Charging Station 1</h4><br><p>Port Type:J1770<br>Availability: Available<br>Open Time:24/7</p><input type=submit value="View location" id="clickIt">'

  });
  markerWindows.push(markerWindow);

  marker.addListener('click', function () {
    markerWindows[i].open(this.map, marker)
  });

  google.maps.event.addListener(markerWindows[i], 'domready', () => {
    if(this.loaded){
      //now my elements are ready for dom manipulation
      const clickableItem = document.getElementById('clickIt');
      clickableItem.addEventListener('click', () => {
        this.nac.push(LocDetailsPage);
      });
      this.loaded=true;
    }
  });
  }



}