import { createSlice } from "@reduxjs/toolkit";

let nextTaskId = 0;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {},
  reducers: {
    addTask: {
      reducer(state, action) {
        console.log(action);
        const { id, text } = action.payload;
        // state.push({ id, text, completed: false });
        state[id] = { id, text, completed: false };
      },
      prepare(text) {
        return { payload: { text, id: nextTaskId++ } };
      }
    },
    loadTasksFromLocal: {
      reducer(state, action) {
        console.log("loadTasksFromLocal", action.payload);
        action.payload.forEach(task => {
          state[nextTaskId] = {
            id: nextTaskId,
            task,
            completed: false
          };
          nextTaskId++;
        });
      }
    },
    removeTask(state, action) {
      const { id, text } = action.payload;
      state.push({ id, text, completed: false });
    }
  }
});

export const { addTask, removeTask, loadTasksFromLocal } = tasksSlice.actions;

// TODO: async
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectTasks = state => state.tasks.value;

export default tasksSlice.reducer;
