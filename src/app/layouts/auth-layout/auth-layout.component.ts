import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAuthComponent } from "../../components/navbar-auth/navbar-auth.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
