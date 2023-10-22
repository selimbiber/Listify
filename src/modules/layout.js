import { deleteAllTaskListItems } from "./content";
import filterTasksBySelectedOption from "./filter";

function createHeaderSection() {
    const HEADER_SECTION = document.createElement('header');
    HEADER_SECTION.className = 'header-section';

        const SIDEBAR_SLIDER = document.createElement('div');
            SIDEBAR_SLIDER.className = 'sidebar-slider';
            SIDEBAR_SLIDER.role = 'button';

            const TOGGLE_MENU_CHECKBOX_INPUT = document.createElement('input');
                TOGGLE_MENU_CHECKBOX_INPUT.type = 'checkbox';
                TOGGLE_MENU_CHECKBOX_INPUT.setAttribute('id', 'toggle-menu_checkbox-btn');
                TOGGLE_MENU_CHECKBOX_INPUT.className = 'toggle-menu_checkbox-btn';
                TOGGLE_MENU_CHECKBOX_INPUT.name = 'toggle-menu_checkbox-btn';
            SIDEBAR_SLIDER.appendChild(TOGGLE_MENU_CHECKBOX_INPUT);

            const TOGGLE_MENU_CHECKBOX_LABEL = document.createElement('label');
                TOGGLE_MENU_CHECKBOX_LABEL.htmlFor = 'toggle-menu_checkbox-btn';
            SIDEBAR_SLIDER.appendChild(TOGGLE_MENU_CHECKBOX_LABEL);

        HEADER_SECTION.appendChild(SIDEBAR_SLIDER);

        const TOP_HEADING = document.createElement('h1');
            TOP_HEADING.className = 'top-heading';
            TOP_HEADING.textContent = 'Listify';
        HEADER_SECTION.appendChild(TOP_HEADING);

        const TOGGLE_THEME_CHECKBOX_LABEL = document.createElement('label');
            TOGGLE_THEME_CHECKBOX_LABEL.htmlFor = 'toggle-theme_checkbox-btn';
            TOGGLE_THEME_CHECKBOX_LABEL.className = 'toggle-theme_btn-container';

            const TOGGLE_THEME_CHECKBOX_INPUT = document.createElement('input');
            TOGGLE_THEME_CHECKBOX_INPUT.role = 'switch';
                TOGGLE_THEME_CHECKBOX_INPUT.type = 'checkbox';
                TOGGLE_THEME_CHECKBOX_INPUT.name = 'toggle-theme_checkbox-btn';
                TOGGLE_THEME_CHECKBOX_INPUT.setAttribute('id', 'toggle-theme_checkbox-btn');
            TOGGLE_THEME_CHECKBOX_LABEL.appendChild(TOGGLE_THEME_CHECKBOX_INPUT);

            const TOGGLE_THEME_SLIDER_ROUND = document.createElement('div');
                TOGGLE_THEME_SLIDER_ROUND.classList.add('toggle-theme_slider', 'slider-round');
            TOGGLE_THEME_CHECKBOX_LABEL.appendChild(TOGGLE_THEME_SLIDER_ROUND);

        HEADER_SECTION.appendChild(TOGGLE_THEME_CHECKBOX_LABEL);
    
    return HEADER_SECTION;
}               

