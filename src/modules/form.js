import { updateLocalStorageForTaskData } from "./data";
import { Task, generateTaskCode, createTaskListItem, createMatrixAreaListITem } from "./content";
import { updateCurrentTasksCount } from "./helpers";

function createTaskCreationForm() {
    const TASK_CREATION_FORM = document.createElement('form');
        TASK_CREATION_FORM.action = 'https://httpbin.org/post';
        TASK_CREATION_FORM.method = 'post';
        TASK_CREATION_FORM.id = 'task-creation-form';
        TASK_CREATION_FORM.classList.add('task-creation-form', 'hide');
        TASK_CREATION_FORM.addEventListener('submit', (f) => f.preventDefault());

        const CurrentFormValues = {
            taskTitle: '',
            taskDetails: '',
            taskDeadline: '',
            taskImportance: false,
            taskUrgency: false,
            taskRepeating: '',
        }

        const MAIN_FIELDSET = document.createElement('fieldset');
        MAIN_FIELDSET.className = 'main-fieldset';

            const TOP_LEGEND_TEXT = document.createElement('legend');
                TOP_LEGEND_TEXT.textContent = 'Create a new task!';
            MAIN_FIELDSET.appendChild(TOP_LEGEND_TEXT);

            const TASK_TITLE_LABEL = document.createElement('label');
                TASK_TITLE_LABEL.htmlFor = 'task_title-input';
                TASK_TITLE_LABEL.textContent = 'Title (Required):'
            
                const TASK_TITLE_INPUT = document.createElement('input');
                    TASK_TITLE_INPUT.type = 'text';
                    TASK_TITLE_INPUT.name = 'task-title';
                    TASK_TITLE_INPUT.id = 'task_title-input';
                    TASK_TITLE_INPUT.maxLength = '15';
                TASK_TITLE_LABEL.appendChild(TASK_TITLE_INPUT);

                TASK_TITLE_INPUT.oninput = (e) => {
                    updateCurrentFormValues('taskTitle', e.target.value);
                };

            MAIN_FIELDSET.appendChild(TASK_TITLE_LABEL);

            const TASK_DETAILS_LABEL = document.createElement('label');
                TASK_DETAILS_LABEL.htmlFor = 'task_details-textarea';
                TASK_DETAILS_LABEL.textContent = 'Details (Optional):';

                const TASK_DETAILS_TEXTAREA = document.createElement('textarea');
                    TASK_DETAILS_TEXTAREA.id = 'task_details-textarea';
                    TASK_DETAILS_TEXTAREA.className = 'task_details-textarea';
                    TASK_DETAILS_TEXTAREA.name = 'task-details';
                TASK_DETAILS_LABEL.appendChild(TASK_DETAILS_TEXTAREA);

                TASK_DETAILS_TEXTAREA.oninput = (e) => {
                    updateCurrentFormValues('taskDetails', e.target.value);
                };
            
            MAIN_FIELDSET.appendChild(TASK_DETAILS_LABEL);

            const TASK_DATE_LABEL = document.createElement('label');
                TASK_DATE_LABEL.htmlFor = 'task_date-input';
                TASK_DATE_LABEL.textContent = 'Deadline:';

                const TASK_DATE_INPUT = document.createElement('input');
                    TASK_DATE_INPUT.type = 'date';
                    TASK_DATE_INPUT.name = 'task-deadline';
                    TASK_DATE_INPUT.id = 'task_date-input';
                TASK_DATE_LABEL.appendChild(TASK_DATE_INPUT);

                TASK_DATE_INPUT.oninput = (e) => {
                    updateCurrentFormValues('taskDeadline', e.target.value);
                };

            MAIN_FIELDSET.appendChild(TASK_DATE_LABEL);

            const TOP_HORIZONTAL_LINE = document.createElement('hr');
            MAIN_FIELDSET.appendChild(TOP_HORIZONTAL_LINE);

            const PRIORITY_STATUS_SUB_FIELDSET = document.createElement('fieldset');
            PRIORITY_STATUS_SUB_FIELDSET.classList.add('priority-questions', 'sub-fieldset');

                const PRIORITY_STATUS_LEGEND_TEXT = document.createElement('legend');
                    PRIORITY_STATUS_LEGEND_TEXT.textContent = 'Priority Setting Questions:';
                PRIORITY_STATUS_SUB_FIELDSET.appendChild(PRIORITY_STATUS_LEGEND_TEXT);

                const URGENCY_STATUS_LABEL = document.createElement('label');
                URGENCY_STATUS_LABEL.htmlFor = 'task_urgency-status-input';

                    const URGENCY_STATUS_INPUT = document.createElement('input');
                        URGENCY_STATUS_INPUT.type = 'checkbox';
                        URGENCY_STATUS_INPUT.name = 'task-urgency-answer';
                        URGENCY_STATUS_INPUT.id = 'task_urgency-status-input';

                    URGENCY_STATUS_LABEL.textContent = 'Is this urgent?';
                    URGENCY_STATUS_LABEL.appendChild(URGENCY_STATUS_INPUT);

                    URGENCY_STATUS_INPUT.onchange = (e) => {
                        updateCurrentFormValues('taskUrgency', e.target.checked);
                    };

                PRIORITY_STATUS_SUB_FIELDSET.appendChild(URGENCY_STATUS_LABEL);

                const SUB_VERTICAL_LINE = document.createElement('hr');
                PRIORITY_STATUS_SUB_FIELDSET.appendChild(SUB_VERTICAL_LINE);

                const IMPORTANCE_STATUS_LABEL = document.createElement('label');
                IMPORTANCE_STATUS_LABEL.htmlFor = 'task_importance-status-input';

                    const IMPORTANCE_STATUS_INPUT = document.createElement('input');
                        IMPORTANCE_STATUS_INPUT.type = 'checkbox';
                        IMPORTANCE_STATUS_INPUT.name = 'task_importance-answer';
                        IMPORTANCE_STATUS_INPUT.id = 'task_importance-status-input';

                    IMPORTANCE_STATUS_LABEL.textContent = 'Is this important?';
                    IMPORTANCE_STATUS_LABEL.appendChild(IMPORTANCE_STATUS_INPUT);

                    IMPORTANCE_STATUS_INPUT.onchange = (e) => {
                        updateCurrentFormValues('taskImportance', e.target.checked);
                    };

                PRIORITY_STATUS_SUB_FIELDSET.appendChild(IMPORTANCE_STATUS_LABEL);

            MAIN_FIELDSET.appendChild(PRIORITY_STATUS_SUB_FIELDSET);

            const REPEAT_STATUS_SUB_FIELDSET = document.createElement('fieldset');
            REPEAT_STATUS_SUB_FIELDSET.classList.add('repeat-status', 'sub-fieldset');

                const REPEAT_STATUS_LEGEND_TEXT = document.createElement('legend');
                    REPEAT_STATUS_LEGEND_TEXT.textContent = 'Setting Repeat Status:';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(REPEAT_STATUS_LEGEND_TEXT);

                const EACH_DAY_RADIO_BTN = document.createElement('input');
                    EACH_DAY_RADIO_BTN.type = 'radio';
                    EACH_DAY_RADIO_BTN.name = 'task-repeat-status';
                    EACH_DAY_RADIO_BTN.value = 'Each Day';
                    EACH_DAY_RADIO_BTN.id = 'repeat-status_each-day';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_DAY_RADIO_BTN);

                EACH_DAY_RADIO_BTN.onclick = (e) => {
                    updateCurrentFormValues('taskRepeating', e.target.value);
                };

                const EACH_DAY_RADIO_LABEL = document.createElement('label');
                    EACH_DAY_RADIO_LABEL.role = 'button';
                    EACH_DAY_RADIO_LABEL.htmlFor = 'repeat-status_each-day';
                    EACH_DAY_RADIO_LABEL.className = 'repeat-status_each-day';
                    EACH_DAY_RADIO_LABEL.textContent = 'Each Day';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_DAY_RADIO_LABEL);

                const EACH_WEEK_RADIO_BTN = document.createElement('input');
                    EACH_WEEK_RADIO_BTN.type = 'radio';
                    EACH_WEEK_RADIO_BTN.name = 'task-repeat-status';
                    EACH_WEEK_RADIO_BTN.value = 'Each Week';
                    EACH_WEEK_RADIO_BTN.id = 'repeat-status_each-week';
                    REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_WEEK_RADIO_BTN);

                    EACH_WEEK_RADIO_BTN.onclick = (e) => {
                        updateCurrentFormValues('taskRepeating', e.target.value);
                    };

                const EACH_WEEK_RADIO_LABEL = document.createElement('label');
                    EACH_WEEK_RADIO_LABEL.role = 'button';
                    EACH_WEEK_RADIO_LABEL.htmlFor = 'repeat-status_each-week';
                    EACH_WEEK_RADIO_LABEL.className = 'repeat-status_each-week';
                    EACH_WEEK_RADIO_LABEL.textContent = 'Each Week';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_WEEK_RADIO_LABEL);

                const EACH_MONTH_RADIO_BTN = document.createElement('input');
                    EACH_MONTH_RADIO_BTN.type = 'radio';
                    EACH_MONTH_RADIO_BTN.name = 'task-repeat-status';
                    EACH_MONTH_RADIO_BTN.value = 'Each Month';
                    EACH_MONTH_RADIO_BTN.id = 'repeat-status_each-month';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_MONTH_RADIO_BTN);

                EACH_MONTH_RADIO_BTN.onclick = (e) => {
                    updateCurrentFormValues('taskRepeating', e.target.value);
                };

                const EACH_MONTH_RADIO_LABEL = document.createElement('label');
                    EACH_MONTH_RADIO_LABEL.role = 'button';
                    EACH_MONTH_RADIO_LABEL.htmlFor = 'repeat-status_each-month';
                    EACH_MONTH_RADIO_LABEL.className = 'repeat-status_each-month';
                    EACH_MONTH_RADIO_LABEL.textContent = 'Each Month';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_MONTH_RADIO_LABEL);

                const NO_REPEAT_RADIO_BTN = document.createElement('input');
                    NO_REPEAT_RADIO_BTN.type = 'radio';
                    NO_REPEAT_RADIO_BTN.name = 'task-repeat-status';
                    NO_REPEAT_RADIO_BTN.value = 'No Repeat';
                    NO_REPEAT_RADIO_BTN.id = 'repeat-status_no-repeat';
                    NO_REPEAT_RADIO_BTN.checked = 'true';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(NO_REPEAT_RADIO_BTN);

                NO_REPEAT_RADIO_BTN.onclick = (e) => {
                    updateCurrentFormValues('taskRepeating', e.target.value);
                };

                const NO_REPEAT_RADIO_LABEL = document.createElement('label');
                    NO_REPEAT_RADIO_LABEL.role = 'button';
                    NO_REPEAT_RADIO_LABEL.htmlFor = 'repeat-status_no-repeat';
                    NO_REPEAT_RADIO_LABEL.className = 'repeat-status_no-repeat';
                    NO_REPEAT_RADIO_LABEL.textContent = 'No Repeat';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(NO_REPEAT_RADIO_LABEL);

            MAIN_FIELDSET.appendChild(REPEAT_STATUS_SUB_FIELDSET);

            const CLOSE_FORM_BTN = document.createElement('button');
                CLOSE_FORM_BTN.className = 'close-form-btn';
                CLOSE_FORM_BTN.title = 'click this button for close the form';
                CLOSE_FORM_BTN.addEventListener('click', hideTaskCreationForm);

                const CLOSE_FORM_BTN_ICON = document.createElement('i');
                    CLOSE_FORM_BTN_ICON.classList.add('fa-solid', 'fa-x');
                CLOSE_FORM_BTN.appendChild(CLOSE_FORM_BTN_ICON);

            MAIN_FIELDSET.appendChild(CLOSE_FORM_BTN);

        TASK_CREATION_FORM.appendChild(MAIN_FIELDSET);

        const CONFIRM_FORM_BTN = document.createElement('input');
            CONFIRM_FORM_BTN.type = 'submit';
            CONFIRM_FORM_BTN.value = 'CREATE';
            CONFIRM_FORM_BTN.className = 'create-task-btn';
        TASK_CREATION_FORM.appendChild(CONFIRM_FORM_BTN);

        CONFIRM_FORM_BTN.addEventListener('click', validateTaskCreationForm);

    document.querySelector('.sidebar-menu-subsection').appendChild(TASK_CREATION_FORM);

    const CURRENT_FORM_DATA = window.localStorage.getItem('CurrentFormValues');
        if (CURRENT_FORM_DATA !== null) {

            const CURRENT_FORM_VALUES = JSON.parse(CURRENT_FORM_DATA);
                TASK_TITLE_INPUT.value = CURRENT_FORM_VALUES.taskTitle;
                TASK_DETAILS_TEXTAREA.value = CURRENT_FORM_VALUES.taskDetails;
                TASK_DATE_INPUT.value = CURRENT_FORM_VALUES.taskDeadline;
                URGENCY_STATUS_INPUT.checked = CURRENT_FORM_VALUES.taskUrgency;
                IMPORTANCE_STATUS_INPUT.checked = CURRENT_FORM_VALUES.taskImportance;

                document.getElementsByName('task-repeat-status').forEach(radioBtn => {
                    if (radioBtn.value === CURRENT_FORM_VALUES.taskRepeating) {
                        radioBtn.checked = true;
                    }
                });
    }

    function updateCurrentFormValues(key, value) {
        const CURRENT_FORM_VALUES = JSON.parse( window.localStorage.getItem('CurrentFormValues') );
        if (CURRENT_FORM_VALUES) {
            CURRENT_FORM_VALUES[key] = value;
            window.localStorage.setItem( 'CurrentFormValues', JSON.stringify(CURRENT_FORM_VALUES) );
        } else {
            CurrentFormValues[key] = value;
            window.localStorage.setItem( 'CurrentFormValues', JSON.stringify(CurrentFormValues) );
        }
    }
}

