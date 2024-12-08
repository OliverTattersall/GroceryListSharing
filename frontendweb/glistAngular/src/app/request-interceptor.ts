import { HttpInterceptorFn } from "@angular/common/http";

export const RequestInterceptor: HttpInterceptorFn = (req, next) => {
	console.log(req);
	return next(req);
};