function createMainSection() {
    const MAIN_SECTION = document.createElement('main');
    MAIN_SECTION.className = 'main-section';

        const SIDEBAR_MENU_SUBSECTION = document.createElement('section');
        SIDEBAR_MENU_SUBSECTION.className = 'sidebar-menu-subsection';

            const TASKS_INBOX_HEADER = document.createElement('header');
                TASKS_INBOX_HEADER.title = 'Click for view all tasks';
                TASKS_INBOX_HEADER.role = 'button';
                TASKS_INBOX_HEADER.ariaPressed = true;
                TASKS_INBOX_HEADER.tabIndex = 0;
                TASKS_INBOX_HEADER.classList.add('menu', 'tasks-inbox', 'btn');

                const TASKS_INBOX_HEADING = document.createElement('h2');
                TASKS_INBOX_HEADING.className = 'tasks-inbox-heading';

                TASKS_INBOX_HEADING.textContent = 'Tasks Inbox:';

                    const TASKS_INBOX_ICON = document.createElement('i');
                        TASKS_INBOX_ICON.classList.add('fas', 'fa-inbox', 'menu-icon');
                        TASKS_INBOX_ICON.hidden = 'true';
                    TASKS_INBOX_HEADING.appendChild(TASKS_INBOX_ICON);

                TASKS_INBOX_HEADER.appendChild(TASKS_INBOX_HEADING);

                const TASKS_INBOX_COUNT = document.createElement('p');
                    TASKS_INBOX_COUNT.classList.add('inbox', 'task-count');
                    TASKS_INBOX_COUNT.title = 'Task inbox current quantity value'
                    TASKS_INBOX_COUNT.textContent = '0'; //? DEFAULT VALUE
                TASKS_INBOX_HEADER.appendChild(TASKS_INBOX_COUNT);

            SIDEBAR_MENU_SUBSECTION.appendChild(TASKS_INBOX_HEADER);

            const CUSTOM_TASKS_HEADER = document.createElement('header');
                CUSTOM_TASKS_HEADER.title = 'Click for view all custom tasks';
                CUSTOM_TASKS_HEADER.role = 'button';
                CUSTOM_TASKS_HEADER.ariaPressed = false;
                CUSTOM_TASKS_HEADER.tabIndex = 0;
                CUSTOM_TASKS_HEADER.classList.add('menu', 'custom-tasks', 'btn');

                const CUSTOM_TASKS_HEADING = document.createElement('h3');
                    CUSTOM_TASKS_HEADING.className = 'custom-tasks-heading';
                    CUSTOM_TASKS_HEADING.textContent = 'Custom Tasks:'
                    const CUSTOM_SVG_ICON = `
                        <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-repeat-off" fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24" hidden><path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z" /></svg>
                    `;
                CUSTOM_TASKS_HEADING.innerHTML += CUSTOM_SVG_ICON;
                CUSTOM_TASKS_HEADER.appendChild(CUSTOM_TASKS_HEADING);

                const CUSTOM_TASKS_COUNT = document.createElement('p');
                    CUSTOM_TASKS_COUNT.classList.add('custom', 'task-count');
                    CUSTOM_TASKS_COUNT.textContent = '0'; //? DEFAULT VALUE
                CUSTOM_TASKS_HEADER.appendChild(CUSTOM_TASKS_COUNT);
            
            SIDEBAR_MENU_SUBSECTION.appendChild(CUSTOM_TASKS_HEADER);

            const CUSTOM_TASK_LIST = document.createElement('ul');
                CUSTOM_TASK_LIST.classList.add('custom', 'tasks-list', 'side-area');
            SIDEBAR_MENU_SUBSECTION.appendChild(CUSTOM_TASK_LIST);

            const REPETITIVE_TASKS_HEADER = document.createElement('header');
                REPETITIVE_TASKS_HEADER.title = 'Click for view all repetitive tasks';
                REPETITIVE_TASKS_HEADER.role = 'button';
                REPETITIVE_TASKS_HEADER.ariaPressed = false;
                REPETITIVE_TASKS_HEADER.tabIndex = 0;
                REPETITIVE_TASKS_HEADER.classList.add('menu', 'repetitive-tasks', 'btn');

                const REPETITIVE_TASKS_HEADING = document.createElement('h3');
                    REPETITIVE_TASKS_HEADING.className = 'repetitive-tasks-heading';
                    REPETITIVE_TASKS_HEADING.textContent = 'Repetitive Tasks:'
                    const REPETITIVE_SVG_ICON = `
                        <svg class="menu-icon" fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" hidden>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17 7H7V11H5V6C5 5.44772 5.44772 5 6 5H17V2L21 6L17 10V7ZM7 17H17V13H19V18C19 18.5523 18.5523 19 18 19H7V22L3 18L7 14V17Z" />
                        </svg>
                    `;
                REPETITIVE_TASKS_HEADING.innerHTML += REPETITIVE_SVG_ICON;
                REPETITIVE_TASKS_HEADER.appendChild(REPETITIVE_TASKS_HEADING);

                const REPETITIVE_TASKS_COUNT = document.createElement('p');
                    REPETITIVE_TASKS_COUNT.classList.add('repetitive', 'task-count');
                    REPETITIVE_TASKS_COUNT.textContent = '0'; //? DEFAULT VALUE
                REPETITIVE_TASKS_HEADER.appendChild(REPETITIVE_TASKS_COUNT);

            SIDEBAR_MENU_SUBSECTION.appendChild(REPETITIVE_TASKS_HEADER);

            const REPETITIVE_TASK_LIST = document.createElement('ul');
                REPETITIVE_TASK_LIST.classList.add('repetitive', 'tasks-list', 'side-area');
            SIDEBAR_MENU_SUBSECTION.appendChild(REPETITIVE_TASK_LIST);

            const MENU_BUTTONS_CONTAINER = document.createElement('footer');
            MENU_BUTTONS_CONTAINER.className = 'menu-buttons-container';

                const EMPTY_INBOX_BTN = document.createElement('button');
                    EMPTY_INBOX_BTN.className = 'empty-inbox-btn';
                    EMPTY_INBOX_BTN.textContent = 'Empty Task Inbox';
                    EMPTY_INBOX_BTN.addEventListener('click', deleteAllTaskListItems);
                MENU_BUTTONS_CONTAINER.appendChild(EMPTY_INBOX_BTN);

                const NEW_TASKS_BTN = document.createElement('button');
                    NEW_TASKS_BTN.className = 'new-task-btn';
                    NEW_TASKS_BTN.textContent = 'Create New Task';
                MENU_BUTTONS_CONTAINER.appendChild(NEW_TASKS_BTN);

            SIDEBAR_MENU_SUBSECTION.appendChild(MENU_BUTTONS_CONTAINER);

        MAIN_SECTION.appendChild(SIDEBAR_MENU_SUBSECTION);

        //! TASKS AREA SUBSECTION
        const TASKS_AREA_SUBSECTION = document.createElement('section');
        TASKS_AREA_SUBSECTION.classList.add('tasks-area-subsection', 'centering');

            //! TASKS AREA SUBSECTION -> TASKS INBOX AREA
            const TASKS_INBOX_AREA = document.createElement('section');
            TASKS_INBOX_AREA.classList.add('tasks-inbox', 'area');
        
                const TASKS_INBOX_AREA_HEADER = document.createElement('header');
                TASKS_INBOX_AREA_HEADER.className = 'tasks-area-header';

                    const SELECT_TASKS_FILTER = document.createElement('select');
                        SELECT_TASKS_FILTER.name = 'select-tasks-filter';
                        SELECT_TASKS_FILTER.className = 'select-tasks-filter';

                        const DEFAULT_OPTION = document.createElement('option');
                            DEFAULT_OPTION.value = 'no-selected-filter-option';
                            DEFAULT_OPTION.textContent = 'Select Tasks Filter';
                        SELECT_TASKS_FILTER.appendChild(DEFAULT_OPTION);

                        const REPEATING_FREQUENCY_OPTION_GROUP = document.createElement('optgroup');
                            REPEATING_FREQUENCY_OPTION_GROUP.label = 'Filter by Repeating Frequency';

                            const DAILY_TO_MONTHLY_SORTING_OPTION = document.createElement('option');
                                DAILY_TO_MONTHLY_SORTING_OPTION.value = 'daily-to-monthly-sorting-option';
                                DAILY_TO_MONTHLY_SORTING_OPTION.textContent = 'Sort "Daily" to "Monthly"';
                            REPEATING_FREQUENCY_OPTION_GROUP.appendChild(DAILY_TO_MONTHLY_SORTING_OPTION);

                            const MONTHLY_TO_DAILY_SORTING_OPTION = document.createElement('option');
                                MONTHLY_TO_DAILY_SORTING_OPTION.value = 'monthly-to-daily-sorting-option';
                                MONTHLY_TO_DAILY_SORTING_OPTION.textContent = 'Sort "Monthly" to "Daily"';
                            REPEATING_FREQUENCY_OPTION_GROUP.appendChild(MONTHLY_TO_DAILY_SORTING_OPTION);

                        SELECT_TASKS_FILTER.appendChild(REPEATING_FREQUENCY_OPTION_GROUP);

                        const PROGRESS_STATUS_OPTION_GROUP = document.createElement('optgroup');
                            PROGRESS_STATUS_OPTION_GROUP.label = 'Filter by Progress Status';

                            const TODO_TO_DONE_SORTING_OPTION = document.createElement('option');
                                TODO_TO_DONE_SORTING_OPTION.value = 'to_do-to-done-sorting-option';
                                TODO_TO_DONE_SORTING_OPTION.textContent = 'Sort "To Do" to "Done"';
                            PROGRESS_STATUS_OPTION_GROUP.appendChild(TODO_TO_DONE_SORTING_OPTION);

                            const DONE_TO_TODO_SORTING_OPTION = document.createElement('option');
                                DONE_TO_TODO_SORTING_OPTION.value = 'done-to-to_do-sorting-option';
                                DONE_TO_TODO_SORTING_OPTION.textContent = 'Sort "Done" to "To Do"';
                            PROGRESS_STATUS_OPTION_GROUP.appendChild(DONE_TO_TODO_SORTING_OPTION);

                        SELECT_TASKS_FILTER.appendChild(PROGRESS_STATUS_OPTION_GROUP);

                        const REMAINING_DAY_OPTION_GROUP = document.createElement('optgroup');
                            REMAINING_DAY_OPTION_GROUP.label = 'Filter by Remaining Day';
                        SELECT_TASKS_FILTER.appendChild(REMAINING_DAY_OPTION_GROUP);

                            const FROM_MANY_TO_FEW = document.createElement('option');
                                FROM_MANY_TO_FEW.value = 'many-to-few-day-sorting-option';
                                FROM_MANY_TO_FEW.textContent = 'Many to Few Day';
                            REMAINING_DAY_OPTION_GROUP.appendChild(FROM_MANY_TO_FEW);

                            const FROM_FEW_TO_MANY = document.createElement('option');
                                FROM_FEW_TO_MANY.value = 'few-to-many-day-sorting-option';
                                FROM_FEW_TO_MANY.textContent = 'Few to Many Day';
                            REMAINING_DAY_OPTION_GROUP.appendChild(FROM_FEW_TO_MANY);

                        SELECT_TASKS_FILTER.appendChild(REMAINING_DAY_OPTION_GROUP);
                        
                        SELECT_TASKS_FILTER.addEventListener('change', (e) => {
                            filterTasksBySelectedOption(e.target.value);
                        });

                    TASKS_INBOX_AREA_HEADER.appendChild(SELECT_TASKS_FILTER);

                    const TASKS_INBOX_AREA_HEADING = document.createElement('h2');
                        TASKS_INBOX_AREA_HEADING.className = 'tasks-area-heading';
                        TASKS_INBOX_AREA_HEADING.textContent = 'Tasks Inbox';
                    TASKS_INBOX_AREA_HEADER.appendChild(TASKS_INBOX_AREA_HEADING);

                    const SHOW_PRIORITY_MATRIX_BTN = document.createElement('button');
                        SHOW_PRIORITY_MATRIX_BTN.className = 'show-priority-matrix-btn';
                        SHOW_PRIORITY_MATRIX_BTN.title = 'Click on this button to show the priority matrix created with these tasks';
                    TASKS_INBOX_AREA_HEADER.appendChild(SHOW_PRIORITY_MATRIX_BTN);

                TASKS_INBOX_AREA.appendChild(TASKS_INBOX_AREA_HEADER);
        
                const TASKS_INBOX_AREA_LIST = document.createElement('ul');
                    TASKS_INBOX_AREA_LIST.classList.add('tasks-list', 'inbox');
                TASKS_INBOX_AREA.appendChild(TASKS_INBOX_AREA_LIST);
            TASKS_AREA_SUBSECTION.appendChild(TASKS_INBOX_AREA);
            
            //! TASKS AREA SUBSECTION -> CUSTOM TASKS AREA
            const CUSTOM_TASKS_AREA = document.createElement('section');
            CUSTOM_TASKS_AREA.classList.add('custom-tasks', 'area', 'hide');
        
                const CUSTOM_TASKS_AREA_HEADER = document.createElement('header');
                CUSTOM_TASKS_AREA_HEADER.className = 'tasks-area-header';
                    const CUSTOM_TASKS_AREA_HEADING = document.createElement('h3');
                        CUSTOM_TASKS_AREA_HEADING.className = 'tasks-area-heading';
                        CUSTOM_TASKS_AREA_HEADING.textContent = 'Custom Tasks';
                    CUSTOM_TASKS_AREA_HEADER.appendChild(CUSTOM_TASKS_AREA_HEADING);
                CUSTOM_TASKS_AREA.appendChild(CUSTOM_TASKS_AREA_HEADER);
        
                const CUSTOM_TASKS_AREA_LIST = document.createElement('ul');
                    CUSTOM_TASKS_AREA_LIST.classList.add('custom', 'tasks-list', 'wide-area');
                CUSTOM_TASKS_AREA.appendChild(CUSTOM_TASKS_AREA_LIST);
            TASKS_AREA_SUBSECTION.appendChild(CUSTOM_TASKS_AREA);

            //! TASKS AREA SUBSECTION -> REPETITIVE TASKS AREA
            const REPETITIVE_TASKS_AREA = document.createElement('section');
            REPETITIVE_TASKS_AREA.classList.add('repetitive-tasks', 'area', 'hide');
        
                const REPETITIVE_TASKS_AREA_HEADER = document.createElement('header');
                REPETITIVE_TASKS_AREA_HEADER.className = 'tasks-area-header';
                    const REPETITIVE_TASKS_AREA_HEADING = document.createElement('h3');
                        REPETITIVE_TASKS_AREA_HEADING.className = 'tasks-area-heading';
                        REPETITIVE_TASKS_AREA_HEADING.textContent = 'Repetitive Tasks';
                    REPETITIVE_TASKS_AREA_HEADER.appendChild(REPETITIVE_TASKS_AREA_HEADING);
                REPETITIVE_TASKS_AREA.appendChild(REPETITIVE_TASKS_AREA_HEADER);
        
                const REPETITIVE_TASKS_AREA_LIST = document.createElement('ul');
                    REPETITIVE_TASKS_AREA_LIST.classList.add('repetitive', 'tasks-list', 'wide-area');
                REPETITIVE_TASKS_AREA.appendChild(REPETITIVE_TASKS_AREA_LIST);
            TASKS_AREA_SUBSECTION.appendChild(REPETITIVE_TASKS_AREA);

            //! TASKS AREA SUBSECTION -> PRIORITY MATRIX AREA
            const PRIORITY_MATRIX_AREA = document.createElement('section');
            PRIORITY_MATRIX_AREA.classList.add('priority-matrix', 'area', 'hide');
        
                const HIGH_PRIORITY_TASKS_CONTAINER = document.createElement('div');
                HIGH_PRIORITY_TASKS_CONTAINER.classList.add('high-priority-tasks', 'container');
        
                    const IMPORTANT_URGENT_TASKS_BOX = document.createElement('div');
                    IMPORTANT_URGENT_TASKS_BOX.classList.add('important-urgent-tasks', 'box');
        
                        const IMPORTANT_URGENT_TASKS_HEADER = document.createElement('header');
                        IMPORTANT_URGENT_TASKS_HEADER.classList.add('important-urgent-tasks', 'header');
        
                            const IMPORTANT_URGENT_TASKS_HEADING = document.createElement('h3');
                                IMPORTANT_URGENT_TASKS_HEADING.classList.add('important-urgent-tasks', 'heading');
                                IMPORTANT_URGENT_TASKS_HEADING.textContent = 'Important and urgent tasks';
                            IMPORTANT_URGENT_TASKS_HEADER.appendChild(IMPORTANT_URGENT_TASKS_HEADING);
        
                            const IMPORTANT_URGENT_TASKS_PRIORITY = document.createElement('p');
                                IMPORTANT_URGENT_TASKS_PRIORITY.classList.add('important-urgent-tasks', 'priority');
                                IMPORTANT_URGENT_TASKS_PRIORITY.textContent = 'Do';
                            IMPORTANT_URGENT_TASKS_HEADER.appendChild(IMPORTANT_URGENT_TASKS_PRIORITY);
        
                        IMPORTANT_URGENT_TASKS_BOX.appendChild(IMPORTANT_URGENT_TASKS_HEADER);
        
                        const IMPORTANT_URGENT_TASKS_LIST = document.createElement('ul');
                            IMPORTANT_URGENT_TASKS_LIST.classList.add('important-urgent-tasks', 'list');
                        IMPORTANT_URGENT_TASKS_BOX.appendChild(IMPORTANT_URGENT_TASKS_LIST);
        
                    HIGH_PRIORITY_TASKS_CONTAINER.appendChild(IMPORTANT_URGENT_TASKS_BOX);
                PRIORITY_MATRIX_AREA.appendChild(HIGH_PRIORITY_TASKS_CONTAINER);
        
                const MEDIUM_PRIORITY_TASKS_CONTAINER = document.createElement('div');
                MEDIUM_PRIORITY_TASKS_CONTAINER.classList.add('medium-priority-tasks', 'container');
        
                    const JUST_IMPORTANT_TASKS_BOX = document.createElement('div');
                    JUST_IMPORTANT_TASKS_BOX.classList.add('just-important-tasks', 'box');
        
                        const JUST_IMPORTANT_TASKS_HEADER = document.createElement('header');
                        JUST_IMPORTANT_TASKS_HEADER.classList.add('just-important-tasks', 'header');
        
                            const JUST_IMPORTANT_TASKS_HEADING = document.createElement('h3');
                                JUST_IMPORTANT_TASKS_HEADING.classList.add('just-important-tasks', 'heading');
                                JUST_IMPORTANT_TASKS_HEADING.textContent = 'Important but unurgent tasks';
                            JUST_IMPORTANT_TASKS_HEADER.appendChild(JUST_IMPORTANT_TASKS_HEADING);
        
                            const JUST_IMPORTANT_TASKS_PRIORITY = document.createElement('p');
                                JUST_IMPORTANT_TASKS_PRIORITY.classList.add('just-important-tasks', 'priority');
                                JUST_IMPORTANT_TASKS_PRIORITY.textContent = 'Schedule';
                            JUST_IMPORTANT_TASKS_HEADER.appendChild(JUST_IMPORTANT_TASKS_PRIORITY);
        
                        JUST_IMPORTANT_TASKS_BOX.appendChild(JUST_IMPORTANT_TASKS_HEADER);
        
                        const JUST_IMPORTANT_TASKS_LIST = document.createElement('ul');
                            JUST_IMPORTANT_TASKS_LIST.classList.add('just-important-tasks', 'list');
                        JUST_IMPORTANT_TASKS_BOX.appendChild(JUST_IMPORTANT_TASKS_LIST);
        
                    MEDIUM_PRIORITY_TASKS_CONTAINER.appendChild(JUST_IMPORTANT_TASKS_BOX);
        
                    const JUST_URGENT_TASKS_BOX = document.createElement('div');
                    JUST_URGENT_TASKS_BOX.classList.add('just-urgent-tasks', 'box');
        
                        const JUST_URGENT_TASKS_HEADER = document.createElement('header');
                        JUST_URGENT_TASKS_HEADER.classList.add('just-urgent-tasks', 'header');
        
                            const JUST_URGENT_TASKS_HEADING = document.createElement('h3');
                                JUST_URGENT_TASKS_HEADING.classList.add('just-urgent-tasks', 'heading');
                                JUST_URGENT_TASKS_HEADING.textContent = 'Urgent but unimportant tasks';
                            JUST_URGENT_TASKS_HEADER.appendChild(JUST_URGENT_TASKS_HEADING);
        
                            const JUST_URGENT_TASKS_PRIORITY = document.createElement('p');
                                JUST_URGENT_TASKS_PRIORITY.classList.add('just-urgent-tasks', 'priority');
                                JUST_URGENT_TASKS_PRIORITY.textContent = 'Delegate';
                            JUST_URGENT_TASKS_HEADER.appendChild(JUST_URGENT_TASKS_PRIORITY);
        
                        JUST_URGENT_TASKS_BOX.appendChild(JUST_URGENT_TASKS_HEADER);
        
                        const JUST_URGENT_TASKS_LIST = document.createElement('ul');
                            JUST_URGENT_TASKS_LIST.classList.add('just-urgent-tasks', 'list');
                        JUST_URGENT_TASKS_BOX.appendChild(JUST_URGENT_TASKS_LIST);
        
                    MEDIUM_PRIORITY_TASKS_CONTAINER.appendChild(JUST_URGENT_TASKS_BOX);
        
                PRIORITY_MATRIX_AREA.appendChild(MEDIUM_PRIORITY_TASKS_CONTAINER);
        
                const LOW_PRIORITY_TASKS_CONTAINER = document.createElement('div');
                LOW_PRIORITY_TASKS_CONTAINER.classList.add('low-priority-tasks', 'container');
        
                    const UNIMPORTANT_UNURGENT_TASKS_BOX = document.createElement('div');
                    UNIMPORTANT_UNURGENT_TASKS_BOX.classList.add('unimportant-unurgent-tasks', 'box');
        
                        const UNIMPORTANT_UNURGENT_TASKS_HEADER = document.createElement('header');
                        UNIMPORTANT_UNURGENT_TASKS_HEADER.classList.add('unimportant-unurgent-tasks', 'header');
        
                            const UNIMPORTANT_UNURGENT_TASKS_HEADING = document.createElement('h3');
                                UNIMPORTANT_UNURGENT_TASKS_HEADING.classList.add('unimportant-unurgent-tasks', 'heading');
                                UNIMPORTANT_UNURGENT_TASKS_HEADING.textContent = 'Unimportant and unurgent tasks';
                            UNIMPORTANT_UNURGENT_TASKS_HEADER.appendChild(UNIMPORTANT_UNURGENT_TASKS_HEADING);
        
                            const UNIMPORTANT_UNURGENT_TASKS_PRIORITY = document.createElement('p');
                                UNIMPORTANT_UNURGENT_TASKS_PRIORITY.classList.add('unimportant-unurgent-tasks', 'priority');
                                UNIMPORTANT_UNURGENT_TASKS_PRIORITY.textContent = 'Eliminate';
                            UNIMPORTANT_UNURGENT_TASKS_HEADER.appendChild(UNIMPORTANT_UNURGENT_TASKS_PRIORITY);
        
                        UNIMPORTANT_UNURGENT_TASKS_BOX.appendChild(UNIMPORTANT_UNURGENT_TASKS_HEADER);
        
                        const UNIMPORTANT_UNURGENT_TASKS_LIST = document.createElement('ul');
                            UNIMPORTANT_UNURGENT_TASKS_LIST.classList.add('unimportant-unurgent-tasks', 'list');
                        UNIMPORTANT_UNURGENT_TASKS_BOX.appendChild(UNIMPORTANT_UNURGENT_TASKS_LIST);
        
                    LOW_PRIORITY_TASKS_CONTAINER.appendChild(UNIMPORTANT_UNURGENT_TASKS_BOX);
        
                PRIORITY_MATRIX_AREA.appendChild(LOW_PRIORITY_TASKS_CONTAINER);
            TASKS_AREA_SUBSECTION.appendChild(PRIORITY_MATRIX_AREA);
            
        MAIN_SECTION.appendChild(TASKS_AREA_SUBSECTION);

    return MAIN_SECTION;
}

