import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}



@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,SidenavComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  
  
  toggleDropdown(event: any) {
    const desplegable = event.target.nextElementSibling;
    desplegable.classList.toggle('hidden');
  } 


}
