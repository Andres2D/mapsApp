import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy  {

  @ViewChild('map', {static: false}) divMap: ElementRef;
  map: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-75.5776713942151, 6.281109732184157];

  constructor() {}

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', () => {
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', () => {
      if(this.map.getZoom() > 18){
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (event) => {
      const { lng, lat } = event.target.getCenter();
      this.center = [lng, lat];
    });
  }

  ZoomIn(){
    this.map.zoomIn();
  }

  ZoomOut(){
    this.map.zoomOut();
  }

  ZoomChange(zoom: string){
    this.map.zoomTo(Number(zoom));
  }

  ngOnDestroy(){
    this.map.off('zoom', () =>{});
    this.map.off('zoomend', () =>{});
    this.map.off('move', () =>{});
  }

}
