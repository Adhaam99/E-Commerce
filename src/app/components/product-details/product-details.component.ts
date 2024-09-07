import { Product } from './../../core/interfaces/product';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { ProductDetails } from '../../core/interfaces/product-details';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  productIdSub!: Subscription;
  productDetails: ProductDetails | null = null;

  customOptionsImg: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    autoplayHoverPause:true,
    margin:12,
    dots: true,
    navSpeed: 2000,
    navText: ['', ''],
    items:1,
    nav: false
  }

  getProductId(): void {
    this.productIdSub = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let ProductId = p.get('id');

        this._ProductsService.getSpecificProduct(ProductId).subscribe({
          next: (res) => {
            this.productDetails = res.data
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getProductId();
  }

  ngOnDestroy(): void {
    this.productIdSub.unsubscribe();
  }
}
