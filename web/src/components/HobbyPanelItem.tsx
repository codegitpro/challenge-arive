import React from "react";
import { HobbyForm, HobbyFormData } from "@this/forms";
import { BackendService } from "@this/services";
import { useAppDataContext } from "@this/hooks";

export interface HobbyPanelItemProps {
    className?: string;
    hobbyId?: string;
    data?: HobbyFormData;
    editMode?: boolean;
    onCancel?: () => void;
}

export const HobbyPanelItem = React.memo((props: HobbyPanelItemProps) => {
    const { activeUserId, loadAppData } = useAppDataContext();
    const [editMode, setEditMode] = React.useState<boolean>(props.editMode || false);

    const handleEdit = React.useCallback(() => {
        console.log("call handleEdit");
        setEditMode(true);
    }, []);

    const handleSubmit = React.useCallback(
        async (data: HobbyFormData) => {
            if (props.onCancel) {
                props.onCancel();
            }
            if (props.hobbyId) {
                await BackendService.updateHobby({ ...data, _id: props.hobbyId });
            } else {
                await BackendService.createHobby(activeUserId, data);
            }
            await loadAppData();
        },
        [activeUserId, props],
    );

    const handleDelete = React.useCallback(async () => {
        if (props.hobbyId) {
            await BackendService.removeHobby(props.hobbyId);
            await loadAppData();
        }
    }, [props]);

    const handleCancel = React.useCallback(() => {
        setEditMode(false);
        if (props.onCancel) {
            props.onCancel();
        }
    }, [props]);

    return (
        <div className="panel-item">
            <HobbyForm
                editMode={editMode}
                hobbyId={props.hobbyId}
                name={props.data?.name || ""}
                passionLevel={props.data?.passionLevel || undefined}
                year={props.data?.year || ""}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
});
