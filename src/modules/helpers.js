export function createPopUpBackground(parentElement) {
    const PAGE_CONTAINER = document.querySelector('#page-container');
    const PAGE_CONTAINER_TOP_ELEMENT = document.querySelector('.header-section');
    const PAGE_CONTAINER_POPUP_BACKGROUND = document.createElement('div');
    PAGE_CONTAINER_POPUP_BACKGROUND.className = 'popup-background';

    const SIDEBAR_MENU = document.querySelector('.sidebar-menu-subsection');
    const SIDEBAR_MENU_TOP_ELEMENT = SIDEBAR_MENU.querySelector('.menu.tasks-inbox');
    const SIDEBAR_MENU_POPUP_BACKGROUND = document.createElement('div');
    SIDEBAR_MENU_POPUP_BACKGROUND.className = 'popup-background';

    if ( !document.querySelector('.popup-background') ) {
        if (parentElement === 'Sidebar Menu') {
            PAGE_CONTAINER.insertBefore(PAGE_CONTAINER_POPUP_BACKGROUND, PAGE_CONTAINER_TOP_ELEMENT);
            SIDEBAR_MENU.insertBefore(SIDEBAR_MENU_POPUP_BACKGROUND, SIDEBAR_MENU_TOP_ELEMENT);
        } else {
            SIDEBAR_MENU.insertBefore(SIDEBAR_MENU_POPUP_BACKGROUND, SIDEBAR_MENU_TOP_ELEMENT);
            PAGE_CONTAINER.insertBefore(PAGE_CONTAINER_POPUP_BACKGROUND, PAGE_CONTAINER_TOP_ELEMENT);
        }
    }
}

export function toggleSidebarMenu() {
    const TOGGLE_MENU_CHECKBOX_BTN = document.querySelector('#toggle-menu_checkbox-btn');
    const SIDEBAR_MENU = document.querySelector('.sidebar-menu-subsection');
    const TASKS_AREA = document.querySelector('.tasks-area-subsection');

    TOGGLE_MENU_CHECKBOX_BTN.addEventListener('click', () => {
        if ( SIDEBAR_MENU.classList.contains('open') ) {
            SIDEBAR_MENU.classList.remove('open');
            TASKS_AREA.classList.remove('swipe-right');
            TASKS_AREA.classList.add('centering');
            document.querySelector('.sidebar-slider').title = 'click for open the sidebar menu';
            checkEmptyTasksArea();
        } else {
            SIDEBAR_MENU.classList.add('open');
            TASKS_AREA.classList.remove('centering');
            TASKS_AREA.classList.add('swipe-right');
            document.querySelector('.sidebar-slider').title = 'click for close the sidebar menu';
        }
    });
}

export function toggleThemeMode() {
    const TOGGLE_THEME_BTN = document.querySelector('#toggle-theme_checkbox-btn');
    const PREFERS_DARK_THEME = window.matchMedia("(prefers-color-scheme: dark)");
    const LAST_PREFERRED_MODE = window.localStorage.getItem('currentThemeModePreference');
    
    if (!LAST_PREFERRED_MODE && PREFERS_DARK_THEME.matches) {
        document.body.classList.add("dark-mode");
        TOGGLE_THEME_BTN.checked = 'true';
    } else if(LAST_PREFERRED_MODE) {
        if (LAST_PREFERRED_MODE === 'light-mode') {
            document.body.removeAttribute('class');
        } else {
            TOGGLE_THEME_BTN.checked = 'true';
            document.body.classList.add("dark-mode");
        }
    }

    TOGGLE_THEME_BTN.addEventListener('click', () => {
        if ( document.body.classList.contains("dark-mode") ) {
            document.body.removeAttribute('class');
            window.localStorage.setItem('currentThemeModePreference', 'light-mode');
        } else {
            document.body.classList.add("dark-mode");
            window.localStorage.setItem('currentThemeModePreference', 'dark-mode');
        }
    });
}

