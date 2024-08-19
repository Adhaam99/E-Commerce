import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  allProducts: Product[] = [];
  
  constructor(private _ProductsService: ProductsService) {}

  getProduct = () => {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data;
      },

      error: (err) => {
        console.log(err);
      },

      complete: () => {
        console.log('complete');
      },
    });
  };

  ngOnInit(): void {
    this.getProduct();
  };
}
