import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { provideState, provideStore } from "@ngrx/store";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { RequestInterceptor } from "./request-interceptor";
import { provideEffects } from "@ngrx/effects";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideStore(),
		// provideState(), // usefor reducers
		provideEffects(),
		provideHttpClient(withInterceptors([RequestInterceptor])),
	],
};
