import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
	signInRequest,
	signInResponse,
	signUpRequest,
} from "../../models/auth-models";

@Injectable({
	providedIn: "root",
})
export class AuthServiceService {
	signInUser(request: signInRequest): Observable<signInResponse> {
		return of<signInResponse>({
			id: "1",
			jwtToken: "1",
		});
	}
	signUpUser(request: signUpRequest): Observable<string> {
		return of<string>("success");
	}
}
