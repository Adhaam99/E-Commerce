import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      { path: 'login', component: LoginComponent,title:'SignIn' },

      { path: 'register', component: RegisterComponent,title:'SignUp' },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent,title:'Home' },
      { path: 'products', component: ProductsComponent,title:'Products' },
      { path: 'brands', component: BrandsComponent,title:'Brands' },
      { path: 'categories', component: CategoriesComponent,title:'Categories' },
      { path:'wishlist',component:WishlistComponent,title:'Wishlist'},
      { path: 'cart', component: CartComponent,title:'Cart' },

    ],
  },

  { path: '**', component: NotfoundComponent,title:'NotFound' },
];