export function toggleBetweenTaskAreas() {
    document.querySelectorAll('.menu.btn').forEach(menuBtn => menuBtn.addEventListener('click', () => clearTasksAreaSubsection()));

    document.querySelector('.menu.tasks-inbox.btn').addEventListener('click', () => {
        toggleTaskInboxArea('show');
    });
    
    document.querySelector('.menu.custom-tasks.btn').addEventListener('click', () => {
        toggleCustomTasksArea('show');
    });

    document.querySelector('.menu.repetitive-tasks.btn').addEventListener('click', () => {
        toggleRepetitiveTasksArea('show');
    });

    document.querySelector('.show-priority-matrix-btn').addEventListener('click', () => {
        clearTasksAreaSubsection();
        togglePriorityMatrixArea('show');
    });

    function toggleTaskInboxArea(action) {
        action === 'show' ? showTaskInboxArea() : hideTaskInboxArea();
        function showTaskInboxArea() {
            if ( document.querySelector('.tasks-inbox.area').classList.contains('hide') ) {
                document.querySelector('.tasks-inbox.area').classList.remove('hide');
            }
        }
        function hideTaskInboxArea() {
            if ( !document.querySelector('.tasks-inbox.area').classList.contains('hide') ) {
                document.querySelector('.tasks-inbox.area').classList.add('hide');
            }
        }
    }
    
    function toggleCustomTasksArea(action) {
        action === 'show' ? showCustomTasksArea() : hideCustomTasksArea();
        function showCustomTasksArea() {
            if ( document.querySelector('.custom-tasks.area').classList.contains('hide') ) {
                document.querySelector('.custom-tasks.area').classList.remove('hide');
            }
        }
        function hideCustomTasksArea() {
            if ( !document.querySelector('.custom-tasks.area').classList.contains('hide') ) {
                document.querySelector('.custom-tasks.area').classList.add('hide');
            }
        }
    }
    
    function toggleRepetitiveTasksArea(action) {
        action === 'show' ? showRepetitiveTasksArea() : hideRepetitiveTasksArea();
        function showRepetitiveTasksArea() {
            if ( document.querySelector('.repetitive-tasks.area').classList.contains('hide') ) {
                document.querySelector('.repetitive-tasks.area').classList.remove('hide');
            }
        }
        function hideRepetitiveTasksArea() {
            if ( !document.querySelector('.repetitive-tasks.area').classList.contains('hide') ) {
                document.querySelector('.repetitive-tasks.area').classList.add('hide');
            }
        }
    }
    
    function togglePriorityMatrixArea(action) {
        action === 'show' ? showPriorityMatrixArea() : hidePriorityMatrixArea();
        function showPriorityMatrixArea() {
            if ( document.querySelector('.priority-matrix.area').classList.contains('hide') ) {
                document.querySelector('.priority-matrix.area').classList.remove('hide');
            }
        }
        function hidePriorityMatrixArea() {
            if ( !document.querySelector('.priority-matrix.area').classList.contains('hide') ) {
                document.querySelector('.priority-matrix.area').classList.add('hide');
            }
        }
    }
    
    function clearTasksAreaSubsection() {
        toggleTaskInboxArea();
        toggleCustomTasksArea();
        toggleRepetitiveTasksArea();
        togglePriorityMatrixArea();
    }
}

export function checkEmptyTasksArea() {
    if ( document.querySelector('.inbox.task-count').textContent == 0) {
            showEmptyTasksAreaMessageBox();
    }

    function showEmptyTasksAreaMessageBox() {
        if ( document.querySelector('.sidebar-menu-subsection').classList.contains('open') ) {
            document.querySelector('#toggle-menu_checkbox-btn').click();
        }
        createPopUpBackground();
        if ( document.querySelector('.empty-tasks-area-message-box') ) {
            document.querySelector('.empty-tasks-area-message-box').remove(); //? No Multiple Message Boxes
        }
        const MESSAGE_BOX = document.createElement('article');
        MESSAGE_BOX.className = 'empty-tasks-area-message-box';
    
            const BOX_HEADER = document.createElement('header');
                const BOX_HEADING = document.createElement('h4');
                    BOX_HEADING.className = 'message-box-heading';
                    BOX_HEADING.textContent = 'Yay! You have no task.'
                BOX_HEADER.appendChild(BOX_HEADING)
    
            MESSAGE_BOX.appendChild(BOX_HEADER);
    
            const BOX_TEXT = document.createElement('p');
                BOX_TEXT.className = 'message-box-text';
                BOX_TEXT.textContent = 'You can click on the button below to create a new task, or enjoy your free time.';
            MESSAGE_BOX.appendChild(BOX_TEXT);
    
            const BOX_FOOTER = document.createElement('footer');
                const BOX_BTN = document.createElement('button');
                    BOX_BTN.className = 'task-form_bring-btn';
                    BOX_BTN.textContent = 'Create New Task';
    
                    BOX_BTN.addEventListener('click', () => {
                        document.querySelector('#toggle-menu_checkbox-btn').click();
                        document.querySelector('.new-task-btn').click();
    
                        MESSAGE_BOX.classList.add('hide');
                        setTimeout(() => MESSAGE_BOX.remove(), 500);
                    });
    
                BOX_FOOTER.appendChild(BOX_BTN);
    
            MESSAGE_BOX.appendChild(BOX_FOOTER);
    
        document.querySelector('.tasks-area-subsection').appendChild(MESSAGE_BOX);
    }
}

