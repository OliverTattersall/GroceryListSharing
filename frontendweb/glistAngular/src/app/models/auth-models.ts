export interface signInResponse {
	id: string;
	jwtToken: string;
}

export interface signInRequest {
	email: string;
	password: string;
}

export interface signUpRequest {
	username: string;
	email: string;
	password: string;
}