function createFooterSection() {
    const FOOTER_SECTION = document.createElement('footer');
    FOOTER_SECTION.className = 'footer-section';

        const CHALLENGE_RESOURCE_LINK = document.createElement('a');
            CHALLENGE_RESOURCE_LINK.href = 'https://www.theodinproject.com/lessons/node-path-javascript-todo-list';
            CHALLENGE_RESOURCE_LINK.ariaLabel = 'Visit the website of this challenge.'
            CHALLENGE_RESOURCE_LINK.target = '_blank';
            CHALLENGE_RESOURCE_LINK.textContent = 'The Odin Project';
        FOOTER_SECTION.appendChild(CHALLENGE_RESOURCE_LINK);

        const GITHUB_REPO_LINK = document.createElement('a');
            GITHUB_REPO_LINK.href = 'https://github.com/selimbiber/Listify/';
            GITHUB_REPO_LINK.ariaLabel = 'Visit code source repo of this project.'
            GITHUB_REPO_LINK.target = '_blank';

            const GITHUB_LOGO_ICON = document.createElement('i');
                GITHUB_LOGO_ICON.classList.add('fa-brands', 'fa-github');
                GITHUB_LOGO_ICON.ariaHidden = 'true';
            GITHUB_REPO_LINK.appendChild(GITHUB_LOGO_ICON);

        FOOTER_SECTION.appendChild(GITHUB_REPO_LINK);

        const GITHUB_PROFILE_LINK = document.createElement('a');
            GITHUB_PROFILE_LINK.href = 'https://www.github.com/selimbiber/';
            GITHUB_PROFILE_LINK.ariaLabel = 'Visit my GitHub profile.'
            GITHUB_PROFILE_LINK.target = '_blank';
            GITHUB_PROFILE_LINK.textContent = 'Selim Biber';
        FOOTER_SECTION.appendChild(GITHUB_PROFILE_LINK);
        
    return FOOTER_SECTION;
}

export default function initializePageLayout() {
    const PAGE_CONTAINER = document.getElementById('page-container');

    PAGE_CONTAINER.appendChild( createHeaderSection() );
    PAGE_CONTAINER.appendChild( createMainSection() );
    PAGE_CONTAINER.appendChild( createFooterSection() );
}