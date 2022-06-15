import classes from "./CommentForm.module.scss";
import { useState, useEffect } from "react";

export default function CommentForm({ addCommentsHandler }) {
  const initialValues = {
    author: "",
    avatar: "",
    date: "",
    message: "",
    point: 0,
    replies: [],
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
    getImg();
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      addCommentsHandler(formValues);
      console.log("DATA TERKIRIM!");
    }
  }, [formErrors]);

  function getImg() {
    const imgurl = [
      "https://picsum.photos/100",
      "https://placebeard.it/100x100",
      "https://www.fillmurray.com/100/100",
    ];
    const random = Math.floor(Math.random() * imgurl.length);
    const curDate = new Date();

    const date = curDate.toISOString();

    setFormValues({ ...formValues, avatar: imgurl[random], date: date });
    return imgurl[random];
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.author) {
      errors.author = "Wajib diisi";
    }
    // if (!values.email) {
    //   errors.email = "Wajib diisi";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "Format email salah";
    // }
    if (!values.message) {
      errors.message = "Wajib diisi";
    }
    return errors;
  };

  return (
    <>
      <div className={classes.commentform}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="author"
            placeholder="Name"
            value={formValues.author}
            onChange={handleChange}
          />

          <p>{formErrors.name}</p>

          <input
            className={classes.message}
            type="message"
            name="message"
            placeholder="Your Message"
            value={formValues.message}
            onChange={handleChange}
          />

          <p>{formErrors.message}</p>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
