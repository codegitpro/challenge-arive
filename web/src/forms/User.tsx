import React from "react";
import { useFormik } from "formik";
import cx from "clsx";
import { Button } from "@this/components";
import { userValidationSchema } from "@this/validators";

export interface UserFormData {
    name: string;
}

export interface UserFormProps extends UserFormData {
    className?: string;
    userId?: string;
    editMode?: boolean;
    onSubmit: (values: UserFormData) => void;
    onEdit: () => void;
    onCancel: () => void;
    onDelete?: () => void;
    onSelect?: () => void;
}

export const UserForm = React.memo((props: UserFormProps) => {
    const formik = useFormik<UserFormData>({
        initialValues: {
            name: props.name,
        },
        validationSchema: userValidationSchema,
        // @ts-ignore
        onSubmit: (values, { setSubmitting }) => {
            console.log("call onSubmit");
            setSubmitting(false);
            props.onSubmit(values);
        },
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="body" onClick={props.onSelect}>
                <input
                    className={cx({ error: formik.touched.name && Boolean(formik.errors.name) })}
                    name="name"
                    disabled={!props.editMode}
                    placeholder="user name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className="action">
                {props.editMode ? (
                    <React.Fragment>
                        <Button onClick={props.onCancel}>Cancel</Button>
                        <Button className="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                            {!props.userId ? "Create" : "Update"}
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Button className="primary" onClick={props.onEdit}>
                            Edit
                        </Button>
                        <Button className="danger" onClick={props.onDelete}>
                            Delete
                        </Button>
                    </React.Fragment>
                )}
            </div>
        </form>
    );
});