export function showTaskCreationForm() {
    const NEW_TASK_BTN = document.querySelector('.new-task-btn');

    NEW_TASK_BTN.addEventListener('click', () => {
        if ( document.querySelector('.task-creation-form') ) {
            document.querySelector('.task-creation-form').classList.remove('hide');
            document.querySelector('.task-creation-form').hidden = false;
            document.querySelector('.menu-buttons-container').classList.add('hide');
        } else {
            createTaskCreationForm();
            document.querySelector('.menu-buttons-container').classList.add('hide');
            setTimeout(() => document.querySelector('.task-creation-form').classList.remove('hide'), 1);
        }
    });
}

function hideTaskCreationForm() {
    if ( document.querySelector('.task-creation-form') ) {
        document.querySelector('.task-creation-form').classList.add('hide')
        document.querySelector('.task-creation-form').hidden = true;
        document.querySelector('.task-creation-form').reset();
        window.localStorage.removeItem('CurrentFormValues');
        document.querySelector('.menu-buttons-container').classList.remove('hide');
        document.querySelector('#repeat-status_no-repeat').checked = true;
        document.querySelector('#task_date-input').removeAttribute('class');
        document.querySelectorAll('.popup-background').forEach( popBg => popBg.remove() );
    }
}

function validateTaskCreationForm() {
    let isThereInvalidInput = 'NO';

    const TASK_CODE = generateTaskCode();
    const TASK_TITLE = document.querySelector('#task_title-input').value;
    const TASK_DETAILS = document.querySelector('#task_details-textarea').value;
    const TASK_DEADLINE = document.querySelector('#task_date-input').value;
    
    let taskCategoryName;

    const IMPORTANCE_STATUS_CHECKED = document.querySelector('#task_importance-status-input').checked === true;
    const URGENCY_STATUS_CHECKED = document.querySelector('#task_urgency-status-input').checked === true;

    let taskPriorityRating;

    const TASK_REPEAT_STATUS = document.querySelector(`input[name=task-repeat-status]:checked`).value;

    if (IMPORTANCE_STATUS_CHECKED && URGENCY_STATUS_CHECKED) {
        taskPriorityRating = 'High Priority';
    } else if (IMPORTANCE_STATUS_CHECKED || URGENCY_STATUS_CHECKED) {
        taskPriorityRating = 'Medium Priority';
    } else {
        taskPriorityRating = 'Low Priority';
    }

    if (TASK_REPEAT_STATUS === 'No Repeat') {
        taskCategoryName = 'Custom Tasks';
    } else {
        taskCategoryName = 'Repetitive Tasks';
    }

    const CURRENT_TIME =  new Date().toLocaleDateString().split('.').reverse().join('-');
    
    if (TASK_DEADLINE !== '') {
        if (TASK_DEADLINE < CURRENT_TIME) {
            document.querySelector('#task_date-input').className = 'invalid-date-input';
            isThereInvalidInput = 'YES';
            document.getElementById('task-creation-form').appendChild(
                showInvalidInputErrorMessage("The deadline entered cannot be a past date.")
            );
        } else if (TASK_REPEAT_STATUS !== 'No Repeat') {
            document.querySelector('#task_date-input').className = 'invalid-date-input';
            isThereInvalidInput = 'YES';
            document.getElementById('task-creation-form').appendChild(
                showInvalidInputErrorMessage("If you have selected a deadline for the task, you need to check 'No Repeat'.")
            );
        }
    } else if (TASK_REPEAT_STATUS === 'No Repeat') {
        document.querySelector('#task_date-input').className = 'invalid-date-input';
        isThereInvalidInput = 'YES';
        document.getElementById('task-creation-form').appendChild(
            showInvalidInputErrorMessage("If 'No Repeat' is checked, you need to select a deadline for the task.")
        );
    }  else {
        document.querySelector('#task_date-input').removeAttribute('class');
        isThereInvalidInput = 'NO';
    }

    let tasksListItem;
    
    if (isThereInvalidInput === 'NO') {
        tasksListItem = new Task(
            TASK_CODE,
            taskCategoryName,
            TASK_TITLE,
            TASK_DETAILS,
            TASK_DEADLINE,
            taskPriorityRating,
            IMPORTANCE_STATUS_CHECKED,
            URGENCY_STATUS_CHECKED,
            TASK_REPEAT_STATUS,
            'To Do'
        );

        //? create task list item for 'task inbox'
        document.querySelector('.tasks-list.inbox').appendChild(
            createTaskListItem(
                tasksListItem.code, 
                tasksListItem.category,
                tasksListItem.title, 
                tasksListItem.details,
                tasksListItem.deadline, 
                tasksListItem.repeating,
                tasksListItem.priority,
                tasksListItem.status,
                'Wide Area'
            )
        );

        if (taskCategoryName === 'Custom Tasks') {
            //? create custom task list item for 'side area'
            document.querySelector('.custom.tasks-list.side-area').appendChild(
                createTaskListItem(
                    tasksListItem.code, 
                    tasksListItem.category,
                    tasksListItem.title, 
                    tasksListItem.details,
                    tasksListItem.deadline, 
                    tasksListItem.repeating,
                    tasksListItem.priority,
                    tasksListItem.status,
                    'Side Area'
                )
            );
    
            //? create custom task list item for 'wide area'
            document.querySelector('.custom.tasks-list.wide-area').appendChild(
                createTaskListItem(
                    tasksListItem.code, 
                    tasksListItem.category,
                    tasksListItem.title, 
                    tasksListItem.details,
                    tasksListItem.deadline, 
                    tasksListItem.repeating,
                    tasksListItem.priority,
                    tasksListItem.status,
                    'Wide Area'
                )
            );
    
            updateLocalStorageForTaskData(tasksListItem, 'Custom Tasks');
        } else if (taskCategoryName === 'Repetitive Tasks') {
            //? create repetitive task list item for 'side area'
            document.querySelector('.repetitive.tasks-list.side-area').appendChild(
                createTaskListItem(
                    tasksListItem.code,
                    tasksListItem.category,
                    tasksListItem.title, 
                    tasksListItem.details,
                    tasksListItem.deadline, 
                    tasksListItem.repeating,
                    tasksListItem.priority,
                    tasksListItem.status,
                    'Side Area'
                )
            );
    
            //? create repetitive task list item for 'wide area'
            document.querySelector('.repetitive.tasks-list.wide-area').appendChild(
                createTaskListItem(
                    tasksListItem.code,
                    tasksListItem.category,
                    tasksListItem.title, 
                    tasksListItem.details,
                    tasksListItem.deadline, 
                    tasksListItem.repeating,
                    tasksListItem.priority,
                    tasksListItem.status,
                    'Wide Area'
                )
            );

            updateLocalStorageForTaskData(tasksListItem, 'Repetitive Tasks');
        }

        //? create task list item for 'matrix area'
        const MATRIX_AREA_LI = createTaskListItem(
            tasksListItem.code, 
            tasksListItem.category,
            tasksListItem.title, 
            tasksListItem.details,
            tasksListItem.deadline, 
            tasksListItem.repeating,
            tasksListItem.priority,
            tasksListItem.status,
            'Matrix Area'
        );

        createMatrixAreaListITem(taskPriorityRating, IMPORTANCE_STATUS_CHECKED, URGENCY_STATUS_CHECKED, MATRIX_AREA_LI);
        updateCurrentTasksCount();
        hideTaskCreationForm();
    }
}

