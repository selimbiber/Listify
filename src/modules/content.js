import { createTaskUpdateForm } from "./form";
import { checkEmptyTasksArea, createPopUpBackground, updateCurrentTasksCount, calcRemainingTimeForCustomTasks, markTaskListItemDone } from "./helpers";

export class Task  {
    constructor (code, category, title, details, deadline, priority, importance, urgency, repeating, status) {
        this.code = code;
        this.category = category;
        this.title = title;
        this.details = details;
        this.deadline = deadline;
        this.priority = priority;
        this.importance = importance;
        this.urgency = urgency; 
        this.repeating = repeating;
        this.status = status;
    }
}

export const TASK_CODES = [];

export const ALL_TASKS = [];
export const CUSTOM_TASKS = [];
export const REPETITIVE_TASKS = [];

export function generateTaskCode() {
    let taskCode = "";
    const allLeters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ';

    do {
        taskCode = "";
        for (let i = 0; i < Math.floor(Math.random() * 26); i++) {
            taskCode += allLeters.charAt( Math.floor(Math.random() * allLeters.length) );
        }
    } while (TASK_CODES.includes(taskCode) || taskCode.trim() === "");
    
    TASK_CODES.push(taskCode);

    return taskCode;
}

export function createTaskListItem(taskCode, taskCategory, taskTitle, taskDetails, taskDeadline, taskRepeating, taskPriority, taskStatus, showArea) {
    const TASK_LIST_ITEM = document.createElement('li');
        TASK_LIST_ITEM.dataset.taskCode = taskCode;
        TASK_LIST_ITEM.className = 'tasks-list-item';

        if ( taskPriority.includes('Low') ) {
            TASK_LIST_ITEM.classList.add('low-priority');
        } else if ( taskPriority.includes('Medium') ) {
            TASK_LIST_ITEM.classList.add('medium-priority');
        } else {
            TASK_LIST_ITEM.classList.add('high-priority');
        }

        if (taskDeadline != '') {
            TASK_LIST_ITEM.title = `The deadline for this ${taskPriority.toLowerCase()} task ends in ${calcRemainingTimeForCustomTasks(taskDeadline)}`;
        } else {
            TASK_LIST_ITEM.title = `Repeat this ${taskPriority.toLowerCase()} task for ${taskRepeating.toLowerCase()}`;
        }

        if (taskStatus === 'To Do') {
            TASK_LIST_ITEM.classList.add('to-do');
        } else if (taskStatus === 'Doing') {
            TASK_LIST_ITEM.classList.add('doing');
        } else if (taskStatus === 'Done') {
            TASK_LIST_ITEM.classList.add('done');
        }

        const LIST_ITEM_LEFT_SIDE = document.createElement('div');
        LIST_ITEM_LEFT_SIDE.className = 'li-left-side';

            const CUSTOM_CHECKBOX_CONTAINER = document.createElement('label');
                CUSTOM_CHECKBOX_CONTAINER.title = 'Click this checkbox if you done this task'
                CUSTOM_CHECKBOX_CONTAINER.className = 'custom-checkbox-container';

                const CHECKBOX_BTN = document.createElement('input');
                    CHECKBOX_BTN.type = 'checkbox';
                    CHECKBOX_BTN.className = 'task-done-checkbox';
                    CHECKBOX_BTN.dataset.taskCode = taskCode;
                CUSTOM_CHECKBOX_CONTAINER.appendChild(CHECKBOX_BTN);
                    CHECKBOX_BTN.addEventListener('change', (e) => {
                        markTaskListItemDone(e.target.dataset.taskCode, e.target.checked, taskCategory);
                    });

                const CHECKBOX_MARK = document.createElement('span');
                    CHECKBOX_MARK.className = 'checkmark';
                CUSTOM_CHECKBOX_CONTAINER.appendChild(CHECKBOX_MARK);

            LIST_ITEM_LEFT_SIDE.appendChild(CUSTOM_CHECKBOX_CONTAINER);
            
                if (taskStatus === 'Done') {
                    CHECKBOX_BTN.checked = true;
                }
                CUSTOM_CHECKBOX_CONTAINER.addEventListener('click', () => {
                    CHECKBOX_BTN.checked === true ? TASK_LIST_ITEM.classList.add('done') : TASK_LIST_ITEM.classList.remove('done')
                });

            const TASK_TITLE = document.createElement('p');
                TASK_TITLE.className = 'task-title';
                TASK_TITLE.textContent = taskTitle;
            LIST_ITEM_LEFT_SIDE.appendChild(TASK_TITLE);

        TASK_LIST_ITEM.appendChild(LIST_ITEM_LEFT_SIDE);

        const LIST_ITEM_RIGHT_SIDE = document.createElement('div');
        LIST_ITEM_RIGHT_SIDE.className = 'li-right-side';;

            const TASK_INFOBOX_BTN = document.createElement('button');
                TASK_INFOBOX_BTN.title = 'Click this button for view task info box';
                TASK_INFOBOX_BTN.className = 'task-infobox-btn';

                const TASK_INFOBOX_BTN_ICON = document.createElement('i');
                    TASK_INFOBOX_BTN_ICON.classList.add('fa-solid', 'fa-circle-info', 'fa-lg');
                    TASK_INFOBOX_BTN_ICON.dataset.taskCode = taskCode;
                    TASK_INFOBOX_BTN_ICON.dataset.taskCategory = taskCategory;
                    TASK_INFOBOX_BTN_ICON.dataset.showArea = showArea;
                TASK_INFOBOX_BTN.appendChild(TASK_INFOBOX_BTN_ICON);
            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_INFOBOX_BTN);

            TASK_INFOBOX_BTN.addEventListener('click', () => {
                showTaskListItemInfoBox(
                    taskTitle, taskCategory, taskDetails, taskDeadline, taskRepeating, taskPriority, taskStatus, showArea
                );
            });

            const TASK_EDIT_BTN = document.createElement('button');
                TASK_EDIT_BTN.title = 'Click this button to edit the info for this task'
                TASK_EDIT_BTN.className = 'task-edit-btn';

                const TASK_EDIT_BTN_ICON = document.createElement('i');
                    TASK_EDIT_BTN_ICON.classList.add('fas', 'fa-edit', 'fa-lg');
                    TASK_EDIT_BTN_ICON.dataset.taskCode = taskCode;
                    TASK_EDIT_BTN_ICON.dataset.showArea = showArea;
                TASK_EDIT_BTN.appendChild(TASK_EDIT_BTN_ICON);
            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_EDIT_BTN);

            TASK_EDIT_BTN.addEventListener('click', (e) => {
                updateTaskListItem(e.target.dataset.taskCode, e.target.dataset.showArea, TASK_LIST_ITEM);
            });

            const TASK_DELETE_BTN = document.createElement('button');
                TASK_DELETE_BTN.title = 'Click this button for delete this task';
                TASK_DELETE_BTN.className = 'task-delete-btn';

                const TASK_DELETE_BTN_ICON = document.createElement('i');
                    TASK_DELETE_BTN_ICON.classList.add('fa-solid', 'fa-trash', 'fa-lg');
                    TASK_DELETE_BTN_ICON.dataset.taskCode = taskCode;
                    TASK_DELETE_BTN_ICON.dataset.taskCategory = taskCategory;
                    TASK_DELETE_BTN_ICON.dataset.showArea = showArea;
                TASK_DELETE_BTN.appendChild(TASK_DELETE_BTN_ICON);
            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_DELETE_BTN);

            TASK_DELETE_BTN.addEventListener( 'click', (e) => {
                deleteTaskListItem(e.target.dataset.taskCode, e.target.dataset.taskCategory, e.target.dataset.showArea);
            });

        TASK_LIST_ITEM.appendChild(LIST_ITEM_RIGHT_SIDE);

    return TASK_LIST_ITEM;
}

