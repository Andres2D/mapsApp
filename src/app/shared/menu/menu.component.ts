import { Component } from '@angular/core';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuItems: MenuItem[] = [
    {
      route: '/map/fullscreen',
      name: 'FullScreen'
    },
    {
      route: '/map/zoom-range',
      name: 'Zoom Range'
    },
    {
      route: '/map/marks',
      name: 'Marks'
    },
    {
      route: '/map/properties',
      name: 'Properties'
    }
  ];

}
