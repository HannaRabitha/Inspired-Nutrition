import classes from "./Modal.module.scss";
import { useState, useEffect } from "react";

export default function EditComment({
  setShowModalEdit,
  data,
  updateCommentsHandler,
}) {
  // const initialValues = { id: data.id, message: data.msg };
  const initialValues = {
    id: data.id,
    author: data.author,
    avatar: data.avatar,
    date: data.date,
    message: data.message,
    point: data.point,
    replies: data.replies,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues, "FORMVALUES");
      updateCommentsHandler(formValues);
      console.log("DATA SUDAH DI UPDATE YEAY");
      setShowModalEdit(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.message) {
      errors.message = "Wajib diisi";
    }
    return errors;
  };

  return (
    <>
      <div className={classes.modal}>
        <div className={classes.modal__content}>
          <div className={classes.modal__header}>
            <h1>Edit Comment</h1>
            <button onClick={(e) => setShowModalEdit(false)}>X</button>
          </div>
          <div className={classes.modal__body}>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className={classes.message}
                  type="text"
                  name="message"
                  placeholder="message"
                  value={formValues.message}
                  // defaultValue={msg}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.message}</p>
              <button>Update Comment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
