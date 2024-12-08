import { Route } from "@angular/router";
import { ListsPageComponent } from "./pages/lists-page/lists-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";

export const appRoutes: Route[] = [
	{ path: "lists", component: ListsPageComponent },
	{ path: "profile", component: ProfilePageComponent },
];
