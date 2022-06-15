import {
  faArrowDown,
  faArrowUp,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import classes from "./Comment.module.scss";
import EditComment from "./modals/EditComments";

export default function Comment({ data, getContactId, updateCommentsHandler }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [onEdit, setOnEdit] = useState(false);

  const deleteHandler = (id) => {
    console.log(id, "INI IDNYAAAA");
    getContactId(id);
  };

  const updateHandler = (comment) => {
    setShowModalEdit(true);
    console.log(comment, "INI DATANYAAA");
    setDataEdit(comment);
  };

  function editHandler() {
    onEdit ? setOnEdit(false) : setOnEdit(true);
  }

  function strToDate(strDate) {
    const [dateValues, timecoorValues] = strDate.split("T");
    const [timeValues, coordinate] = timecoorValues.split(".");
    const newDate = dateValues + " " + timeValues;
    return newDate;
  }

  return (
    <>
      <div className={classes.header}>
        <button
          className={classes.header__btnEdit}
          onClick={(e) => editHandler()}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      {data.map((comment, i) => (
        <div className={classes.comment} key={i}>
          <div className={classes.comment__image}>
            <img src={comment.avatar} alt="gambar" />
          </div>
          <div className={classes.comment__box}>
            <h1>{comment.author}</h1>
            <h4>{strToDate(comment.date)}</h4>
            <p>{comment.message}</p>

            <div className={classes.comment__box__updownvote}>
              <span>{comment.point} point</span>
              {onEdit ? (
                <>
                  <button
                    className={classes.buttonup}
                    onClick={(e) => updateHandler(comment)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className={classes.buttondown}
                    onClick={(e) => deleteHandler(comment.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              ) : (
                <>
                  <button className={classes.buttonup}>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                  <button className={classes.buttondown}>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                </>
              )}
            </div>

            <div>
              {comment.replies.map((rep, x) => (
                <div className={classes.comment} key={x}>
                  <div className={classes.comment__image}>
                    <img src={rep.avatar} alt="gambar" />
                  </div>
                  <div className={classes.comment__box}>
                    <h1>{rep.author}</h1>
                    <h4>{strToDate(rep.date)}</h4>
                    <p>{rep.message}</p>

                    <div className={classes.comment__box__updownvote}>
                      <span>{rep.point} point</span>
                      {onEdit ? (
                        <>
                          <button
                            className={classes.buttonup}
                            onClick={(e) => updateHandler(rep)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className={classes.buttondown}
                            key={rep.id}
                            onClick={(e) => deleteHandler(rep.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className={classes.buttonup}>
                            <FontAwesomeIcon icon={faArrowUp} />
                          </button>
                          <button className={classes.buttondown} key={rep.id}>
                            <FontAwesomeIcon icon={faArrowDown} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {showModalEdit ? (
        <EditComment
          setShowModalEdit={setShowModalEdit}
          data={dataEdit}
          updateCommentsHandler={updateCommentsHandler}
        />
      ) : null}
    </>
  );
}
