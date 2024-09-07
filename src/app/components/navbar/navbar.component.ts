import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { WishlistService } from '../../core/services/wishlist.service';
import { IWishProduct } from '../../core/interfaces/iwish-product';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartData: ICart | null = null;
  wishlistData: IWishProduct[] | null = null;
  getUserCartApi!: Subscription;
  getUserWishlistApi!: Subscription;

  readonly _AuthService = inject(AuthService);
  private readonly _FlowbiteService = inject(FlowbiteService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  getUserCart = () => {
    this.getUserCartApi = this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
    });
  };

  getUserWishlist = () => {
    this.getUserWishlistApi = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        if (res.data.length != 0) {
          this.wishlistData = res.data;
          console.log(this.wishlistData);
        }
      },
    });
  };

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(() => {});
    this.getUserCart();
    this.getUserWishlist();
  }

  ngOnDestroy(): void {
    this.getUserCartApi?.unsubscribe();
    this.getUserWishlistApi?.unsubscribe();
  }
}
