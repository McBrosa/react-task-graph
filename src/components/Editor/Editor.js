import React, { useEffect, useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import tasks, { addTask, removeTask } from "./tasksSlice";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import { useDispatch } from "react-redux";
import { Task } from "../index";

const Editor = () => {
  const dispatch = useDispatch();
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("content")) || [
      {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }]
      }
    ]
  );

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      default:
        return <Task {...props} />;
    }
  }, []);

  return (
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
        onKeyDown={event => {
          if (event.key === "Enter") {
            dispatch(addTask(value[value.length - 1].children.text));
          } else if (event.key === "Tab") {
            dispatch(addTask("tab"));
          }
        }}
      />
    </Slate>
  );
};

export default Editor;
