import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface markerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements AfterViewInit {

  @ViewChild('map', {static: false}) divMap: ElementRef;
  map: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-75.5776713942151, 6.281109732184157];
  markers: markerColor[] = [];

  constructor() { }

  ngAfterViewInit(){
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.GetLocalStorage();

    /*const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hello World';
    
    ({elemet: markerHtml})
    */

    /*
    new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.map);
    */
  }

  AddMarker(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.map);

    this.markers.push({
      color,
      marker: newMarker
    });

    newMarker.on('dragend', () => {
      this.SaveMarkersLocalStorage();
    });

    this.SaveMarkersLocalStorage();
  }

  GoToMarker(marker: mapboxgl.Marker){

    this.map.flyTo(
      {
        center: marker.getLngLat()
      }
    );
  }

  SaveMarkersLocalStorage(){

    const lnglatArr: markerColor[] = [];

    this.markers.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker.getLngLat();

      lnglatArr.push(
        {
          color: color,
          center: [lng, lat]
        }
      );
    });

    localStorage.setItem('markers', JSON.stringify(lnglatArr));

  }

  GetLocalStorage(){
    if(!localStorage.getItem('markers')){
      return;
    }

    const lnglatArr: markerColor[] = JSON.parse(localStorage.getItem('markers'));

    lnglatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker(
        {
          color: m.color,
          draggable: true
        }
      )
      .setLngLat(m.center)
      .addTo(this.map);

      this.markers.push(
        {
          marker: newMarker,
          color: m.color
        }
      )

      newMarker.on('dragend', () => {
        this.SaveMarkersLocalStorage();
      });
    })
    console.log(lnglatArr);
  }

  DeleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.SaveMarkersLocalStorage();
  }

}