export function createMatrixAreaListITem(taskPriorityRating, IMPORTANCE_STATUS_CHECKED, URGENCY_STATUS_CHECKED, MATRIX_AREA_LI) {
    if (taskPriorityRating === 'High Priority') {
        document.querySelector('.important-urgent-tasks.list').appendChild(MATRIX_AREA_LI);
    } else if (taskPriorityRating === 'Medium Priority') {
        if (IMPORTANCE_STATUS_CHECKED === true && URGENCY_STATUS_CHECKED === false) {
            document.querySelector('.just-important-tasks.list').appendChild(MATRIX_AREA_LI);
        } else if (IMPORTANCE_STATUS_CHECKED === false && URGENCY_STATUS_CHECKED === true) {
            document.querySelector('.just-urgent-tasks.list').appendChild(MATRIX_AREA_LI);
        }
    } else if (taskPriorityRating === 'Low Priority') {
        document.querySelector('.unimportant-unurgent-tasks.list').appendChild(MATRIX_AREA_LI);
    }
}

function updateTaskListItem(updatedTaskCode, formShowArea) {
    const TASKS_INBOX_ARRAY = JSON.parse( window.localStorage.getItem('TasksInbox') );
    TASKS_INBOX_ARRAY.forEach(taskItem => {
        if (taskItem.code === updatedTaskCode) {
            if (formShowArea === 'Side Area') {
                document.querySelector('.sidebar-menu-subsection').appendChild(createTaskUpdateForm(
                    taskItem.code,
                    taskItem.title, 
                    taskItem.details, 
                    taskItem.deadline, 
                    taskItem.urgency, 
                    taskItem.importance, 
                    taskItem.repeating,
                    taskItem.status
                ));
                createPopUpBackground('Sidebar Menu');
            } else {
                document.querySelector('.tasks-area-subsection').appendChild(createTaskUpdateForm(
                    taskItem.code,
                    taskItem.title, 
                    taskItem.details, 
                    taskItem.deadline, 
                    taskItem.urgency, 
                    taskItem.importance, 
                    taskItem.repeating,
                    taskItem.status
                ));
                createPopUpBackground();
            }
        }
    });
}

