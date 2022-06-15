import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import Content from "../components/Content";
import api from "../api/comments";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

import "../styles/home.scss";

export default function Home() {
  const [dataComments, setDataComments] = useState([]);

  //fetch data comment (GET)
  const fetchComment = async () => {
    const res = await api.get("/comments");
    return res.data;
  };

  //post data comment (POST)
  const addCommentsHandler = async (comment) => {
    // console.log(comment, "INI COMMENT BARU");
    const request = {
      id: uuid(),
      ...comment,
    };

    const response = await api.post("/comments", request);
    // console.log(response, "INI RESPONSE");
    setDataComments([...dataComments, response.data]);
  };

  //update data comment (UPDATE)
  const updateCommentsHandler = async (comment) => {
    const response = await api.put(`/comments/${comment.id}`, comment);
    const { id, name, email } = response.data;
    setDataComments(
      dataComments.map((comment) => {
        return comment.id === id ? { ...response.data } : comment;
      })
    );
  };

  //delete data comment (DELETE)
  const removeContactHandler = async (id) => {
    await api.delete(`/comments/${id}`);
    const newCommentList = dataComments.filter((contact) => {
      return contact.id !== id;
    });

    setDataComments(newCommentList);
  };

  useEffect(() => {
    const getAllComments = async () => {
      const allComments = await fetchComment();
      if (allComments) setDataComments(allComments);
    };

    getAllComments();
  }, []);

  return (
    <>
      <div className="box">
        <div className="box-right">
          <h1 className="title">
            The Best Veggie Burger for Anybody and Everybody
          </h1>
          <p>
            What is a perfect veggie burger? That depends on how you like it:
            there are fans of burgers that are bean-based, nut-based,
            vegetable-packed and made with grains. Not every veggie-burger-lover
            loves every veggie burger. (Try saying that 10 times fast.) Some
            people want it to resemble meat, some like them nutty, and some
            focus on grill-ability. For each kind of veggie burger enthusiast,
            we rounded up the best recipes on the internet. Making your own
            veggie burger is not only really easy but it’s a great way to make
            sure your burger is chock full of real food. We added in a few
            supermarket options as well, although it’s worth keeping in mind
            they will almost always be more processed and use at least a few
            ingredients you wouldn’t find in a home kitchen. Make sure to check
            out the ingredient list! Now choose your style, and get cookin’!
          </p>
          <br />
          <img
            className="homeImage"
            src="https://foodprint.org/wp-content/uploads/2019/01/PinchofYum_CauliflowerBurgers-e1547138554705-1024x871.jpg"
          ></img>
          <h2>
            <span>Comments</span>{" "}
            {/* <button className="btnEdit" onClick={(e) => setOnEdit(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </button> */}
          </h2>
          <Comment
            data={dataComments}
            updateCommentsHandler={updateCommentsHandler}
            getContactId={removeContactHandler}
          />
          <h2>
            <span>Any Comment?</span>
          </h2>
          <CommentForm addCommentsHandler={addCommentsHandler} />
        </div>

        <div className="box-left">
          <Content />
        </div>
      </div>
    </>
  );
}
