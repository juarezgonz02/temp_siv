import { MenuCategory, MenuOption } from "./MenuCategory";

export const CUSTOMER_MENU_CATEGORIES: MenuCategory[] = [
    {
        title: "Historial de Compras",
        options: [{
            title: "Ordenes",
            path: "/account/orders",
            selected: false
        },
        {
            title: "Ordenes Pasadas",
            path: "/account/pastOrders",
            selected: false
        }]
    },
    {
        title: "Perfil",
        options: [{
            title: "Mi Cuenta",
            path: "/account",
            selected: false
        }]
    }
];

export const LOGOUT_OPTION: MenuOption = {
    title: "Cerrar Sesión",
    path: "/login",
    selected: false
}
