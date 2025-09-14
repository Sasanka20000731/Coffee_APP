import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/Header/header/header.component';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar/sidebar.component';
import { UserRegistraionComponent } from './features/user-management/user-registration/user-registraion/user-registraion.component';
import { LoginComponent } from './features/auth/login/login/login.component';
import { UserlistComponent } from './features/user-management/list/userlist/userlist.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found/page-not-found.component';
import { UserUpdateComponent } from './features/user-management/user-update/user-update/user-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductCategoryAddComponent } from './features/inventory/product-category-add/product-category-add.component';
import { ProductCategoryViewAllComponent } from './features/inventory/product-category-view-all/product-category-view-all.component';
import { OrderCreationComponent } from './features/order-management/order-creation/order-creation/order-creation.component';
import { OrderListComponent } from './features/order-management/order-list/order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UserRegistraionComponent,
    LoginComponent,
    UserlistComponent,
    PageNotFoundComponent,
    UserUpdateComponent,
    ProductCategoryAddComponent,
    ProductCategoryViewAllComponent,
    OrderCreationComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }