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

  return (
    <ul>
      <li {...props.attributes}>{props.children}</li>
      {/* <ul>
        {props.children.subTasks.forEach(element => {
          <li>{element}</li>;
        })}
      </ul> */}
    </ul>
  );
};

export default Task;
