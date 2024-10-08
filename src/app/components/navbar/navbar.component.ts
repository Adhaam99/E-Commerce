import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, NgClass, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCounter: number = 0;
  wishlistCounter: number = 0;
  getUserCartApi!: Subscription;
  getCartCounterApi!: Subscription;
  getUserWishlistApi!: Subscription;
  wishlistCounterApi!: Subscription;

  readonly _AuthService = inject(AuthService);
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _MyTranslateService = inject(MyTranslateService);

  getUserCart = () => {
    this.getUserCartApi = this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartCounter = res.numOfCartItems;
      },
    });
    this.getCartCounterApi = this._CartService.cartCounter.subscribe({
      next: (counter) => {
        this.cartCounter = counter;
      },
    });
  };

  getUserWishlist = () => {
    this.wishlistCounterApi = this._WishlistService.wishListCounter.subscribe({
      next: (counter) => {
        this.wishlistCounter = counter;
      },
    });
    this.getUserWishlistApi = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistCounter = res.data.length;
      },
    });
  };

  change = (lang: string) => {
    this._MyTranslateService.changeLang(lang);
  };

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(() => {});
    this.getUserCart();
    this.getUserWishlist();
  }

  ngOnDestroy(): void {
    this.getUserCartApi?.unsubscribe();
    this.getCartCounterApi?.unsubscribe();
    this.getUserWishlistApi?.unsubscribe();
    this.wishlistCounterApi?.unsubscribe();
  }
}
