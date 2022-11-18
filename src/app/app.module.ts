import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DialogAnimationsExampleDialog, SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './services/auth.service';
import { UserServices } from './services/user.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from './material/material.module';
import { CartComponent } from './cart/cart.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { UserHomeFoodCardComponent } from './home/user-home-food-card/user-home-food-card.component';
import { CartServices } from './services/cart.service';
import { UserOrderServices } from './services/user-order.service';
import { NoItemsComponent } from './no-items/no-items.component';
import { FoodServices } from './services/food.service';
import { SortPipe } from './shared/sort.pipe';
import { UserOrderComponent } from './user-orders/user-order/user-order.component';
import { AdminComponent } from './admin/admin.component';
import { AddFoodComponent } from './admin/add-food/add-food.component';
import { DeleteFoodComponent } from './admin/admin-foods/delete-food/delete-food.component';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotificationService } from './services/notification/notification.service';
import { AdminFoodsComponent } from './admin/admin-foods/admin-foods.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminOrderComponent } from './admin-orders/admin-order/admin-order.component';
import { AdminOrderServices } from './services/admin-order.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    title: 'Cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    title: 'Orders',
    component: UserOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    title: 'Admin | Foods',
    component: AdminComponent,
    children: [
      {
        path: 'foods',
        component: AdminFoodsComponent,
        children: [
          {
            path: 'addFood',
            component: AddFoodComponent,
          },
          {
            path: 'editFood/:id',
            component: AddFoodComponent,
          },
          {
            path: 'deleteFood/:id',
            component: DeleteFoodComponent,
          },
        ],
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        title: 'Admin | Orders',
        component: AdminOrdersComponent,
        children: [
          {
            path: ':id',
            component: AdminOrderComponent,
          },
        ],
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'page-not-found',
    title: 'Page not found',
    component: PageNotFoundComponent,
  },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddFoodComponent,
    CartComponent,
    DeleteFoodComponent,
    AdminFoodsComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserNavBarComponent,
    DialogAnimationsExampleDialog,
    UserOrdersComponent,
    MainNavBarComponent,
    UserHomeFoodCardComponent,
    NoItemsComponent,
    SortPipe,
    UserOrderComponent,
    AdminNavBarComponent,
    AdminOrdersComponent,
    AdminOrderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    

    
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserServices,
    FoodServices,
    AdminOrderServices,
    CartServices,
    UserOrderServices,
    NotificationService,
    AdminFoodsComponent,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [
    AddFoodComponent,
    DeleteFoodComponent,
    AdminOrderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
