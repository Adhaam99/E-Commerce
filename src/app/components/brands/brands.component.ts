import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  
  allBrands:Brands[]=[];

  constructor(private _BrandsService: BrandsService) {}

  getBrands = (): void => {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allBrands=res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void { 
    this.getBrands()
  }
}
