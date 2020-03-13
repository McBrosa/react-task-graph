import React from "react";
import { Editor } from "./components";
import styles from "./App.scss";

function App() {
  return (
    <div className={styles}>
      <h2>Task List</h2>
      <Editor />
    </div>
  );
}

export default App;
