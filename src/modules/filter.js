import { createTaskListItem } from "./content";

export default function filterTasksBySelectedOption(selectedOptionValue) {
    const INBOX_TASKS_LIST = document.querySelector('.inbox.tasks-list');
    if (INBOX_TASKS_LIST.childElementCount != 0) {
        const TASKS_INBOX_ARRAY = JSON.parse( window.localStorage.getItem('TasksInbox') );
        let customTasksCountValue = document.querySelector('.custom.task-count').textContent;
        let repetitiveTasksCountValue = document.querySelector('.repetitive.task-count').textContent;
        INBOX_TASKS_LIST.innerHTML = ''; //? EMPTY TASKS INBOX LIST
        
        if (selectedOptionValue !== 'no-selected-filter-option') {
            if (repetitiveTasksCountValue != 0) {
                const REPETITIVE_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('RepetitiveTasks') );
                if (selectedOptionValue === 'daily-to-monthly-sorting-option') {
                    const FILTERED_REPETITIVE_TASKS_ARRAY = REPETITIVE_TASKS_ARRAY.sort( (TASK1, TASK2) => {
                        const EXPECTED_ORDER = ['Each Day', 'Each Week', 'Each Month'];
                        return EXPECTED_ORDER.indexOf(TASK1.deadline) - EXPECTED_ORDER.indexOf(TASK2.deadline);
                    });
                        FILTERED_REPETITIVE_TASKS_ARRAY.map(repetitiveTaskItem => {
                            INBOX_TASKS_LIST.appendChild(
                                createTaskListItem(
                                    repetitiveTaskItem.code,
                                    repetitiveTaskItem.category,
                                    repetitiveTaskItem.title,
                                    repetitiveTaskItem.details,
                                    repetitiveTaskItem.deadline,
                                    repetitiveTaskItem.priority,
                                    'Wide Area'
                                )
                            );
                        });
                } else if (selectedOptionValue === 'monthly-to-daily-sorting-option') {
                    const FILTERED_REPETITIVE_TASKS_ARRAY = REPETITIVE_TASKS_ARRAY.sort( (TASK1, TASK2) => {
                        const EXPECTED_ORDER = ['Each Month', 'Each Week', 'Each Day'];
                        return EXPECTED_ORDER.indexOf(TASK1.deadline) - EXPECTED_ORDER.indexOf(TASK2.deadline);
                    });
                        FILTERED_REPETITIVE_TASKS_ARRAY.map(repetitiveTaskItem => {
                            INBOX_TASKS_LIST.appendChild(
                                createTaskListItem(
                                    repetitiveTaskItem.code,
                                    repetitiveTaskItem.category,
                                    repetitiveTaskItem.title,
                                    repetitiveTaskItem.details,
                                    repetitiveTaskItem.deadline,
                                    repetitiveTaskItem.priority,
                                    'Wide Area'
                                )
                            );
                        });
                }
            }
            if (selectedOptionValue === 'to_do-to-done-sorting-option') {
                const FILTERED_TASKS_ARRAY = TASKS_INBOX_ARRAY.sort( (TASK1, TASK2) => {
                    const EXPECTED_ORDER = ['To Do', 'Doing', 'Done'];
                    return EXPECTED_ORDER.indexOf(TASK1.status) - EXPECTED_ORDER.indexOf(TASK2.status);
                });
                    FILTERED_TASKS_ARRAY.map(taskItem => {
                        INBOX_TASKS_LIST.appendChild(
                            createTaskListItem(
                                taskItem.code,
                                taskItem.category,
                                taskItem.title,
                                taskItem.details,
                                taskItem.deadline,
                                taskItem.priority,
                                'Wide Area'
                            )
                        );
                    });
            } else if (selectedOptionValue === 'done-to-to_do-sorting-option') {
                const FILTERED_TASKS_ARRAY = TASKS_INBOX_ARRAY.sort( (TASK1, TASK2) => {
                    const EXPECTED_ORDER = ['Done', 'Doing', 'To Do'];
                    return EXPECTED_ORDER.indexOf(TASK1.status) - EXPECTED_ORDER.indexOf(TASK2.status);
                });
                    FILTERED_TASKS_ARRAY.map(taskItem => {
                        INBOX_TASKS_LIST.appendChild(
                            createTaskListItem(
                                taskItem.code,
                                taskItem.category,
                                taskItem.title,
                                taskItem.details,
                                taskItem.deadline,
                                taskItem.priority,
                                'Wide Area'
                            )
                        );
                    });
            }
            if (customTasksCountValue != 0) {
                const CUSTOM_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('CustomTasks') );
                if (selectedOptionValue === 'many-to-few-day-sorting-option') {
                    const FILTERED_CUSTOM_TASKS_ARRAY = CUSTOM_TASKS_ARRAY.sort( (CUSTOM_TASK1, CUSTOM_TASK2) => {
                        if (CUSTOM_TASK1.deadline > CUSTOM_TASK2.deadline) return -1;
                        if (CUSTOM_TASK1.deadline < CUSTOM_TASK2.deadline) return 1;
                        return 0;
                    });
                        FILTERED_CUSTOM_TASKS_ARRAY.map(customTaskItem => {
                            INBOX_TASKS_LIST.appendChild(
                                createTaskListItem(
                                    customTaskItem.code,
                                    customTaskItem.category,
                                    customTaskItem.title,
                                    customTaskItem.details,
                                    customTaskItem.deadline,
                                    customTaskItem.priority,
                                    'Wide Area'
                                )
                            );
                        });
                } else if (selectedOptionValue === 'few-to-many-day-sorting-option') {
                    const FILTERED_CUSTOM_TASKS_ARRAY = CUSTOM_TASKS_ARRAY.sort( (CUSTOM_TASK1, CUSTOM_TASK2) => {
                        if (CUSTOM_TASK1.deadline < CUSTOM_TASK2.deadline) return -1;
                        if (CUSTOM_TASK1.deadline > CUSTOM_TASK2.deadline) return 1;
                        return 0;
                    });
                        FILTERED_CUSTOM_TASKS_ARRAY.map(customTaskItem => {
                            INBOX_TASKS_LIST.appendChild(
                                createTaskListItem(
                                    customTaskItem.code,
                                    customTaskItem.category,
                                    customTaskItem.title,
                                    customTaskItem.details,
                                    customTaskItem.deadline,
                                    customTaskItem.priority,
                                    'Wide Area'
                                )
                            );
                        });
                }
            }
        } else {
            TASKS_INBOX_ARRAY.forEach(taskItem => {
                INBOX_TASKS_LIST.appendChild(
                    createTaskListItem(
                        taskItem.code,
                        taskItem.category,
                        taskItem.title,
                        taskItem.details,
                        taskItem.deadline,
                        taskItem.priority,
                        'Wide Area'
                    )
                );
            });
        }
    }
}