export function changeZeroTaskCountColor() {
    document.querySelectorAll('.task-count').forEach(taskCount => {
        if (taskCount.textContent == 0) {
            taskCount.classList.add('zero');
        } else {
            taskCount.classList.remove('zero');
        }
    });
}

export function updateCurrentTasksCount() {
    const REPETITIVE_TASKS_LIST_ITEM_COUNT = document.querySelector('.repetitive.tasks-list').childElementCount;
    const CUSTOM_TASKS_LIST_ITEM_COUNT = document.querySelector('.custom.tasks-list').childElementCount;
    const TOTAL_TASKS_COUNT = REPETITIVE_TASKS_LIST_ITEM_COUNT + CUSTOM_TASKS_LIST_ITEM_COUNT;

    document.querySelector('.inbox.task-count').textContent = TOTAL_TASKS_COUNT;
    document.querySelector('.custom.task-count').textContent = CUSTOM_TASKS_LIST_ITEM_COUNT;
    document.querySelector('.repetitive.task-count').textContent = REPETITIVE_TASKS_LIST_ITEM_COUNT;

    changeZeroTaskCountColor();
}

export function calcRemainingTimeForCustomTasks(deadline) {
    const CURRENT_TIME =  new Date();
    const STRING_DEADLINE = deadline;
    const SPLIT_DEADLINE = STRING_DEADLINE.split('-');

    const YEAR = parseInt(SPLIT_DEADLINE[0]);
    const MONTH = parseInt(SPLIT_DEADLINE[1])-1;
    const DAY = parseInt(SPLIT_DEADLINE[2])+1;

    const TASK_DEADLINE = new Date(YEAR, MONTH, DAY);
    const TIME_DIFFERENCE = TASK_DEADLINE - CURRENT_TIME;
    const DAY_DIFFERENCE = TIME_DIFFERENCE / (1000 * 60 * 60 * 24);

    if (DAY_DIFFERENCE.toFixed(0) == 0) {
        return `today`;
    } else if (DAY_DIFFERENCE.toFixed(0) == 1) {
        return `tomorrow`;
    } else {
        return `${DAY_DIFFERENCE.toFixed(0)} days`;
    }
}