export function createTaskUpdateForm(taskCode, taskTitle, taskDetails, taskDeadline, taskUrgency, taskImportance, taskRepeating, taskStatus) { /* CURRENT VALUES */
    const TASK_UPDATE_FORM = document.createElement('form');
        TASK_UPDATE_FORM.action = 'https://httpbin.org/post';
        TASK_UPDATE_FORM.method = 'post';
        TASK_UPDATE_FORM.id = 'task-update-form';
        TASK_UPDATE_FORM.className = 'task-update-form';
        TASK_UPDATE_FORM.addEventListener('submit', (f) => f.preventDefault());

        const FORM_MAIN_FIELDSET = document.createElement('fieldset');
            FORM_MAIN_FIELDSET.className = 'main-fieldset'
        TASK_UPDATE_FORM.appendChild(FORM_MAIN_FIELDSET);

            const MAIN_FIELDSET_LEGEND = document.createElement('legend');
                MAIN_FIELDSET_LEGEND.textContent = 'Update this task';
            FORM_MAIN_FIELDSET.appendChild(MAIN_FIELDSET_LEGEND);

            const TASK_TITLE_LABEL = document.createElement('label');
                TASK_TITLE_LABEL.textContent = 'Title:'
                TASK_TITLE_LABEL.htmlFor = 'task-title-input';

                const TASK_TITLE_INPUT = document.createElement('input');
                    TASK_TITLE_INPUT.type = 'text';
                    TASK_TITLE_INPUT.name = 'task-title';
                    TASK_TITLE_INPUT.value = taskTitle;
                    TASK_TITLE_INPUT.id = 'task-title-input';
                    TASK_TITLE_INPUT.maxLength = '15';
                TASK_TITLE_LABEL.appendChild(TASK_TITLE_INPUT);

            FORM_MAIN_FIELDSET.appendChild(TASK_TITLE_LABEL);

            const TASK_DETAILS_LABEL = document.createElement('label');
                TASK_DETAILS_LABEL.textContent = 'Details:';
                TASK_DETAILS_LABEL.htmlFor = 'task-details-textarea';
            
                const TASK_DETAILS_TEXTAREA = document.createElement('textarea');
                    TASK_DETAILS_TEXTAREA.name = 'task-details';
                    TASK_DETAILS_TEXTAREA.value = taskDetails;
                    TASK_DETAILS_TEXTAREA.id = 'task-details-textarea';
                TASK_DETAILS_LABEL.appendChild(TASK_DETAILS_TEXTAREA);

            FORM_MAIN_FIELDSET.appendChild(TASK_DETAILS_LABEL);

            const TASK_DEADLINE_LABEL = document.createElement('label');
                TASK_DEADLINE_LABEL.textContent = 'Deadline:';
                TASK_DEADLINE_LABEL.htmlFor = 'task-deadline-input';

                const TASK_DEADLINE_INPUT = document.createElement('input');
                    TASK_DEADLINE_INPUT.type = 'date';
                    TASK_DEADLINE_INPUT.name = 'task-deadline';
                    TASK_DEADLINE_INPUT.value = taskDeadline;
                    TASK_DEADLINE_INPUT.id = 'task-deadline-input';
                TASK_DEADLINE_LABEL.appendChild(TASK_DEADLINE_INPUT);

            FORM_MAIN_FIELDSET.appendChild(TASK_DEADLINE_INPUT);

                const PRIORTY_QUESTIONS_FIELDSET = document.createElement('fieldset');
                    PRIORTY_QUESTIONS_FIELDSET.classList.add('priority-questions', 'sub-fieldset');

                    const PRIORTY_QUESTIONS_FIELDSET_LEGEND = document.createElement('legend');
                        PRIORTY_QUESTIONS_FIELDSET_LEGEND.textContent = 'Priority Setting Questions:';
                    PRIORTY_QUESTIONS_FIELDSET.appendChild(PRIORTY_QUESTIONS_FIELDSET_LEGEND);

                    const TASK_URGENCY_QUESTION_LABEL = document.createElement('label');
                        TASK_URGENCY_QUESTION_LABEL.textContent = 'Is this urgent?';
                        TASK_URGENCY_QUESTION_LABEL.htmlFor = 'task-urgency-question-checkbox';

                        const TASK_URGENCY_QUESTION_INPUT = document.createElement('input');
                            TASK_URGENCY_QUESTION_INPUT.type = 'checkbox';
                            TASK_URGENCY_QUESTION_INPUT.name = 'task-urgency';
                            TASK_URGENCY_QUESTION_INPUT.checked = taskUrgency;
                            TASK_URGENCY_QUESTION_INPUT.id = 'task-urgency-question-checkbox';
                        TASK_URGENCY_QUESTION_LABEL.appendChild(TASK_URGENCY_QUESTION_INPUT);

                    PRIORTY_QUESTIONS_FIELDSET.appendChild(TASK_URGENCY_QUESTION_LABEL);  
                    
                    const PRIORTY_QUESTIONS_FIELDSET_PILLAR = document.createElement('hr');
                    PRIORTY_QUESTIONS_FIELDSET.appendChild(PRIORTY_QUESTIONS_FIELDSET_PILLAR);

                    const TASK_IMPORTANCE_QUESTION_LABEL = document.createElement('label');
                        TASK_IMPORTANCE_QUESTION_LABEL.textContent = 'Is this important?';
                        TASK_IMPORTANCE_QUESTION_LABEL.htmlFor = 'task-importance-question-checkbox';

                        const TASK_IMPORTANCE_QUESTION_INPUT = document.createElement('input');
                            TASK_IMPORTANCE_QUESTION_INPUT.type = 'checkbox';
                            TASK_IMPORTANCE_QUESTION_INPUT.name = 'task-importance';
                            TASK_IMPORTANCE_QUESTION_INPUT.checked = taskImportance;
                            TASK_IMPORTANCE_QUESTION_INPUT.id = 'task-importance-question-checkbox';
                        TASK_IMPORTANCE_QUESTION_LABEL.appendChild(TASK_IMPORTANCE_QUESTION_INPUT);

                    PRIORTY_QUESTIONS_FIELDSET.appendChild(TASK_IMPORTANCE_QUESTION_LABEL);

                FORM_MAIN_FIELDSET.appendChild(PRIORTY_QUESTIONS_FIELDSET);

                const REPEATING_STATUS_FIELDSET = document.createElement('fieldset');
                    REPEATING_STATUS_FIELDSET.classList.add('repeating-status', 'sub-fieldset');

                    const REPEATING_STATUS_FIELDSET_LEGEND = document.createElement('legend');
                        REPEATING_STATUS_FIELDSET_LEGEND.textContent = 'Setting Repeat Status:'
                    REPEATING_STATUS_FIELDSET.appendChild(REPEATING_STATUS_FIELDSET_LEGEND);

                    const EACH_DAY_RADIO_BTN = document.createElement('input');
                        EACH_DAY_RADIO_BTN.type = 'radio';
                        EACH_DAY_RADIO_BTN.name = 'update-task-repeat-status';
                        EACH_DAY_RADIO_BTN.value = 'Each Day';
                        EACH_DAY_RADIO_BTN.id = 'repeat-status_each-day';
                    REPEATING_STATUS_FIELDSET.appendChild(EACH_DAY_RADIO_BTN);

                    if (EACH_DAY_RADIO_BTN.value === taskRepeating) {
                        EACH_DAY_RADIO_BTN.checked = true;
                    }

                    const EACH_DAY_RADIO_LABEL = document.createElement('label');
                        EACH_DAY_RADIO_LABEL.role = 'button';
                        EACH_DAY_RADIO_LABEL.htmlFor = 'repeat-status_each-day';
                        EACH_DAY_RADIO_LABEL.className = 'repeat-status_each-day';
                        EACH_DAY_RADIO_LABEL.textContent = 'Each Day';
                    REPEATING_STATUS_FIELDSET.appendChild(EACH_DAY_RADIO_LABEL);

                    const EACH_WEEK_RADIO_BTN = document.createElement('input');
                        EACH_WEEK_RADIO_BTN.type = 'radio';
                        EACH_WEEK_RADIO_BTN.name = 'update-task-repeat-status';
                        EACH_WEEK_RADIO_BTN.value = 'Each Week';
                        EACH_WEEK_RADIO_BTN.id = 'repeat-status_each-week';
                    REPEATING_STATUS_FIELDSET.appendChild(EACH_WEEK_RADIO_BTN);

                    if (EACH_WEEK_RADIO_BTN.value === taskRepeating) {
                        EACH_WEEK_RADIO_BTN.checked = true;
                    }

                    const EACH_WEEK_RADIO_LABEL = document.createElement('label');
                        EACH_WEEK_RADIO_LABEL.role = 'button';
                        EACH_WEEK_RADIO_LABEL.htmlFor = 'repeat-status_each-week';
                        EACH_WEEK_RADIO_LABEL.className = 'repeat-status_each-week';
                        EACH_WEEK_RADIO_LABEL.textContent = 'Each Week';
                    REPEATING_STATUS_FIELDSET.appendChild(EACH_WEEK_RADIO_LABEL);

                    const EACH_MONTH_RADIO_BTN = document.createElement('input');
                        EACH_MONTH_RADIO_BTN.type = 'radio';
                        EACH_MONTH_RADIO_BTN.name = 'update-task-repeat-status';
                        EACH_MONTH_RADIO_BTN.value = 'Each Month';
                        EACH_MONTH_RADIO_BTN.id = 'repeat-status_each-month';
                    REPEATING_STATUS_FIELDSET.appendChild(EACH_MONTH_RADIO_BTN);

                    if (EACH_MONTH_RADIO_BTN.value === taskRepeating) {
                        EACH_MONTH_RADIO_BTN.checked = true;
                    }

                    const EACH_MONTH_RADIO_LABEL = document.createElement('label');
                        EACH_MONTH_RADIO_LABEL.role = 'button';
                        EACH_MONTH_RADIO_LABEL.htmlFor = 'repeat-status_each-month';
                        EACH_MONTH_RADIO_LABEL.className = 'repeat-status_each-month';
                        EACH_MONTH_RADIO_LABEL.textContent = 'Each Month';
                    REPEATING_STATUS_FIELDSET.appendChild(EACH_MONTH_RADIO_LABEL);

                    const NO_REPEAT_RADIO_BTN = document.createElement('input');
                        NO_REPEAT_RADIO_BTN.type = 'radio';
                        NO_REPEAT_RADIO_BTN.name = 'update-task-repeat-status';
                        NO_REPEAT_RADIO_BTN.value = 'No Repeat';
                        NO_REPEAT_RADIO_BTN.id = 'repeat-status_no-repeat';
                    REPEATING_STATUS_FIELDSET.appendChild(NO_REPEAT_RADIO_BTN);

                    if (NO_REPEAT_RADIO_BTN.value === taskRepeating) {
                        NO_REPEAT_RADIO_BTN.checked = true;
                    }
                    
                    const NO_REPEAT_RADIO_LABEL = document.createElement('label');
                        NO_REPEAT_RADIO_LABEL.role = 'button';
                        NO_REPEAT_RADIO_LABEL.htmlFor = 'repeat-status_no-repeat';
                        NO_REPEAT_RADIO_LABEL.className = 'repeat-status_no-repeat';
                        NO_REPEAT_RADIO_LABEL.textContent = 'No Repeat';
                    REPEATING_STATUS_FIELDSET.appendChild(NO_REPEAT_RADIO_LABEL);

                FORM_MAIN_FIELDSET.appendChild(REPEATING_STATUS_FIELDSET);

                const PROGRESS_STATUS_FIELDSET = document.createElement('fieldset');
                    PROGRESS_STATUS_FIELDSET.classList.add('progress-status', 'sub-fieldset');

                    const PROGRESS_STATUS_FIELDSET_LEGEND = document.createElement('legend');
                        PROGRESS_STATUS_FIELDSET_LEGEND.textContent = 'Current Progress Status:';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_FIELDSET_LEGEND);

                    const PROGRESS_STATUS_TODO_INPUT = document.createElement('input');
                        PROGRESS_STATUS_TODO_INPUT.type = 'radio';
                        PROGRESS_STATUS_TODO_INPUT.name = 'task-progress-status';
                        PROGRESS_STATUS_TODO_INPUT.value = 'To Do';
                        PROGRESS_STATUS_TODO_INPUT.checked = true;
                        PROGRESS_STATUS_TODO_INPUT.id = 'progress-status_todo';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_TODO_INPUT);

                    const PROGRESS_STATUS_TODO_LABEL = document.createElement('label');
                        PROGRESS_STATUS_TODO_LABEL.role = 'button';
                        PROGRESS_STATUS_TODO_LABEL.htmlFor = 'progress-status_todo';
                        PROGRESS_STATUS_TODO_LABEL.className = 'progress-status-btn';
                        PROGRESS_STATUS_TODO_LABEL.textContent = 'To Do';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_TODO_LABEL);

                    const PROGRESS_STATUS_DOING_INPUT = document.createElement('input');
                        PROGRESS_STATUS_DOING_INPUT.type = 'radio';
                        PROGRESS_STATUS_DOING_INPUT.name = 'task-progress-status';
                        PROGRESS_STATUS_DOING_INPUT.value = 'Doing';
                        PROGRESS_STATUS_DOING_INPUT.id = 'progress-status_doing';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_DOING_INPUT);

                    if (PROGRESS_STATUS_DOING_INPUT.value === taskStatus) {
                        PROGRESS_STATUS_DOING_INPUT.checked = true;
                    }

                    const PROGRESS_STATUS_DOING_LABEL = document.createElement('label');
                        PROGRESS_STATUS_DOING_LABEL.role = 'button';
                        PROGRESS_STATUS_DOING_LABEL.htmlFor = 'progress-status_doing';
                        PROGRESS_STATUS_DOING_LABEL.className = 'progress-status-btn';
                        PROGRESS_STATUS_DOING_LABEL.textContent = 'Doing';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_DOING_LABEL);

                    const PROGRESS_STATUS_DONE_INPUT = document.createElement('input');
                        PROGRESS_STATUS_DONE_INPUT.type = 'radio';
                        PROGRESS_STATUS_DONE_INPUT.name = 'task-progress-status';
                        PROGRESS_STATUS_DONE_INPUT.value = 'Done';
                        PROGRESS_STATUS_DONE_INPUT.id = 'progress-status_done';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_DONE_INPUT);

                    if (PROGRESS_STATUS_DONE_INPUT.value === taskStatus) {
                        PROGRESS_STATUS_DONE_INPUT.checked = true;
                    }

                    const PROGRESS_STATUS_DONE_LABEL = document.createElement('label');
                        PROGRESS_STATUS_DONE_LABEL.role = 'button';
                        PROGRESS_STATUS_DONE_LABEL.htmlFor = 'progress-status_done';
                        PROGRESS_STATUS_DONE_LABEL.className = 'progress-status-btn';
                        PROGRESS_STATUS_DONE_LABEL.textContent = 'Done';
                    PROGRESS_STATUS_FIELDSET.appendChild(PROGRESS_STATUS_DONE_LABEL);

                FORM_MAIN_FIELDSET.appendChild(PROGRESS_STATUS_FIELDSET);

                document.getElementsByName('task-progress-status').forEach(radioBtn => {
                    if (radioBtn.value === taskStatus) {
                        radioBtn.checked = true;
                    }
                });

        const TASK_UPDATE_FORM_FOOTER = document.createElement('footer');
            const CONFIRM_UPDATE_BTN = document.createElement('button');
                CONFIRM_UPDATE_BTN.className = 'confirm-update-btn';
                CONFIRM_UPDATE_BTN.textContent = 'CONFIRM';
            TASK_UPDATE_FORM_FOOTER.appendChild(CONFIRM_UPDATE_BTN);

                CONFIRM_UPDATE_BTN.addEventListener('click', () => {
                    validateTaskUpdateForm(taskCode);
                });

            const CANCEL_UPDATE_BTN = document.createElement('button');
                CANCEL_UPDATE_BTN.className = 'cancel-update-btn';
                CANCEL_UPDATE_BTN.textContent = 'CANCEL';
            TASK_UPDATE_FORM_FOOTER.appendChild(CANCEL_UPDATE_BTN);

                CANCEL_UPDATE_BTN.onclick = () => {
                    TASK_UPDATE_FORM.remove();
                    document.querySelectorAll('.popup-background').forEach( popBg => popBg.remove() );
                }

        TASK_UPDATE_FORM.appendChild(TASK_UPDATE_FORM_FOOTER);
                
    return TASK_UPDATE_FORM;
}

