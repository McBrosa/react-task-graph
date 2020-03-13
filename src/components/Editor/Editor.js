import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Transforms, Editor as sEditor } from "slate";
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
    console.log("State value: ", value);
  }, [value]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      default:
        return <Task {...props} />;
    }
  }, []);

  const handleOnKeyDown = event => {
    switch (event.key) {
      case event.shiftKey && "Enter":
        break;
      case event.shiftKey && "Delete":
      case event.shiftKey && "Backspace":
        sEditor.deleteBackward(editor, { unit: "block" });
      case "Enter":
        break;
      case "Tab":
        const element = {
          type: "bulleted-list",
          children: [{ children: [{ text: "" }], type: "list-item" }],
          focus: { offset: 0, path: editor.marks }
        };
        Transforms.insertNodes(editor, element);
        dispatch(addTask("tab"));
    }
  };

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
          onKeyDown={handleOnKeyDown}
        />
      </Slate>
    </div>
  );
};

export default Editor;
