import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
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
};
