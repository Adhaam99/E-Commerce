import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Categories } from '../../core/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { OnSalePipe } from '../../core/pipes/on-sale.pipe';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';
import { IWishProduct } from '../../core/interfaces/iwish-product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    UpperCasePipe,
    CurrencyPipe,
    OnSalePipe,
    TrimTextPipe,
    FormsModule,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  allProducts: Product[] = [];
  allCategories: Categories[] = [];
  userWishList: IWishProduct[] = [];
  getAllProducts!: Subscription;
  getAllCategories!: Subscription;
  addProductToCartApi!: Subscription;
  addToWishlistApi!: Subscription;
  getUserWishlistApi!: Subscription;

  @ViewChildren('heart') hearts!: QueryList<ElementRef>;

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    margin: 12,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  getProduct = () => {
    this.getAllProducts = this._ProductsService.getProducts().subscribe({
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

  getCategories = () => {
    this.getAllCategories = this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
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
        console.log(res);
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

  getUserWishlist = () => {
    this.getUserWishlistApi = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.getProduct();
    this.getCategories();
    this.getUserWishlist();
  }

  ngOnDestroy(): void {
    this.getAllProducts?.unsubscribe();
    this.getAllCategories?.unsubscribe();
    this.addProductToCartApi?.unsubscribe();
    this.addToWishlistApi?.unsubscribe();
  }
}
