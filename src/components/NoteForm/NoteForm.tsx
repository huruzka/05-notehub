import css from "./NoteForm.module.css"
import { Formik, Form, Field, ErrorMessage as FormikErrorMassage } from "formik";
import * as Yup from "yup";
import type { Note, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, type NewNote } from "../../components/services/noteService";

const validationSchema = Yup.object({
    titel: Yup.string()
        .min(3, "Minimum 3 characters required")
        .max(50, "Maximum 50 characters required")
        .required("Title is required"),
    content: Yup.string().max(500, "Too long. 500 characters required"),
    tag: Yup.mixed<NoteTag>()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
        .required("Tag is required")
});

const initialValues: NewNote = {
    title: "",
    content: "",
    tag: "Todo"
};

interface NoteFormProps{
    onCancel: () => void;
    onCreated?: (note: Note) => void;
}

function NoteForm({ onCancel, onCreated }: NoteFormProps) {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onCancel();
            onCreated?.(data);
        },
    });
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                createMutation.mutate(values);
                actions.resetForm();
            }}
        >
            {({ isValid }) => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            type="text"
                            className={css.input}
                        />
                        <FormikErrorMassage
                            name="title"
                            component="span"
                            className={css.error}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            id="content"
                            name="content"
                            rows={8}
                            className={css.textarea}
                        />
                        <FormikErrorMassage
                            name="content" className={css.error}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field
                            id="tag"
                            name="tag"
                            className={css.select}
                        >
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <FormikErrorMassage
                            name="tag"
                            className={css.error}
                        />
                    </div>

                    <div className={css.actions}>
                        <button type="button" className={css.cancelButton}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={!isValid || createMutation.isPending}
                        >
                            Create note
                            {createMutation.isPending ? "Creating..." : "Create note"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default NoteForm