function deleteTaskListItem(toBeDeletedTaskCode, toBeDeletedTaskCategory, clickedTaskItemShowArea) {
    //? -> request the final decision from the user
    showWarningMessageForTaskDeleting(
        'Are you sure you want to delete this task?',
        'No, dont delete this task.',
        'Yes, delete this task.',
        clickedTaskItemShowArea
    );
    document.querySelector('.confirm-action-btn').addEventListener('click', () => {
        document.querySelectorAll(`li[data-task-code="${toBeDeletedTaskCode}"]`).forEach(taskItem => {
            taskItem.remove();
        });

        const ALL_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('TasksInbox') );
        let deletedTaskIndexAtAllTasksArray = 0; //? DEFAULT VALUE
        ALL_TASKS_ARRAY.forEach(taskItem => {
            if (taskItem.code === toBeDeletedTaskCode) {
                deletedTaskIndexAtAllTasksArray = ALL_TASKS_ARRAY.indexOf(taskItem);
            }
        });
        if (deletedTaskIndexAtAllTasksArray !== -1) {
            ALL_TASKS_ARRAY.splice(deletedTaskIndexAtAllTasksArray, 1);
            window.localStorage.setItem( 'TasksInbox', JSON.stringify(ALL_TASKS_ARRAY) );
        }

        if (toBeDeletedTaskCategory === 'Custom Tasks') {
            let deletedTaskIndexAtCustomTasksArray = 0; //? DEFAULT VALUE
            const CUSTOM_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('CustomTasks') );
            CUSTOM_TASKS_ARRAY.forEach(customTask => {
                if(customTask.code === toBeDeletedTaskCode) {
                    deletedTaskIndexAtCustomTasksArray = CUSTOM_TASKS_ARRAY.indexOf(customTask);
                }
            })
            if (deletedTaskIndexAtCustomTasksArray !== -1) {
                CUSTOM_TASKS_ARRAY.splice(deletedTaskIndexAtCustomTasksArray, 1);
                window.localStorage.setItem( 'CustomTasks', JSON.stringify(CUSTOM_TASKS_ARRAY) );
            }
        } else if (toBeDeletedTaskCategory === 'Repetitive Tasks') {
            let deletedTaskIndexAtRepetitiveTasksArray = 0; //? DEFAULT VALUE
            const REPETITIVE_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('RepetitiveTasks') );
            REPETITIVE_TASKS_ARRAY.forEach(repetitiveTask => {
                if (repetitiveTask.code === toBeDeletedTaskCode) {
                    deletedTaskIndexAtRepetitiveTasksArray = REPETITIVE_TASKS_ARRAY.indexOf(repetitiveTask);
                }
            })
            if (deletedTaskIndexAtRepetitiveTasksArray !== -1) {
                REPETITIVE_TASKS_ARRAY.splice(deletedTaskIndexAtRepetitiveTasksArray, 1);
                window.localStorage.setItem( 'RepetitiveTasks', JSON.stringify(REPETITIVE_TASKS_ARRAY) );
            }
        }

        const TASK_CODES_ARRAY = JSON.parse( window.localStorage.getItem('TaskCodes') );
        let deletedTaskCodeIndexAtTaskCodesArray = 0; //? DEFAULT VALUE
        TASK_CODES_ARRAY.forEach(taskCode => {
            if (taskCode === toBeDeletedTaskCode) {
                deletedTaskCodeIndexAtTaskCodesArray = TASK_CODES_ARRAY.indexOf(taskCode);
            }
        });
        if (deletedTaskCodeIndexAtTaskCodesArray !== -1) {
            TASK_CODES_ARRAY.splice(deletedTaskCodeIndexAtTaskCodesArray, 1);
            window.localStorage.setItem( 'TaskCodes', JSON.stringify(TASK_CODES_ARRAY) );
        }

        document.querySelectorAll('.warning-message-box').forEach( warningBox => warningBox.remove() );
        document.querySelectorAll('.popup-background').forEach( popBg => popBg.remove() );
        
        updateCurrentTasksCount();
        checkEmptyTasksArea();
    });
}

