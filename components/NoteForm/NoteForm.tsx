"use client";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { NewNote } from "../../types/note";

interface OrderFormValues {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
const initialValues: OrderFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};
const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Too Long!")
    .required("Назва є обов’язковою")

    .min(3, "Назва повинна містити принаймні 3 символи"),

  content: Yup.string().max(500, "Too Long!").nullable(),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Тег є обов’язковим"),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const fieldId = useId();
  const { mutate, isPending } = useMutation({
    mutationFn: async (newNote: NewNote) => {
      return createNote(newNote);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });
  const handleSubmit = async (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // ИСПРАВЛЕНИЕ: Преобразуем OrderFormValues в NewNote,
    // гарантируя, что content всегда является строкой.
    const newNote: NewNote = {
      title: values.title,
      content: values.content || "", // Если undefined или null, используем пустую строку
      tag: values.tag,
    };

    mutate(newNote); // Теперь здесь передается объект типа NewNote
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => {
        return (
          <Form className={css.form}>
                       {" "}
            <div className={css.formGroup}>
                           {" "}
              <ErrorMessage name="title" component="p" className={css.error} /> 
                          <label htmlFor={`${fieldId}-title`}>Title</label>     
                     {" "}
              <Field
                id={`${fieldId}-title`}
                type="text"
                name="title"
                className={css.input}
              />
                         {" "}
            </div>
                       {" "}
            <div className={css.formGroup}>
                           {" "}
              <ErrorMessage
                name="content"
                component="p"
                className={css.error}
              />
                           {" "}
              <label htmlFor={`${fieldId}-content`}>Content</label>             {" "}
              <Field
                as="textarea"
                id={`${fieldId}-content`}
                name="content"
                rows={8}
                className={css.textarea}
              />
                         {" "}
            </div>
                       {" "}
            <div className={css.formGroup}>
                            <label htmlFor={`${fieldId}-tag`}>Tag</label>       
                   {" "}
              <ErrorMessage name="tag" component="p" className={css.error} />   
                       {" "}
              <Field
                as="select"
                id={`${fieldId}-tag`}
                name="tag"
                className={css.select}
              >
                                <option value="Todo">Todo</option>             
                  <option value="Work">Work</option>               {" "}
                <option value="Personal">Personal</option>               {" "}
                <option value="Meeting">Meeting</option>               {" "}
                <option value="Shopping">Shopping</option>             {" "}
              </Field>
                         {" "}
            </div>
                       {" "}
            <div className={css.actions}>
                           {" "}
              <button
                type="button"
                onClick={onClose}
                className={css.cancelButton}
              >
                                Cancel              {" "}
              </button>
                           {" "}
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting || !isValid || !dirty || isPending}
              >
                                {isSubmitting ? "Creating..." : "Create"}       
                     {" "}
              </button>
                         {" "}
            </div>
                     {" "}
          </Form>
        );
      }}
    </Formik>
  );
}
