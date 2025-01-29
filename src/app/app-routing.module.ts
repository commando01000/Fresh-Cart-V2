import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'blank',
    loadComponent: () => import('./layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
      { path: 'products', loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
      { path: 'not-found', loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' },
      { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'not-found', loadComponent: () => import('./components/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' },
      { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