export function deleteAllTaskListItems() {
    //? -> request the final decision from the user
    showWarningMessageForTaskDeleting(
        'Are you sure you want to delete all your tasks from this app?',
        'No, dont delete my tasks.',
        'Yes, delete my tasks.'
    ); 

    document.querySelector('.confirm-action-btn').addEventListener('click', () => {
        document.querySelectorAll('.tasks-list-item').forEach( tasksListItem => {
            tasksListItem.remove();
        });
        const CURRENT_THEME_MODE_PREFERENCE = window.localStorage.getItem('currentThemeModePreference');
        TASK_CODES.length = 0;
        ALL_TASKS.length = 0;
        CUSTOM_TASKS.length = 0;
        REPETITIVE_TASKS.length = 0;
        window.localStorage.clear();
        window.localStorage.setItem('currentThemeModePreference', CURRENT_THEME_MODE_PREFERENCE);
        document.querySelector('.warning-message-box').remove();
        document.querySelectorAll('.popup-background').forEach( popBg => popBg.remove() );
        updateCurrentTasksCount();
        document.querySelector('#toggle-menu_checkbox-btn').click();
        checkEmptyTasksArea();
    });
}

function showWarningMessageForTaskDeleting(warningMessageText, actionRejectTitle, actionConfirmTitle, messageShowArea) {
    const WARNING_MESSAGE_BOX = document.createElement('article');
    WARNING_MESSAGE_BOX.className = 'warning-message-box';

        const WARNING_MESSAGE_BOX_HEADER = document.createElement('header');
        
            const WARNING_MESSAGE_HEADING = document.createElement('h5');
                WARNING_MESSAGE_HEADING.className = 'warning-message-heading';
                WARNING_MESSAGE_HEADING.textContent = 'This action is irreversible!'
            WARNING_MESSAGE_BOX_HEADER.appendChild(WARNING_MESSAGE_HEADING);

        WARNING_MESSAGE_BOX.appendChild(WARNING_MESSAGE_BOX_HEADER);

        const WARNING_MESSAGE_TEXT = document.createElement('p');
            WARNING_MESSAGE_TEXT.className = 'warning-message-text';
            WARNING_MESSAGE_TEXT.textContent = warningMessageText;
        WARNING_MESSAGE_BOX.appendChild(WARNING_MESSAGE_TEXT);

        const WARNING_MESSAGE_BOX_FOOTER = document.createElement('footer');
        
            const REJECT_ACTION_BTN = document.createElement('button');
                REJECT_ACTION_BTN.className = 'reject-action-btn';
                REJECT_ACTION_BTN.title = actionRejectTitle;

                const REJECT_ACTION_BTN_ICON = document.createElement('i');
                    REJECT_ACTION_BTN_ICON.classList.add('fa-solid', 'fa-ban')
                    REJECT_ACTION_BTN_ICON.hidden = true;
                REJECT_ACTION_BTN.appendChild(REJECT_ACTION_BTN_ICON);
                
            WARNING_MESSAGE_BOX_FOOTER.appendChild(REJECT_ACTION_BTN);

            REJECT_ACTION_BTN.addEventListener( 'click', () => {
                WARNING_MESSAGE_BOX.remove();
                document.querySelectorAll('.popup-background').forEach( popBg => popBg.remove() );
            });

            const CONFIRM_ACTION_BTN = document.createElement('button');
                CONFIRM_ACTION_BTN.className = 'confirm-action-btn';
                CONFIRM_ACTION_BTN.title = actionConfirmTitle;

                const CONFIRM_ACTION_BTN_ICON = document.createElement('i');
                    CONFIRM_ACTION_BTN_ICON.classList.add('fa-solid', 'fa-check');
                    CONFIRM_ACTION_BTN_ICON.hidden = true;
                CONFIRM_ACTION_BTN.appendChild(CONFIRM_ACTION_BTN_ICON);

            WARNING_MESSAGE_BOX_FOOTER.appendChild(CONFIRM_ACTION_BTN);

        WARNING_MESSAGE_BOX.appendChild(WARNING_MESSAGE_BOX_FOOTER);

        if (messageShowArea === 'Side Area') {
            document.querySelector('.sidebar-menu-subsection').appendChild(WARNING_MESSAGE_BOX);
        } else {
            document.querySelector('.tasks-area-subsection').appendChild(WARNING_MESSAGE_BOX);
        }
    
    createPopUpBackground('Sidebar Menu');
}

