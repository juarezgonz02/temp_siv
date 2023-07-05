export interface User {
    name: string;
    email: string;
    access?: string[];
}

export const DEFAULT_USER: User = {
    name: "",
    email: "",
};

export const MOCK_USER: User = {
    name: "Marcela Portillo",
    email: "marcela@portillo.com",
    access: ["Cliente", "Administrador de eventos", "Validar tickets", "Administrador", "Análisis empresarial"],
};