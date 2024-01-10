// src/store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  viewMode: "board",
  lastView: null,
  selectedGroup: null,
  selectedTask: null,
  groups: [],
  tasks: [],
};

function appReducer(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case "TOGGLE_VIEW":
      return {
        ...state,
        viewMode: action.payload,
      };
    case "FETCH_TASKS_SUCCESS":
      nextState = {
        ...state,
        tasks: action.payload,
      };
      localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
      return nextState;
    case "FETCH_TASKS_AND_GROUPS_SUCCESS":
      return {
        ...state,
        groups: action.payload,
      };
    case "SET_GROUPS":
      nextState = {
        ...state,
        groups: action.payload,
      };
      localStorage.setItem("groups", JSON.stringify(nextState.groups));
      return nextState;
    case "SET_SELECTED_GROUP":
      return {
        ...state,
        selectedGroup: action.payload,
      };
    case "SET_SELECTED_TASK":
      return {
        ...state,
        selectedTask: action.payload,
      };
    case "SET_LAST_VIEW":
      return {
        ...state,
        lastView: action.payload,
      };
    case "CREATE_GROUP_SUCCESS":
      return {
        ...state,
        groups: [...state.groups, action.payload]
      };
    case "CREATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case "UPDATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "UPDATE_GROUP_SUCCESS":
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.id
            ? { ...group, ...action.payload }
            : group
        ),
      };

      case "DELETE_GROUP_SUCCESS":
        return {
          ...state,
          groups: state.groups.filter(group => group.id !== action.payload.id),
        };

    default:
      return state;
  }
}

const store = configureStore({
  reducer: appReducer,
  // Middleware like thunk and devtools are automatically included
});

export default store;
