import React from "react";
import { UsersPanel, HobbyPanel } from "@this/components";
import { AppDataContext } from "@this/hooks";
import { BackendService } from "@this/services";
import "./Home.css";

export const HomePage = React.memo(() => {
    const [data, loadData] = React.useState<Array<User>>([]);
    const [activeUserId, setActiveUserId] = React.useState<string>();

    const activeUserData = React.useMemo(() => {
        const targetUserData = data.find((item) => item._id === activeUserId);
        return targetUserData || ({} as User);
    }, [activeUserId, data]);

    const handleUserSelect = React.useCallback((userId: string) => {
        setActiveUserId(userId);
    }, []);

    const fetchData = React.useCallback(async () => {
        const data = await BackendService.getUserList();
        loadData(data);
    }, []);

    React.useEffect(() => {
        fetchData();
    }, []);

    const context = React.useMemo(
        () => ({
            activeUserId: activeUserId || "",
            setActiveUserId: handleUserSelect,
            loadAppData: fetchData,
        }),
        [activeUserId, setActiveUserId, fetchData],
    );

    return (
        <AppDataContext.Provider value={context}>
            <div className="home-page">
                <h1 className="title">Arive</h1>
                <div className="content">
                    <div className="left">
                        <h4>Users</h4>
                        <UsersPanel data={data || []} />
                    </div>
                    <div className="right">
                        <h4>hobbies</h4>
                        <HobbyPanel data={activeUserData.hobbies || []} />
                    </div>
                </div>
            </div>
        </AppDataContext.Provider>
    );
});
