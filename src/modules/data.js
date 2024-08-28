import {
  ALL_TASKS,
  CUSTOM_TASKS,
  REPETITIVE_TASKS,
  TASK_CODES,
  createTaskListItem,
  createMatrixAreaListITem,
} from "./content";
import { updateCurrentTasksCount, checkEmptyTasksArea } from "./helpers";

export function updateLocalStorageForTaskData(newTaskObject, newTaskCategory) {
  ALL_TASKS.push(newTaskObject);

  newTaskCategory === "Custom Tasks"
    ? CUSTOM_TASKS.push(newTaskObject)
    : REPETITIVE_TASKS.push(newTaskObject);

  window.localStorage.setItem("TaskCodes", JSON.stringify(TASK_CODES));
  window.localStorage.setItem("TasksInbox", JSON.stringify(ALL_TASKS));
  window.localStorage.setItem("CustomTasks", JSON.stringify(CUSTOM_TASKS));
  window.localStorage.setItem("RepetitiveTasks", JSON.stringify(REPETITIVE_TASKS));
}

export function loadUserDataFromLocalStorage() {
  if (localStorage.length !== 0) {
    const TASKS_INBOX_DATA = window.localStorage.getItem("TasksInbox");
    if (TASKS_INBOX_DATA) {
      const TASKS_INBOX_OBJECTS_ARRAY = JSON.parse(TASKS_INBOX_DATA);
      ALL_TASKS.push(...TASKS_INBOX_OBJECTS_ARRAY);
      //? load task inbox list items
      ALL_TASKS.forEach((inboxTaskItem) => {
        document
          .querySelector(".tasks-list.inbox")
          .appendChild(
            createTaskListItem(
              inboxTaskItem.code,
              inboxTaskItem.category,
              inboxTaskItem.title,
              inboxTaskItem.details,
              inboxTaskItem.deadline,
              inboxTaskItem.repeating,
              inboxTaskItem.priority,
              inboxTaskItem.status,
              "Wide Area"
            )
          );
        TASK_CODES.push(inboxTaskItem.code);
      });
    }

    const CUSTOM_TASKS_DATA = window.localStorage.getItem("CustomTasks");
    if (CUSTOM_TASKS_DATA !== null) {
      const CUSTOM_TASKS_OBJECTS_ARRAY = JSON.parse(CUSTOM_TASKS_DATA);
      CUSTOM_TASKS.push(...CUSTOM_TASKS_OBJECTS_ARRAY);
      //? load custom tasks list items for 'side area'
      CUSTOM_TASKS.forEach((customTaskItem) => {
        document
          .querySelector(".custom.tasks-list.side-area")
          .appendChild(
            createTaskListItem(
              customTaskItem.code,
              customTaskItem.category,
              customTaskItem.title,
              customTaskItem.details,
              customTaskItem.deadline,
              customTaskItem.repeating,
              customTaskItem.priority,
              customTaskItem.status,
              "Side Area"
            )
          );
        //? load custom tasks list items for 'wide area'
        document
          .querySelector(".custom.tasks-list.wide-area")
          .appendChild(
            createTaskListItem(
              customTaskItem.code,
              customTaskItem.category,
              customTaskItem.title,
              customTaskItem.details,
              customTaskItem.deadline,
              customTaskItem.repeating,
              customTaskItem.priority,
              customTaskItem.status,
              "Wide Area"
            )
          );
        //? load custom tasks list items for 'matrix area'
        const MATRIX_AREA_LI = createTaskListItem(
          customTaskItem.code,
          customTaskItem.category,
          customTaskItem.title,
          customTaskItem.details,
          customTaskItem.deadline,
          customTaskItem.repeating,
          customTaskItem.priority,
          customTaskItem.status,
          "Matrix Area"
        );
        createMatrixAreaListITem(
          customTaskItem.priority,
          customTaskItem.importance,
          customTaskItem.urgency,
          MATRIX_AREA_LI
        );
      });
    }

    const REPETITIVE_TASKS_DATA = window.localStorage.getItem("RepetitiveTasks");
    if (REPETITIVE_TASKS_DATA !== null) {
      const REPETITIVE_TASKS_OBJECTS_ARRAY = JSON.parse(REPETITIVE_TASKS_DATA);
      REPETITIVE_TASKS.push(...REPETITIVE_TASKS_OBJECTS_ARRAY);

      REPETITIVE_TASKS.forEach((repetitiveTaskItem) => {
        //? load repetitive tasks list items for 'side area'
        document
          .querySelector(".repetitive.tasks-list.side-area")
          .appendChild(
            createTaskListItem(
              repetitiveTaskItem.code,
              repetitiveTaskItem.category,
              repetitiveTaskItem.title,
              repetitiveTaskItem.details,
              repetitiveTaskItem.deadline,
              repetitiveTaskItem.repeating,
              repetitiveTaskItem.priority,
              repetitiveTaskItem.status,
              "Side Area"
            )
          );
        //? load repetitive tasks list items for 'wide area'
        document
          .querySelector(".repetitive.tasks-list.wide-area")
          .appendChild(
            createTaskListItem(
              repetitiveTaskItem.code,
              repetitiveTaskItem.category,
              repetitiveTaskItem.title,
              repetitiveTaskItem.details,
              repetitiveTaskItem.deadline,
              repetitiveTaskItem.repeating,
              repetitiveTaskItem.priority,
              repetitiveTaskItem.status,
              "Wide Area"
            )
          );
        //? load repetitive tasks list items for 'matrix area'
        const MATRIX_AREA_LI = createTaskListItem(
          repetitiveTaskItem.code,
          repetitiveTaskItem.category,
          repetitiveTaskItem.title,
          repetitiveTaskItem.details,
          repetitiveTaskItem.deadline,
          repetitiveTaskItem.repeating,
          repetitiveTaskItem.priority,
          repetitiveTaskItem.status,
          "Matrix Area"
        );
        createMatrixAreaListITem(
          repetitiveTaskItem.priority,
          repetitiveTaskItem.importance,
          repetitiveTaskItem.urgency,
          MATRIX_AREA_LI
        );
      });
    }
    updateCurrentTasksCount();
  }
  checkEmptyTasksArea();
}
