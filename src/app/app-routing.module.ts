import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components for routes
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found/page-not-found.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar/sidebar.component';

import { UserRegistraionComponent } from './features/user-management/user-registration/user-registraion/user-registraion.component';
import { UserlistComponent } from './features/user-management/list/userlist/userlist.component';
import { UserUpdateComponent } from './features/user-management/user-update/user-update/user-update.component';


import { OrderCreationComponent } from './features/order-management/order-creation/order-creation/order-creation.component';
import { OrderListComponent } from './features/order-management/order-list/order-list/order-list.component';


import { AuthGuard } from './core/guards/core/guards/auth.guard';
import { ProductCategoryAddComponent } from './features/inventory/product-category-add/product-category-add.component';
import { ProductCategoryViewAllComponent } from './features/inventory/product-category-view-all/product-category-view-all.component';


const routes: Routes = [
  // Redirect root to login by default
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login route
  { path: 'login', component: LoginComponent },

  // Protected routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'SidebarComponent', component: SidebarComponent},
      { path: 'dashboard', component: DashboardComponent },
      {path: 'user-management/user-registration', component: UserRegistraionComponent},
      { path: 'user-management/list', component: UserlistComponent },
      { path: 'user-management/user-update/:id', component: UserUpdateComponent },
     {path: 'order-management/order-creation', component: OrderCreationComponent},
     {path: 'order-management/order-list', component: OrderListComponent},
     {path: 'inventory/product-category-add', component: ProductCategoryAddComponent},
     {path: 'inventory/product-category-view-all', component: ProductCategoryViewAllComponent},

    ],
   
  },

  { path: '**', component: PageNotFoundComponent }
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
