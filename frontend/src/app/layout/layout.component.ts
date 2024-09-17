import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'  ,
  
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
})
export class LayoutComponent {
  title = 'principal';
}
