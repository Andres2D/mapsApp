import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-tiny-map',
  templateUrl: './tiny-map.component.html',
  styleUrls: ['./tiny-map.component.css']
})
export class TinyMapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('map', {static: true}) divMap: ElementRef;

  constructor() { }

  ngAfterViewInit(){

    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(map);
  }

}
