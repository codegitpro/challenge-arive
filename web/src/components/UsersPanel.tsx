import React from "react";
import { Button } from "./Button";
import { UserPanelItem } from "./UserPanelItem";
import { useAppDataContext } from "@this/hooks";

export interface UsersPanelProps {
    data: Array<User>;
}

export const UsersPanel = React.memo((props: UsersPanelProps) => {
    const { activeUserId, setActiveUserId } = useAppDataContext();
    const [active, setActive] = React.useState<boolean>(false);

    const handleAdd = React.useCallback(() => {
        setActive(true);
    }, []);

    const handleRemove = React.useCallback(() => {
        setActive(false);
    }, []);

    const handleSelect = React.useCallback(
        (userId: string) => () => {
            setActiveUserId(userId);
        },
        [],
    );

    return (
        <React.Fragment>
            <div className="header">
                <span>Name</span>
                <span>Action</span>
            </div>
            <div className="panel">
                {props.data.map((item) => (
                    <UserPanelItem key={item._id} active={activeUserId === item._id} userId={item._id} data={item} onSelect={handleSelect(item._id)} />
                ))}
                {active ? (
                    <UserPanelItem editMode={true} onRemove={handleRemove} />
                ) : (
                    <div className="footer">
                        <Button className="add" onClick={handleAdd}>
                            +
                        </Button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
});
