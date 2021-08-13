import React from "react";
import cx from "clsx";
import { UserForm, UserFormData } from "@this/forms";
import { BackendService } from "@this/services";
import { useAppDataContext } from "@this/hooks";

export interface UserPanelItemProps {
    className?: string;
    data?: UserFormData;
    userId?: string;
    editMode?: boolean;
    active?: boolean;
    onSelect?: () => void;
    onRemove?: () => void;
}

export const UserPanelItem = React.memo((props: UserPanelItemProps) => {
    const { loadAppData } = useAppDataContext();
    const [editMode, setEditMode] = React.useState<boolean>(props.editMode || false);

    const handleEdit = React.useCallback(() => {
        setEditMode(true);
    }, [setEditMode]);

    const handleSubmit = React.useCallback(
        async (data: UserFormData) => {
            setEditMode(false);

            if (props.onRemove) {
                props.onRemove();
            }

            if (props.userId) {
                await BackendService.updateUser({ ...data, _id: props.userId });
            } else {
                await BackendService.createUser(data);
            }
            await loadAppData();
        },
        [props.onRemove, props.userId],
    );

    const handleDelete = React.useCallback(async () => {
        if (props.userId) {
            await BackendService.removeUser(props.userId);
            await loadAppData();
        }
    }, [props.userId]);

    const handleCancel = React.useCallback(() => {
        setEditMode(false);
        if (props.onRemove) {
            props.onRemove();
        }
    }, [props.onRemove]);

    return (
        <div className={cx("panel-item", { active: !!props.active })}>
            <UserForm
                userId={props.userId}
                editMode={editMode}
                name={props.data?.name || ""}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onDelete={handleDelete}
                onSelect={props.onSelect}
                onSubmit={handleSubmit}
            />
        </div>
    );
});
