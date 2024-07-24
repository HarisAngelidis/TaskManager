import { HomeComponent } from './menu/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { MyTasksComponent } from './menu/myttasks/myttasks.component';
import { NotificationsComponent } from './menu/notifications/notifications.component';
import { ProfileComponent } from './menu/profile/profile.component';
import { ResetPassComponent } from './pages/reset-pass/reset-pass.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { TaskComponent } from './menu/task/task.component';
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
          { path: 'users', component: UsersComponent },
          { path: 'notifications', component: NotificationsComponent },
          { path: 'task/:id', component: TaskComponent },
          
          //{ path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
      },
       {
        path: 'signup', component: SignupComponent
    }
,
    {
        path: 'reset-password', component: ResetPassComponent
    }

   
];
