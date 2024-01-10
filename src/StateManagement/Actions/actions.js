// Action to toggle the view
export function toggleView(viewMode) {
  console.log("TOGGLE VIEW", viewMode);
  return {
    type: "TOGGLE_VIEW",
    payload: viewMode,
  };
}

// Action to store sorted groups
export function sortGroups(groups) {
  return {
    type: "SET_GROUPS",
    payload: groups,
  };
}

// Action to set the selected group
export function setSelectedGroup(group) {
  return {
    type: "SET_SELECTED_GROUP",
    payload: group,
  };
}

export function setSelectedTask(task) {
  return {
    type: "SET_SELECTED_TASK",
    payload: task,
  };
}

// Action to set the last view
export function setLastView(viewMode) {
  return {
    type: "SET_LAST_VIEW",
    payload: viewMode,
  };
}

// Async action to fetch groups
export function fetchGroupsData() {
  return async function (dispatch) {
    const url =
      "https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/get/groups";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data_str = await response.json();
      const data = data_str.data;
      dispatch({
        type: "FETCH_GROUPS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
}

export function fetchTasksData() {
  return async function (dispatch) {
    const tasksUrl =
      "https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/get/tasks";
    const groupsUrl =
      "https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/get/groups";
    const CACHE_DURATION = 3600000; // 1 hour

    // Check for cached data and timestamp
    const cachedDataStr = localStorage.getItem("cachedGroupsStr");
    const cacheTimestampStr = localStorage.getItem("groupsCacheTimestamp");
    const refetch = localStorage.getItem("refetch");

    if (cachedDataStr && refetch === "false") {
      const cacheTimestamp = parseInt(cacheTimestampStr);
      console.log("using cached data");
      // Check if the cache is still valid
      if (Date.now() - cacheTimestamp < CACHE_DURATION) {
        console.log("Using cached data");
        dispatch({
          type: "FETCH_TASKS_AND_GROUPS_SUCCESS",
          payload: JSON.parse(cachedDataStr),
        });
        return;
      } else {
        console.log("Cached data expired");
      }
    }

    try {
      // Fetch Tasks
      const tasksResponse = await fetch(tasksUrl);
      if (!tasksResponse.ok) {
        throw new Error(`HTTP error! Status: ${tasksResponse.status}`);
      }
      const tasksData = await tasksResponse.json();

      // Fetch Groups
      const groupsResponse = await fetch(groupsUrl);
      if (!groupsResponse.ok) {
        throw new Error(`HTTP error! Status: ${groupsResponse.status}`);
      }
      const groupsData = await groupsResponse.json();

      // Combine tasks and groups
      const combinedData = combineTasksAndGroups(
        tasksData.data,
        groupsData.data
      );

      // Update cache with new data and set timestamp
      localStorage.setItem("cachedGroupsStr", JSON.stringify(combinedData));
      localStorage.setItem("groupsCacheTimestamp", Date.now().toString());

      // Dispatch the action here with combined data
      dispatch({
        type: "FETCH_TASKS_AND_GROUPS_SUCCESS",
        payload: combinedData,
      });

      localStorage.setItem("refetch", "false");
    } catch (error) {
      console.error("Fetch error:", error);
      // Optionally dispatch a failure action here
    }
  };
}

function combineTasksAndGroups(tasks, groups) {
  const groupMap = {};

  // Add all groups to the map
  groups.forEach((group) => {
    groupMap[group.id] = { ...group, tasks: [] };
  });

  // Add tasks to their respective groups in the map
  tasks.forEach((task) => {
    // Check if the task's group is present in the groupMap
    if (task.groupDto && groupMap[task.groupDto.id]) {
      groupMap[task.groupDto.id].tasks.push({
        id: task.id,
        name: task.name,
        body: task.body,
      });
    }
    // Tasks with a group not in the groupMap are ignored
  });

  localStorage.setItem("refetch", "false");

  return Object.values(groupMap);
}

// Async action to create a task
export function createTask(taskData) {
  return async function (dispatch) {
    const url =
      "https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/post/tasks";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const createdTask = responseData.data;

      dispatch({
        type: "CREATE_TASK_SUCCESS",
        payload: createdTask,
      });

      // Refetch tasks to update the list
      dispatch(fetchTasksData());
      dispatch(toggleView("board"));
      localStorage.setItem("refetch", "true");
    } catch (error) {
      console.error("Create task error:", error);
    }
  };
}

// Async action to create a task
export function createGroup(groupData) {
  return async function (dispatch) {
    const url =
      "https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/post/groups";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const createdTask = responseData.data;

      dispatch({
        type: "CREATE_GROUP_SUCCESS",
        payload: createdTask,
      });

      // Refetch tasks to update the list
      dispatch(fetchTasksData());
      dispatch(toggleView("board"));
      localStorage.setItem("refetch", "true");
    } catch (error) {
      dispatch(toggleView("alert"));
      console.error("Create group error:", error);
    }
  };
}

export function updateTask(taskData) {
  return async function (dispatch) {
    const url = `https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/put/tasks/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch({
        type: "UPDATE_TASK_SUCCESS",
        payload: taskData,
      });

      dispatch(fetchTasksData());
      dispatch(toggleView("board"));
    } catch (error) {
      console.error("Update task error:", error);
    }
  };
}

export function deleteTask(taskData) {
  return async function (dispatch) {
    const url = `https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/delete/tasks`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch({
        type: "DELETE_TASK_SUCCESS",
        payload: taskData.id,
      });

      dispatch(fetchTasksData());
      dispatch(toggleView("board"));
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };
}

export function updateGroup(groupData) {
  return async function (dispatch) {
    console.log("trying");
    const url = `https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/put/groups`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("stil trying");

      console.log(updateGroup);

      dispatch({
        type: "UPDATE_GROUP_SUCCESS",
        payload: groupData,
      });

      dispatch(fetchTasksData());
      dispatch(toggleView("board"));
    } catch (error) {
      console.error("Update group error:", error);
    }
  };
}

export function deleteGroup(groupData) {
  return async function (dispatch) {
    const url = `https://jams-manager-2be71439fdcd.herokuapp.com/objectiveed/delete/groups/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch({
        type: "DELETE_GROUP_SUCCESS",
        payload: groupData.id,
      });

      dispatch(fetchTasksData());
      dispatch(toggleView("board"));
    } catch (error) {
      console.error("Delete group error:", error);
    }
  };
}
