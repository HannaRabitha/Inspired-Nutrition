import classes from "./Modal.module.scss";
import { useState, useEffect } from "react";

export default function Login({ setShowModalLogin }) {
  const initialValues = { email: "", password: "" };
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
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Wajib diisi";
    } else if (!regex.test(values.email)) {
      errors.email = "Format email salah";
    }
    if (!values.password) {
      errors.password = "Wajib diisi";
    } else if (values.password.length < 4) {
      errors.password = "Password harus lebih dari 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password tidak dapat lebih dari 10 characters";
    }
    return errors;
  };

  return (
    <>
      <div className={classes.modal}>
        <div className={classes.modal__content}>
          <div className={classes.modal__header}>
            <h1>Login Form</h1>
            <button onClick={(e) => setShowModalLogin(false)}>X</button>
          </div>
          <div className={classes.modal__body}>
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="ui divider"></div>
                <div className="ui form">
                  <div className="field">
                    {/* <label>Email</label> */}
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.email}</p>
                  <div className="field">
                    {/* <label>Password</label> */}
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.password}</p>
                  <button className="fluid ui button blue">Login</button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className={classes.modal__footer}>FOOTER</div> */}
        </div>
      </div>
    </>
  );
}
