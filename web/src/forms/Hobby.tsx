import React from "react";
import { useFormik } from "formik";
import cx from "clsx";
import { Button } from "@this/components";
import { hobbyValidationSchema } from "@this/validators";
import { AppConstants, DateConstants } from "@this/constants";
import { DateUtil } from "@this/utils";

export interface HobbyFormData {
    name: string;
    passionLevel: PassionLevel;
    year: string;
}

export interface HobbyFormProps extends HobbyFormData {
    className?: string;
    editMode?: boolean;
    hobbyId?: string;
    onSubmit: (values: HobbyFormData) => void;
    onEdit: () => void;
    onCancel: () => void;
    onDelete: () => void;
}

export const HobbyForm = React.memo((props: HobbyFormProps) => {
    const formik = useFormik<HobbyFormData>({
        initialValues: {
            name: props.name,
            passionLevel: props.passionLevel,
            year: DateUtil.formatHobbyYear(props.year),
        },
        validationSchema: hobbyValidationSchema,
        onSubmit: (values, { setSubmitting }) => {
            const parsed = DateUtil.parseHobbyYear(values.year);
            setSubmitting(false);
            props.onSubmit({ ...values, year: parsed });
            props.onCancel();
        },
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <input
                className={cx({ error: formik.touched.name && Boolean(formik.errors.name) })}
                name="name"
                disabled={!props.editMode}
                placeholder="Hobby Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <select
                className={cx({ error: formik.touched.passionLevel && Boolean(formik.errors.passionLevel) })}
                name="passionLevel"
                disabled={!props.editMode}
                placeholder="Passionate Level"
                value={formik.values.passionLevel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                <option value="">please select</option>
                {AppConstants.passionLevel.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <input
                className={cx({ error: formik.touched.year && Boolean(formik.errors.year) })}
                name="year"
                type="date"
                value={formik.values.year}
                min={DateConstants.min}
                max={DateConstants.max}
                disabled={!props.editMode}
                placeholder="Year"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <div className="action">
                {props.editMode ? (
                    <React.Fragment>
                        <Button onClick={props.onCancel}>Cancel</Button>
                        <Button className="primary" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                            {!props.hobbyId ? "Create" : "Update"}
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
