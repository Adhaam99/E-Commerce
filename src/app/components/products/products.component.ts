import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { WishlistService } from '../../core/services/wishlist.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [UpperCasePipe , CurrencyPipe , TrimTextPipe, NavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  getProductApi!:Subscription;
  addProductToCartApi!:Subscription;
  addToWishlistApi!:Subscription;

  

  private readonly  _ProductsService = inject(ProductsService)
  private readonly  _WishlistService = inject(WishlistService)
  private readonly  _CartService = inject(CartService)
  private readonly  _ToastrService = inject(ToastrService)

  getProduct = () => {
   this.getProductApi = this._ProductsService.getProducts().subscribe({
      next: (res) => {
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

  addProductToCart = (id: string) => {
    this.addProductToCartApi = this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product Added Successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  addToWishlist = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    this.addToWishlistApi = this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Product Added to Wishlist');
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.getProductApi?.unsubscribe()
    this.addProductToCartApi?.unsubscribe()
  }
};
