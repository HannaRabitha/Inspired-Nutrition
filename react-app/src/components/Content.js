import { Link } from "react-router-dom";
import classes from "./Content.module.scss";
import data from "../data/content.json";

export default function Content() {
  const dataContent = data;

  return (
    <>
      <h1 className={classes.content__title}>More Reading</h1>
      {dataContent.map((item) => (
        <div key={item.id} className={classes.content__items}>
          <div className={classes.content__square}>{item.id}</div>
          <Link to={item.path}>{item.title}</Link>
        </div>
      ))}
    </>
  );
}
