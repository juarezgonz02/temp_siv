export interface MenuCategory {
    title: string;
    options: MenuOption[];
};

export interface MenuOption{
    title: string;
    path: string;
    selected: boolean;
}