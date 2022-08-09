import React from "react";
import Auth from "../pages/Login";
import Contact from "../pages/Contact";

export interface IRoute {
    path: string;
    element: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    CONTACT = "/",
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, element: Auth}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.CONTACT, exact: true, element: Contact}
]








