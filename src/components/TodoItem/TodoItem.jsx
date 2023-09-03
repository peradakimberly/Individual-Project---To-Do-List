import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaRegWindowClose,
} from "react-icons/fa";
import cx from "classnames";
import "./TodoItem.css";
import { deleteTodo, updateTodo } from "../../store/reducers/todos";

export default function TodoItem({ todo }) {
  const { id, title, text, state } = todo;
  // TODO: call useDispatch here to get access to dispatch function
  const dispatch = useDispatch();

  const [doneClicked, setDoneClicked] = useState(false);
  const [inProgressClicked, setInProgressClicked] = useState(false);
  const [textDecoration, setTextDecoration] = useState("");


  const onDeleteClick = useCallback(() => {
    // TODO: Dispacth corresponding action
    dispatch(deleteTodo(id));
  }, [dispatch, id]);

  const onDoneClick = useCallback(() => {
    // TODO: Dispacth corresponding action
    dispatch(updateTodo({ id, state: "done" }));
    setDoneClicked((prevDoneClicked) => !prevDoneClicked);
    setInProgressClicked(false);
    const textDecoration = doneClicked ? "" : "line-through";
    // const titleDecoration = doneClicked ? "" : "line-through";
    // const stateDecoration = doneClicked ? "" : "line-through";

    dispatch(updateTodo({ id, state: doneClicked ? "in progress" : "done" }));
    setTextDecoration(textDecoration);
    setTitleDecoration(textDecoration);
    setStateDecoration(textDecoration);
  }, [dispatch, id, doneClicked]);

  const onInProgressClick = useCallback(() => {
    // TODO: Dispacth corresponding action
    dispatch (updateTodo({ id, state: "in progress" }));
    setInProgressClicked((prevInProgressClicked) => !prevInProgressClicked);
    setDoneClicked(false);

    dispatch(updateTodo({ id, state: inProgressClicked ? "done" : "in progress",}));
  }, [dispatch, id, inProgressClicked]);

  const containerClassName = cx("todo-item-container", {
    "todo-item-done": state === "done",
  });

  const inProgressClassName = cx("todo-mark-in-progress", {
    "in-progress": state === "in progress" || inProgressClicked,
  });

  const doneClassName = cx("todo-mark-done", {
    done: state === "done" || doneClicked,
  });

  const textClassName = cx("todo-item-text", {
    "text-done": state === "done" || doneClicked,
  });

  const titleClassName = cx("todo-item-header", {
    "title-done": state === "done" || doneClicked,
  });

  const stateClassName = cx("todo-status", {
    "state-done": state === "done" || doneClicked,
  });

  return (
    <div className={containerClassName}>
      <div className="todo-item-header-container">
      <h2 className={titleClassName} style={{ textDecoration }}>
        {title}
      </h2>
        <FaRegWindowClose
          size={20}
          className="todo-item-cross"
          onClick={onDeleteClick}
        />
      </div>
      <p className={textClassName} style={{ textDecoration }}>{text}</p>
      <div className="todo-status-container">
      <div className={stateClassName} style={{ textDecoration }}>
        {state}
      </div>
        <FaHourglassHalf
          size={20}
          className={inProgressClassName}
          onClick={onInProgressClick}
        />
        <FaCheckCircle
          size={20}
          className={doneClassName}
          onClick={onDoneClick}
        />
      </div>
    </div>
  );
}
