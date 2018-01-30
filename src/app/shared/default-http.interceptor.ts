import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from "primeng/components/common/api";
import { user, service } from "gianpasqualini-platform-data";

@Injectable()
export class DefaultHttpInterceptor implements HttpInterceptor {
    constructor(
        private messageService: MessageService,
    ) { }

    intercept(originalReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        return Observable.forkJoin(
            Observable.fromPromise(service.getRestUrl()),
            Observable.fromPromise(user.getAuthHeader()),
        ).flatMap((values: any) => {
            const [bridgeUrl, authHeader] = values;
            let finalUrl;
            if (!originalReq.url.startsWith("http")){
                finalUrl = bridgeUrl + originalReq.url
            }else{
                finalUrl = originalReq.url
            }
            const request = originalReq.clone({
                url: finalUrl,
                headers: originalReq.headers.set("Authorization", authHeader),
            });

            return this.getHandlerObservable(request, next);
        });
    
    }

    getHandlerObservable(request: HttpRequest<any>, next: HttpHandler) {
        return next
            .handle(request)
            .catch((err: HttpErrorResponse) => {
                if (err.status) {
                    this.messageService.add({
                        severity: "error",
                        summary: String(err.status),
                        detail: err.error.message || err.statusText || "Error",
                    });
                }

                return Observable.throw(err);
            });
    }
}
