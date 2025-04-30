import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "@reduxjs/toolkit";

const initialValues = {
  name: "",
  number: "",
};

const ContactFormShema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{2,3}[-.\s]?\d{2,4}$/,
      "Invalid phone number format"
    )
    .required("Required"),
});

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();
  const handleAddContact = (data) => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    dispatch(addContact(newContact));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddContact}
        validationSchema={ContactFormShema}
      >
        <Form className={css.form}>
          <div className={css.inputField}>
            <label className={css.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.field}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Andrii Semenenko"
            />{" "}
          </div>
          <ErrorMessage name="name" component="div" className={css.error} />

          <div className={css.inputField}>
            <label htmlFor={numberFieldId} className={css.label}>
              Number
            </label>
            <Field
              className={css.field}
              type="text"
              name="number"
              id={numberFieldId}
              placeholder="372-05-18"
            />
          </div>
          <ErrorMessage name="number" component="div" className={css.error} />
          <div className={css.btnbox}>
            <button type="submit" className={css.btn}>
              Add contact
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
