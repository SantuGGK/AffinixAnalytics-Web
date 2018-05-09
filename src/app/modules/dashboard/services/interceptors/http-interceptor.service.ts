import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpErrorResponse, HttpResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { SharedService } from '@shared/services/shared.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  private _sharedService : SharedService;

  constructor(private _router: Router, inj: Injector) { 
    setTimeout(() => {
      this._sharedService = inj.get(SharedService);
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((err, source) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this._sharedService.refreshToken().concatMap(() => next.handle(
          req.clone({headers: req.headers.set('Authorization',  this._sharedService.getAccessToken())})
        ));
      } else {
        throw err;
      }
    });
  }
}