function validateTaskUpdateForm(updatedTaskCode) {
    let isThereInvalidInput = 'NO';

    const TASK_CODE = updatedTaskCode;
    const TASK_TITLE = document.querySelector('#task-title-input').value;
    const TASK_DETAILS = document.querySelector('#task-details-textarea').value;
    const TASK_DEADLINE = document.querySelector('#task-deadline-input').value;
    
    let updatedTaskCategory;

    const URGENCY_STATUS_CHECKED = document.querySelector('#task-urgency-question-checkbox').checked === true;
    const IMPORTANCE_STATUS_CHECKED = document.querySelector('#task-importance-question-checkbox').checked === true;

    let taskPriorityRating;

    const TASK_REPEAT_STATUS = document.querySelector(`input[name=update-task-repeat-status]:checked`).value;

    const TASK_PROGRESS_STATUS = document.querySelector(`input[name=task-progress-status]:checked`).value;

    if (IMPORTANCE_STATUS_CHECKED && URGENCY_STATUS_CHECKED) {
        taskPriorityRating = 'High Priority';
    } else if (IMPORTANCE_STATUS_CHECKED || URGENCY_STATUS_CHECKED) {
        taskPriorityRating = 'Medium Priority';
    } else {
        taskPriorityRating = 'Low Priority';
    }

    if (TASK_REPEAT_STATUS === 'No Repeat') {
        updatedTaskCategory = 'Custom Tasks';
    } else {
        updatedTaskCategory = 'Repetitive Tasks';
    }

    const CURRENT_TIME =  new Date().toLocaleDateString().split('.').reverse().join('-');
    
    if (TASK_DEADLINE != '') {
        if (TASK_DEADLINE < CURRENT_TIME) {
            document.querySelector('#task-deadline-input').className = 'invalid-date-input';
            isThereInvalidInput = 'YES';
            document.getElementById('task-update-form').appendChild(
                showInvalidInputErrorMessage("The deadline entered cannot be a past date.")
            );
        } else if (TASK_REPEAT_STATUS !== 'No Repeat') {
            document.querySelector('#task-deadline-input').className = 'invalid-date-input';
            isThereInvalidInput = 'YES';
            document.getElementById('task-update-form').appendChild(
                showInvalidInputErrorMessage("If you have selected a deadline for the task, you need to check 'No Repeat'.")
            );
        }
    } else if (TASK_REPEAT_STATUS === 'No Repeat') {
        document.querySelector('#task-deadline-input').className = 'invalid-date-input';
        isThereInvalidInput = 'YES';
        document.getElementById('task-update-form').appendChild(
            showInvalidInputErrorMessage("If 'No Repeat' is checked, you need to select a deadline for the task.")
        );
    } else {
        document.querySelector('#task-deadline-input').removeAttribute('class');
        isThereInvalidInput = 'NO';
    }

    const TASKS_INBOX_ARRAY = JSON.parse( window.localStorage.getItem('TasksInbox') );
    const CUSTOM_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('CustomTasks') );
    const REPETITIVE_TASKS_ARRAY = JSON.parse( window.localStorage.getItem('RepetitiveTasks') );

    let outdatedTaskIndex = 0; //? DEFAULT VALUE

    TASKS_INBOX_ARRAY.forEach(task => {
        if (task.code === updatedTaskCode) {
            outdatedTaskIndex = TASKS_INBOX_ARRAY.indexOf(task);
        }
    });

    let updatedTask;

    if (isThereInvalidInput === 'NO') {
        updatedTask = new Task(
            TASK_CODE,
            updatedTaskCategory,
            TASK_TITLE,
            TASK_DETAILS,
            TASK_DEADLINE,
            taskPriorityRating,
            IMPORTANCE_STATUS_CHECKED,
            URGENCY_STATUS_CHECKED,
            TASK_REPEAT_STATUS,
            TASK_PROGRESS_STATUS
        );

        if (outdatedTaskIndex !== -1) {
            TASKS_INBOX_ARRAY.splice(outdatedTaskIndex, 1, updatedTask);
            window.localStorage.setItem( 'TasksInbox', JSON.stringify(TASKS_INBOX_ARRAY) );
        }

        //? REMOVE ALL OUTDATED TASK LIST ITEMS
        document.querySelectorAll('.tasks-list-item').forEach(taskListItem => {
            if (taskListItem.dataset.taskCode === updatedTaskCode) {
                taskListItem.remove();
            }
        });

        //? create updated task list item for 'task inbox'
        const TASKS_LIST_INBOX = document.querySelector('.tasks-list.inbox');
        TASKS_LIST_INBOX.insertBefore(
            createTaskListItem(
                updatedTask.code, 
                updatedTask.category,
                updatedTask.title, 
                updatedTask.details,
                updatedTask.deadline, 
                updatedTask.repeating,
                updatedTask.priority,
                updatedTask.status,
                'Wide Area'
            ),
            TASKS_LIST_INBOX.children[outdatedTaskIndex]
        );

        if (updatedTaskCategory === 'Custom Tasks') {
            let outdatedCustomTaskIndex = -1; //? DEFAULT VALUE
            CUSTOM_TASKS_ARRAY.forEach(customTask => {
                if (customTask.code === updatedTaskCode) {
                    outdatedCustomTaskIndex = CUSTOM_TASKS_ARRAY.indexOf(customTask);
                }
            });
            if (outdatedCustomTaskIndex !== -1) {
                CUSTOM_TASKS_ARRAY.splice(outdatedCustomTaskIndex, 1, updatedTask);
            } else {
                outdatedCustomTaskIndex = CUSTOM_TASKS_ARRAY.length;
                REPETITIVE_TASKS_ARRAY.forEach(repetitiveTask => {
                    if (repetitiveTask.code === updatedTaskCode) {
                        outdatedTaskIndex = REPETITIVE_TASKS_ARRAY.indexOf(repetitiveTask);
                    }
                });
                REPETITIVE_TASKS_ARRAY.splice(outdatedTaskIndex, 1);
                window.localStorage.setItem( 'RepetitiveTasks', JSON.stringify(REPETITIVE_TASKS_ARRAY) );
                CUSTOM_TASKS_ARRAY.push(updatedTask);
            }
            window.localStorage.setItem( 'CustomTasks', JSON.stringify(CUSTOM_TASKS_ARRAY) );
    
            //? create custom task list item for 'side area'
            const CUSTOM_TASKS_LIST_SIDE_AREA = document.querySelector('.custom.tasks-list.side-area');
            CUSTOM_TASKS_LIST_SIDE_AREA.insertBefore(
                createTaskListItem(
                    updatedTask.code, 
                    updatedTask.category, 
                    updatedTask.title, 
                    updatedTask.details,
                    updatedTask.deadline, 
                    updatedTask.repeating,
                    updatedTask.priority,
                    updatedTask.status,
                    'Side Area'
                ),
                CUSTOM_TASKS_LIST_SIDE_AREA.children[outdatedCustomTaskIndex]
            );
    
            //? create custom task list item for 'wide area'
            const CUSTOM_TASKS_LIST_WIDE_AREA = document.querySelector('.custom.tasks-list.wide-area');
            CUSTOM_TASKS_LIST_WIDE_AREA.insertBefore(
                createTaskListItem(
                    updatedTask.code, 
                    updatedTask.category, 
                    updatedTask.title, 
                    updatedTask.details,
                    updatedTask.deadline, 
                    updatedTask.repeating,
                    updatedTask.priority,
                    updatedTask.status,
                    'Wide Area'
                ),
                CUSTOM_TASKS_LIST_WIDE_AREA.children[outdatedCustomTaskIndex]
            );
        } else if (updatedTaskCategory === 'Repetitive Tasks') {
            let outdatedRepetitiveTaskIndex = -1; //? DEFAULT VALUE
            REPETITIVE_TASKS_ARRAY.forEach(repetitiveTask => {
                if (repetitiveTask.code === updatedTaskCode) {
                    outdatedRepetitiveTaskIndex = REPETITIVE_TASKS_ARRAY.indexOf(repetitiveTask);
                }
            });
            if (outdatedRepetitiveTaskIndex !== -1) {
                REPETITIVE_TASKS_ARRAY.splice(outdatedRepetitiveTaskIndex, 1, updatedTask);
            } else {
                outdatedRepetitiveTaskIndex = REPETITIVE_TASKS_ARRAY.length;
                CUSTOM_TASKS_ARRAY.forEach(customTask => {
                    if (customTask.code === updatedTaskCode) {
                        outdatedTaskIndex = CUSTOM_TASKS_ARRAY.indexOf(customTask);
                    }
                });
                CUSTOM_TASKS_ARRAY.splice(outdatedTaskIndex, 1);
                window.localStorage.setItem( 'CustomTasks', JSON.stringify(CUSTOM_TASKS_ARRAY) );
                REPETITIVE_TASKS_ARRAY.push(updatedTask);
            }
            window.localStorage.setItem( 'RepetitiveTasks', JSON.stringify(REPETITIVE_TASKS_ARRAY) );
    
            //? create repetitive task list item for 'side area'
            const REPETITIVE_TASKS_LIST_SIDE_AREA = document.querySelector('.repetitive.tasks-list.side-area');
            REPETITIVE_TASKS_LIST_SIDE_AREA.insertBefore(
                createTaskListItem(
                    updatedTask.code, 
                    updatedTask.category, 
                    updatedTask.title, 
                    updatedTask.details,
                    updatedTask.deadline, 
                    updatedTask.repeating,
                    updatedTask.priority,
                    updatedTask.status,
                    'Side Area'
                ),
                REPETITIVE_TASKS_LIST_SIDE_AREA.children[outdatedRepetitiveTaskIndex]
            );
    
            //? create repetitive task list item for 'wide area'
            const REPETITIVE_TASKS_LIST_WIDE_AREA = document.querySelector('.repetitive.tasks-list.wide-area');
            REPETITIVE_TASKS_LIST_WIDE_AREA.insertBefore(
                createTaskListItem(
                    updatedTask.code,
                    updatedTask.category, 
                    updatedTask.title, 
                    updatedTask.details,
                    updatedTask.deadline, 
                    updatedTask.repeating,
                    updatedTask.priority,
                    updatedTask.status,
                    'Wide Area'
                ),
                REPETITIVE_TASKS_LIST_WIDE_AREA.children[outdatedRepetitiveTaskIndex]
            );
        }
        //? create updated task list item for 'matrix area'
        const MATRIX_AREA_LI = createTaskListItem(
            updatedTask.code, 
            updatedTask.category, 
            updatedTask.title, 
            updatedTask.details,
            updatedTask.deadline, 
            updatedTask.repeating,
            updatedTask.priority,
            updatedTask.status,
            'Matrix Area'
        );

        createMatrixAreaListITem(taskPriorityRating, IMPORTANCE_STATUS_CHECKED, URGENCY_STATUS_CHECKED, MATRIX_AREA_LI);
        updateCurrentTasksCount();
        removeTaskUpdateForm();
    }
}

function removeTaskUpdateForm() {
    document.getElementById('task-update-form').remove();
    document.querySelectorAll('.popup-background').forEach( popBg => popBg.remove() );
}

function showInvalidInputErrorMessage(messageText) {
    const ERROR_MESSAGE_BOX = document.createElement('article');
    ERROR_MESSAGE_BOX.className = 'error-message-box';

        const ERROR_MESSAGE_TEXT = document.createElement('p');
            ERROR_MESSAGE_TEXT.className = 'error-message-text';
            ERROR_MESSAGE_TEXT.textContent = messageText;
        ERROR_MESSAGE_BOX.appendChild(ERROR_MESSAGE_TEXT);
        
        const CLOSE_MESSAGE_BTN = document.createElement('button');
            CLOSE_MESSAGE_BTN.className = 'close-message-btn';
            CLOSE_MESSAGE_BTN.textContent = 'CLOSE MESSAGE BOX';
        ERROR_MESSAGE_BOX.appendChild(CLOSE_MESSAGE_BTN);

        CLOSE_MESSAGE_BTN.addEventListener( 'click', () => ERROR_MESSAGE_BOX.remove() );

    return ERROR_MESSAGE_BOX;
}