export function markTaskListItemDone(markedTaskCode, currentCheckedStatus, markedTaskCategory) {
    document.querySelectorAll(`li[data-task-code="${markedTaskCode}"]`).forEach(taskItem => {
        taskItem.querySelectorAll('input[type="checkbox"]').forEach(checkboxInput => {
            checkboxInput.checked = currentCheckedStatus;
        });
        if ( currentCheckedStatus === false && taskItem.classList.contains('done') ) {
            taskItem.classList.remove('done');
        } else if ( currentCheckedStatus === true && !taskItem.classList.contains('done') ) {
            taskItem.classList.add('done');
        }
    });
    let markedTaskItem;
    const TASKS_INBOX_ARRAY = JSON.parse( window.localStorage.getItem('TasksInbox') );
    let markedTaskIndexAtTasksInboxArray = 0; //? DEFAULT VALUE
    TASKS_INBOX_ARRAY.forEach(task => {
        if (task.code === markedTaskCode) {
            markedTaskIndexAtTasksInboxArray = TASKS_INBOX_ARRAY.indexOf(task);
        }
    });
    if (currentCheckedStatus === false) {
        if (markedTaskIndexAtTasksInboxArray !== -1) {
            markedTaskItem = TASKS_INBOX_ARRAY[markedTaskIndexAtTasksInboxArray];
            markedTaskItem.status = 'Doing';
            TASKS_INBOX_ARRAY.splice(markedTaskIndexAtTasksInboxArray, 1, markedTaskItem);
            window.localStorage.setItem( 'TasksInbox', JSON.stringify(TASKS_INBOX_ARRAY) );
        }
        if (markedTaskCategory === 'Custom Tasks') {
            const CUSTOM_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('CustomTasks') );
            let markedCustomTaskIndexAtCustomTasksArray = 0; //? DEFAULT VALUE 
            CUSTOM_TASKS_ARRAY.forEach(customTask => {
                if (customTask.code === markedTaskCode) {
                    markedCustomTaskIndexAtCustomTasksArray = CUSTOM_TASKS_ARRAY.indexOf(customTask);
                }
            });
            if (markedCustomTaskIndexAtCustomTasksArray !== -1) {
                markedTaskItem = CUSTOM_TASKS_ARRAY[markedCustomTaskIndexAtCustomTasksArray];
                markedTaskItem.status = 'Doing';
                CUSTOM_TASKS_ARRAY.splice(markedCustomTaskIndexAtCustomTasksArray, 1, markedTaskItem);
                window.localStorage.setItem( 'CustomTasks', JSON.stringify(CUSTOM_TASKS_ARRAY) );
            }
        } else if (markedTaskCategory === 'Repetitive Tasks') {
            const REPETITIVE_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('RepetitiveTasks') );
            let markedRepetitiveTaskIndexAtRepetitiveTasksArray = 0; //? DEFAULT VALUE 
            REPETITIVE_TASKS_ARRAY.forEach(repetitiveTask => {
                if (repetitiveTask.code === markedTaskCode) {
                    markedRepetitiveTaskIndexAtRepetitiveTasksArray = REPETITIVE_TASKS_ARRAY.indexOf(repetitiveTask);
                }
            });
            if (markedRepetitiveTaskIndexAtRepetitiveTasksArray !== -1) {
                markedTaskItem = REPETITIVE_TASKS_ARRAY[markedRepetitiveTaskIndexAtRepetitiveTasksArray];
                markedTaskItem.status = 'Doing';
                REPETITIVE_TASKS_ARRAY.splice(markedRepetitiveTaskIndexAtRepetitiveTasksArray, 1, markedTaskItem);
                window.localStorage.setItem( 'RepetitiveTasks', JSON.stringify(REPETITIVE_TASKS_ARRAY) );
            }
        }
    } else if (currentCheckedStatus === true) {
        
        if (markedTaskIndexAtTasksInboxArray !== -1) {
            markedTaskItem = TASKS_INBOX_ARRAY[markedTaskIndexAtTasksInboxArray];
            markedTaskItem.status = 'Done';
            TASKS_INBOX_ARRAY.splice(markedTaskIndexAtTasksInboxArray, 1, markedTaskItem);
            window.localStorage.setItem( 'TasksInbox', JSON.stringify(TASKS_INBOX_ARRAY) );
        }
        if (markedTaskCategory === 'Custom Tasks') {
            const CUSTOM_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('CustomTasks') );
            let markedCustomTaskIndexAtCustomTasksArray = 0; //? DEFAULT VALUE 
            CUSTOM_TASKS_ARRAY.forEach(customTask => {
                if (customTask.code === markedTaskCode) {
                    markedCustomTaskIndexAtCustomTasksArray = CUSTOM_TASKS_ARRAY.indexOf(customTask);
                }
            });
            if (markedCustomTaskIndexAtCustomTasksArray !== -1) {
                markedTaskItem = CUSTOM_TASKS_ARRAY[markedCustomTaskIndexAtCustomTasksArray];
                markedTaskItem.status = 'Done';
                CUSTOM_TASKS_ARRAY.splice(markedCustomTaskIndexAtCustomTasksArray, 1, markedTaskItem);
                window.localStorage.setItem( 'CustomTasks', JSON.stringify(CUSTOM_TASKS_ARRAY) );
            }
        } else if (markedTaskCategory === 'Repetitive Tasks') {
            const REPETITIVE_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('RepetitiveTasks') );
            let markedRepetitiveTaskIndexAtRepetitiveTasksArray = 0; //? DEFAULT VALUE 
            REPETITIVE_TASKS_ARRAY.forEach(repetitiveTask => {
                if (repetitiveTask.code === markedTaskCode) {
                    markedRepetitiveTaskIndexAtRepetitiveTasksArray = REPETITIVE_TASKS_ARRAY.indexOf(repetitiveTask);
                }
            });
            if (markedRepetitiveTaskIndexAtRepetitiveTasksArray !== -1) {
                markedTaskItem = REPETITIVE_TASKS_ARRAY[markedRepetitiveTaskIndexAtRepetitiveTasksArray];
                markedTaskItem.status = 'Done';
                REPETITIVE_TASKS_ARRAY.splice(markedRepetitiveTaskIndexAtRepetitiveTasksArray, 1, markedTaskItem);
                window.localStorage.setItem( 'RepetitiveTasks', JSON.stringify(REPETITIVE_TASKS_ARRAY) );
            }
        }
    }
}