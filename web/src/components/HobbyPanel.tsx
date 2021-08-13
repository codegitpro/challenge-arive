import React from "react";
import { Button } from "./Button";
import { HobbyPanelItem } from "./HobbyPanelItem";
import { useAppDataContext } from "@this/hooks";

export interface HobbyPanelProps {
    activeId?: string;
    data: Array<Hobby>;
}

export const HobbyPanel = React.memo((props: HobbyPanelProps) => {
    const { activeUserId } = useAppDataContext();
    const [active, setActive] = React.useState<boolean>(false);

    const handleAdd = React.useCallback(() => {
        setActive(true);
    }, []);

    const handleCancel = React.useCallback(() => {
        setActive(false);
    }, []);

    React.useEffect(() => {
        setActive(false);
    }, [activeUserId]);

    return (
        <React.Fragment>
            <div className="header">
                <span>Name</span>
                <span>Passion Level</span>
                <span>Year</span>
                <span>Action</span>
            </div>
            <div className="panel">
                {props.data.map((item) => (
                    <HobbyPanelItem key={item._id} hobbyId={item._id} data={item} />
                ))}
                {active ? (
                    <HobbyPanelItem editMode={true} onCancel={handleCancel} />
                ) : (
                    <div className="footer">
                        <Button className="add" disabled={!activeUserId} onClick={handleAdd}>
                            +
                        </Button>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
});
