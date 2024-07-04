import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
export const routes: Routes = [
    { path: '', redirectTo: '/catalog', pathMatch: 'full' },
    {path: 'catalog', component: CatalogComponent},
    {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'completed-orders', component: CompletedOrdersComponent, canActivate: [AuthGuard]}
];
