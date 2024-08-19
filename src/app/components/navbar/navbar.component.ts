import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(private _FlowbiteService:FlowbiteService){}

  ngOnInit(): void {
    
    this._FlowbiteService.loadFlowbite( ()=>{} )
  }

}
