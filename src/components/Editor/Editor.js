import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import tasks, { addTask, loadTasksFromLocal } from "./tasksSlice";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import { useDispatch } from "react-redux";
import { Task } from "../index";
import styles from "./Editor.module.scss";

const Editor = () => {
  const dispatch = useDispatch();
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const localContent = JSON.parse(localStorage.getItem("content")) || [
    {
      type: "paragraph",
      children: [{ text: "" }]
    }
  ];
  const [value, setValue] = useState(localContent);

  // Load content from localStorage if it exists
  useEffect(() => {
    dispatch(loadTasksFromLocal(localContent));
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      default:
        return <Task {...props} />;
    }
  }, []);

  return (
    <div className={styles.container}>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          setValue(value);
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }}
      >
        <Editable
          renderElement={renderElement}
          placeholder="Get to work…"
          autoFocus
          onKeyDown={event => {
            switch (event.key) {
              case event.shiftKey && "Enter":
                break;
              case "Enter":
                break;
              case "Tab":
                const element = {
                  type: "bulleted-list",
                  children: [{ children: [{ text: "" }], type: "list-item" }]
                };
                Transforms.insertNodes(editor, element);
                dispatch(addTask("tab"));
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default Editor;
