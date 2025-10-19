import { inject } from "@angular/core";
import { CanActivateFn, Route, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Role } from "../enums/Role";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    if (state.url.includes('/login') || state.url.includes('/register')) {
        return true;
    }

    if(!authService.isLoggedIn() || !token) {
        return router.createUrlTree(['/login']);
    }
    const role = getUserRoleFromToken(token);
    const reqRoles = getRequiredRolesForRoute(state.url);

    if(reqRoles.length === 0 || reqRoles.includes(role)) {
        return true;
    } else {
        return redirectBasedOnRole(role, router);
    }
    
};

function getUserRoleFromToken(token: string): Role {
    try {
        const payload = token.split('.')[1];
        const decodePayload = atob(payload);
        const value = JSON.parse(decodePayload);
        return value.role as Role;
    } catch(error) {
        console.error("Error decoding jwt token", error);
        return Role.ADMIN;
    }
}

function getRequiredRolesForRoute(url: string): Role[] {
    if(url.includes('/admin')) {
        return [Role.ADMIN];
    } else if(url.includes('/manager')) {
        return [Role.MANAGER];
    } else if(url.includes('/operator')) {
        return [Role.OPERATOR];
    } else if (url.includes('/vehicles') || url.includes('/manufacturer') || url.includes('/users')) {
        return [Role.ADMIN, Role.MANAGER, Role.OPERATOR];
    }

    return [];
}

function redirectBasedOnRole(role: Role, router: Router) {
    switch(role) {
        case Role.ADMIN: 
            return router.createUrlTree(['/admin']);
        case Role.MANAGER:
            return router.createUrlTree(['/manager']);
        default:
            return router.createUrlTree(['/login']);
    }
}