import React, { useState } from "react";

const Task = props => {
  // const [task, setTask] = useState(
  //   JSON.parse([
  //     {
  //       type: "task",
  //       children: [{ text: "A line of text in a paragraph.", subTasks: [] }]
  //     }
  //   ])
  // );

  console.log("Task props: ", props);
  const isSubtask = props.element.type === "list-item";
  return isSubtask ? (
    <li {...props.attributes}>{props.children}</li>
  ) : (
    <ul>
      <li {...props.attributes}>{props.children}</li>
    </ul>
  );
};

export default Task;
