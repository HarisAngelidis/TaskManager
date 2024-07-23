import {
  HttpInterceptorFn,
} from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  //console.log("pernaei aithma");
  const authToken = localStorage.getItem('authToken');


  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

 
  return next(authReq);
};