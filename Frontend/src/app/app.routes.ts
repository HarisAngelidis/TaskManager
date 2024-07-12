import { HomeComponent } from './menu/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { MyTasksComponent } from './menu/myttasks/myttasks.component';
import { ProfileComponent } from './menu/profile/profile.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { UsersComponent } from './menu/users/users.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {   
        path: 'login', component: LoginComponent
    },

    {
        path: 'menu',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'tasks', component: MyTasksComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'users', component: UsersComponent }
          //{ path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
      },
       {
        path: 'signup', component: SignupComponent
    }

   
];