function showTaskListItemInfoBox(taskTitle, taskCategory, taskDetails, taskDeadline, taskRepeating, taskPriority, taskStatus, showArea) {
    if (showArea === 'Side Area') {
        document.querySelector('.sidebar-menu-subsection').appendChild( createTaskInfoBox() );
        createPopUpBackground('Sidebar Menu');
    } else {
        document.querySelector('.tasks-area-subsection').appendChild( createTaskInfoBox() );
        createPopUpBackground();
    }

    function createTaskInfoBox() {
        const TASK_INFO_BOX = document.createElement('article');
        TASK_INFO_BOX.className = 'task-info-box';

            const TASK_INFO_BOX_HEADER = document.createElement('header');
                const TASK_TITLE = document.createElement('h4');
                    TASK_TITLE.className = 'task-title';
                    TASK_TITLE.title = 'Task Title';
                    TASK_TITLE.textContent = taskTitle;
                TASK_INFO_BOX_HEADER.appendChild(TASK_TITLE);

                const CLOSE_INFO_BOX_BTN = document.createElement('button');
                    CLOSE_INFO_BOX_BTN.className = 'close-infobox-btn';
                    CLOSE_INFO_BOX_BTN.title = 'Click this button for close this info box';

                    const CLOSE_BTN_ICON = document.createElement('i');
                        CLOSE_BTN_ICON.classList.add('fa-solid', 'fa-x');
                    CLOSE_INFO_BOX_BTN.appendChild(CLOSE_BTN_ICON);

                TASK_INFO_BOX_HEADER.appendChild(CLOSE_INFO_BOX_BTN);

                CLOSE_INFO_BOX_BTN.addEventListener('click', () => {
                    TASK_INFO_BOX.remove();
                    document.querySelectorAll('.popup-background').forEach( popupBg => popupBg.remove() );
                });

            TASK_INFO_BOX.appendChild(TASK_INFO_BOX_HEADER);

            if (taskDetails.length != 0) {
                const TASK_INFO_BOX_DETAILS = document.createElement('p');
                    TASK_INFO_BOX_DETAILS.className = 'task-details';
                    TASK_INFO_BOX_DETAILS.title = 'Task Details';
                    TASK_INFO_BOX_DETAILS.textContent = taskDetails;
                TASK_INFO_BOX.appendChild(TASK_INFO_BOX_DETAILS);
            }

            const TASK_CATEGORY_NAME = document.createElement('p');
                TASK_CATEGORY_NAME.className = 'task-category';
                TASK_CATEGORY_NAME.textContent = 'Category:';

                const TASK_CATEGORY_NAME_SPAN = document.createElement('span');
                    TASK_CATEGORY_NAME_SPAN.className = 'task-text';
                    if ( taskCategory.includes('Custom') ) {
                        TASK_CATEGORY_NAME_SPAN.textContent = 'Custom Task';
                    } else {
                        TASK_CATEGORY_NAME_SPAN.textContent = 'Repetitive Task';
                    }
                TASK_CATEGORY_NAME.appendChild(TASK_CATEGORY_NAME_SPAN);
            TASK_INFO_BOX.appendChild(TASK_CATEGORY_NAME);

            if (taskDeadline != '') { 
                const TASK_DUE_DATE = document.createElement('p');
                    TASK_DUE_DATE.className = 'task-deadline';
                    TASK_DUE_DATE.textContent = 'Deadline:';

                    const TASK_DUE_DATE_SPAN = document.createElement('span');
                        TASK_DUE_DATE_SPAN.className = 'task-text';
                        TASK_DUE_DATE_SPAN.textContent = `${taskDeadline} (in ${calcRemainingTimeForCustomTasks(taskDeadline)})`;;
                    TASK_DUE_DATE.appendChild(TASK_DUE_DATE_SPAN);
                TASK_INFO_BOX.appendChild(TASK_DUE_DATE);
            }

            const TASK_REPEAT_OPTION = document.createElement('p');
                TASK_REPEAT_OPTION.className = 'task-repeat';
                TASK_REPEAT_OPTION.textContent = 'Repeating:';
            
                const TASK_REPEAT_OPTION_SPAN = document.createElement('span');
                    TASK_REPEAT_OPTION_SPAN.className = 'task-text';
                    TASK_REPEAT_OPTION_SPAN.textContent = taskRepeating;
                TASK_REPEAT_OPTION.appendChild(TASK_REPEAT_OPTION_SPAN);

            TASK_INFO_BOX.appendChild(TASK_REPEAT_OPTION);

            const TASK_PRIORITY_RATING = document.createElement('p');
                TASK_PRIORITY_RATING.className = 'task-priority';
                TASK_PRIORITY_RATING.textContent = 'Priority:';

                const TASK_PRIORITY_RATING_SPAN = document.createElement('span');
                    TASK_PRIORITY_RATING_SPAN.className = 'task-text';
                    TASK_PRIORITY_RATING_SPAN.textContent = taskPriority;
                TASK_PRIORITY_RATING.appendChild(TASK_PRIORITY_RATING_SPAN);

            TASK_INFO_BOX.appendChild(TASK_PRIORITY_RATING);

            const TASK_CURRENT_STATUS = document.createElement('p');
                TASK_CURRENT_STATUS.className = 'task-status';
                TASK_CURRENT_STATUS.textContent = 'Status:';
            
                const TASK_CURRENT_STATUS_SPAN = document.createElement('span');
                    TASK_CURRENT_STATUS_SPAN.className = 'task-text';
                    TASK_CURRENT_STATUS_SPAN.textContent = taskStatus;
                TASK_CURRENT_STATUS.appendChild(TASK_CURRENT_STATUS_SPAN);

            TASK_INFO_BOX.appendChild(TASK_CURRENT_STATUS);

            const TASK_INFO_BOX_FOOTER = document.createElement('footer');

                const FORWARD_TASK_BTN = document.createElement('button');
                    FORWARD_TASK_BTN.className = 'forward-task-btn';
                    FORWARD_TASK_BTN.title = 'Click on this button to forward this task to someone';
                    FORWARD_TASK_BTN.textContent = 'FORWARD';
                TASK_INFO_BOX_FOOTER.appendChild(FORWARD_TASK_BTN);

                const SHARING_LINKS_NAV = document.createElement('nav');
                SHARING_LINKS_NAV.className = 'sharing-links-nav';

                    const LINKEDIN_SHARING_LINK = document.createElement('a');
                    LINKEDIN_SHARING_LINK.href = '#';
                        const LINKEDIN_MEDIA_ICON = document.createElement('i');
                            LINKEDIN_MEDIA_ICON.classList.add('fa-brands', 'fa-linkedin');
                        LINKEDIN_SHARING_LINK.appendChild(LINKEDIN_MEDIA_ICON);
                    SHARING_LINKS_NAV.appendChild(LINKEDIN_SHARING_LINK);

                    const WHATSAPP_SHARING_LINK = document.createElement('a');
                    WHATSAPP_SHARING_LINK.href = '#';
                        const WHATSAPP_MEDIA_ICON = document.createElement('i');
                            WHATSAPP_MEDIA_ICON.classList.add('fa-brands', 'fa-square-whatsapp');
                        WHATSAPP_SHARING_LINK.appendChild(WHATSAPP_MEDIA_ICON);
                    SHARING_LINKS_NAV.appendChild(WHATSAPP_SHARING_LINK);

                    const MESSENGER_SHARING_LINK = document.createElement('a');
                    MESSENGER_SHARING_LINK.href = '#';
                        const MESSENGER_MEDIA_ICON = document.createElement('i');
                            MESSENGER_MEDIA_ICON.classList.add('fa-brands', 'fa-facebook-messenger');
                        MESSENGER_SHARING_LINK.appendChild(MESSENGER_MEDIA_ICON);
                    SHARING_LINKS_NAV.appendChild(MESSENGER_SHARING_LINK);

                    const SLACK_SHARING_LINK = document.createElement('a');
                    SLACK_SHARING_LINK.href = '#';
                        const SLACK_MEDIA_ICON = document.createElement('i');
                            SLACK_MEDIA_ICON.classList.add('fa-brands', 'fa-slack');
                        SLACK_SHARING_LINK.appendChild(SLACK_MEDIA_ICON);
                    SHARING_LINKS_NAV.appendChild(SLACK_SHARING_LINK);

                TASK_INFO_BOX_FOOTER.appendChild(SHARING_LINKS_NAV);

                const DOWNLOAD_TASK_BTN = document.createElement('button');
                    DOWNLOAD_TASK_BTN.className = 'download-task-btn';
                    DOWNLOAD_TASK_BTN.title = 'Click on this button to download this task to your device';
                    DOWNLOAD_TASK_BTN.textContent = 'DOWNLOAD';
                TASK_INFO_BOX_FOOTER.appendChild(DOWNLOAD_TASK_BTN);

                const DOWNLOAD_LINKS_NAV = document.createElement('nav');
                DOWNLOAD_LINKS_NAV.className = 'download-links-nav';

                    const EXCEL_DOWNLOAD_LINK = document.createElement('a')
                    EXCEL_DOWNLOAD_LINK.href = '#';
                        const EXCEL_FILE_ICON = document.createElement('i');
                            EXCEL_FILE_ICON.classList.add('fa-regular', 'fa-file-excel');
                        EXCEL_DOWNLOAD_LINK.appendChild(EXCEL_FILE_ICON);
                    DOWNLOAD_LINKS_NAV.appendChild(EXCEL_DOWNLOAD_LINK);

                    const WORD_DOWNLOAD_LINK = document.createElement('a');
                    WORD_DOWNLOAD_LINK.href = '#';
                        const WORD_FILE_ICON = document.createElement('i');
                            WORD_FILE_ICON.classList.add('fa-regular', 'fa-file-word');
                        WORD_DOWNLOAD_LINK.appendChild(WORD_FILE_ICON);
                    DOWNLOAD_LINKS_NAV.appendChild(WORD_DOWNLOAD_LINK);

                    const POWERPOINT_DOWNLOAD_LINK = document.createElement('a');
                    POWERPOINT_DOWNLOAD_LINK.href = '#';
                        const POWERPOINT_FILE_ICON = document.createElement('i');
                            POWERPOINT_FILE_ICON.classList.add('fa-regular', 'fa-file-powerpoint');
                        POWERPOINT_DOWNLOAD_LINK.appendChild(POWERPOINT_FILE_ICON);
                    DOWNLOAD_LINKS_NAV.appendChild(POWERPOINT_DOWNLOAD_LINK);

                    const PDF_DOWNLOAD_LINK = document.createElement('a');
                    PDF_DOWNLOAD_LINK.href = '#';
                        const PDF_FILE_ICON = document.createElement('i');
                            PDF_FILE_ICON.classList.add('fa-regular', 'fa-file-pdf');
                        PDF_DOWNLOAD_LINK.appendChild(PDF_FILE_ICON);
                    DOWNLOAD_LINKS_NAV.appendChild(PDF_DOWNLOAD_LINK);

                TASK_INFO_BOX_FOOTER.appendChild(DOWNLOAD_LINKS_NAV);

            TASK_INFO_BOX.appendChild(TASK_INFO_BOX_FOOTER);
        
        return TASK_INFO_BOX;
    }
}