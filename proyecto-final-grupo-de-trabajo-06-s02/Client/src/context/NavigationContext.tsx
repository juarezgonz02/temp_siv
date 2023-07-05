import { createContext, Dispatch, SetStateAction, useState } from "react"

interface ContextValues {
    showSidebar: boolean;
    setShowSidebar: Dispatch<SetStateAction<boolean>>;
};

interface ComponentProps {
    children: React.ReactNode;
}

export const NavigationContext = createContext<ContextValues>({ showSidebar: false, setShowSidebar: () => { } });

const NavigationContextProvider = ({ children }: ComponentProps) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const store: ContextValues = {
        showSidebar,
        setShowSidebar
    }
    return (
        <NavigationContext.Provider value={store}>
            {children}
        </NavigationContext.Provider>
    );
};


export default NavigationContextProvider;