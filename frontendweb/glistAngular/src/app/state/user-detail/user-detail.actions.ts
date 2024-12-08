import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { signInRequest, signInResponse } from "src/app/models/auth-models";

export const userDetailActions = createActionGroup({
	source: "User Detail",
	events: {
		"[User Detail] Begin Sign In": props<{ request: signInRequest }>(),
		"[User Detail] Success Sign In": props<{ response: signInResponse }>(),
		"[User Detail] Error Sign In": props<{ error: any }>(),
		"[User Detail] Get User Details": emptyProps(),
	},
});
