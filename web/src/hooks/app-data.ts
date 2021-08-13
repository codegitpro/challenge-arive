import { createContext, useContext } from "react";

export interface AppDataContext {
    activeUserId: string;
    setActiveUserId: (id: string) => void;
    loadAppData: () => void;
}

export const AppDataContext = createContext<AppDataContext>({} as AppDataContext);

export const useAppDataContext = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error("App components are compound component. Must be used inside App.");
    }
    return context;
};
