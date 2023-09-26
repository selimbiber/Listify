import { toggleSidebarMenu } from "./helpers";

function createHeaderSection() {
    const HEADER_SECTION = document.createElement('header');
    HEADER_SECTION.className = 'header-section';

        const SIDEBAR_SLIDER = document.createElement('div');
            SIDEBAR_SLIDER.className = 'sidebar-slider';
            SIDEBAR_SLIDER.title = 'click for open the sidebar menu';

            const TOGGLE_MENU_CHECKBOX_INPUT = document.createElement('input');
                TOGGLE_MENU_CHECKBOX_INPUT.type = 'checkbox';
                TOGGLE_MENU_CHECKBOX_INPUT.setAttribute('id', 'toggle-menu_checkbox-btn');
                TOGGLE_MENU_CHECKBOX_INPUT.className = 'toggle-menu_checkbox-btn';
                TOGGLE_MENU_CHECKBOX_INPUT.name = 'toggle-menu_checkbox-btn';
                TOGGLE_MENU_CHECKBOX_INPUT.addEventListener('click', toggleSidebarMenu);
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

            const TASK_INBOX_HEADER = document.createElement('header');
                TASK_INBOX_HEADER.title = 'Click for view all tasks';
                TASK_INBOX_HEADER.classList.add('menu', 'task-inbox');

                const TASK_INBOX_HEADING = document.createElement('h2');
                TASK_INBOX_HEADING.className = 'task-inbox-heading';

                        const TASK_INBOX_ICON = document.createElement('i');
                            TASK_INBOX_ICON.classList.add('fas', 'fa-inbox');
                        TASK_INBOX_HEADING.appendChild(TASK_INBOX_ICON);

                TASK_INBOX_HEADING.textContent = 'Task Inbox:';

                TASK_INBOX_HEADER.appendChild(TASK_INBOX_HEADING);

                const TASK_INBOX_COUNT = document.createElement('p');
                    TASK_INBOX_COUNT.classList.add('inbox', 'task-count');
                TASK_INBOX_HEADER.appendChild(TASK_INBOX_COUNT);

            SIDEBAR_MENU_SUBSECTION.appendChild(TASK_INBOX_HEADER);

            const CUSTOM_TASKS_HEADER = document.createElement('header');
                CUSTOM_TASKS_HEADER.title = 'Click for view all custom tasks';
                CUSTOM_TASKS_HEADER.classList.add('menu', 'custom-tasks');

                const CUSTOM_TASKS_HEADING = document.createElement('h3');
                CUSTOM_TASKS_HEADING.className = 'custom-tasks-heading';

                    //todo const CUSTOM_TASKS_ICON;

                    CUSTOM_TASKS_HEADING.textContent = 'Custom Tasks:'
                    //todo CUSTOM_TASKS_HEADING.appendChild(CUSTOM_TASKS_ICON);

                CUSTOM_TASKS_HEADER.appendChild(CUSTOM_TASKS_HEADING);

                const CUSTOMS_TASKS_COUNT = document.createElement('p');
                    CUSTOMS_TASKS_COUNT.classList.add('custom', 'task-count');
                CUSTOM_TASKS_HEADER.appendChild(CUSTOMS_TASKS_COUNT);
            
            SIDEBAR_MENU_SUBSECTION.appendChild(CUSTOM_TASKS_HEADER);

            const CUSTOM_TASK_LIST = document.createElement('ul');
                CUSTOM_TASK_LIST.classList.add('custom', 'task-list');
            SIDEBAR_MENU_SUBSECTION.appendChild(CUSTOM_TASK_LIST);

            const REPETITIVE_TASKS_HEADER = document.createElement('header');
                REPETITIVE_TASKS_HEADER.title = 'Click for view all repetitive tasks';
                REPETITIVE_TASKS_HEADER.classList.add('menu', 'repetitive-tasks');

                const REPETITIVE_TASKS_HEADING = document.createElement('h3');
                REPETITIVE_TASKS_HEADING.className = 'repetitive-tasks-heading';

                    //todo const REPETITIVE_TASKS_ICON;

                REPETITIVE_TASKS_HEADING.textContent = 'Repetitive Tasks:'
                //todo REPETITIVE_TASKS_HEADING.appendChild(REPETITIVE_TASKS_ICON);

                REPETITIVE_TASKS_HEADER.appendChild(REPETITIVE_TASKS_HEADING);

                const REPETITIVE_TASKS_COUNT = document.createElement('p');
                    REPETITIVE_TASKS_COUNT.classList.add('repetitive', 'task-count');
                REPETITIVE_TASKS_HEADER.appendChild(REPETITIVE_TASKS_COUNT);

            SIDEBAR_MENU_SUBSECTION.appendChild(REPETITIVE_TASKS_HEADER);

            const REPETITIVE_TASK_LIST = document.createElement('ul');
                REPETITIVE_TASK_LIST.classList.add('repetitive', 'task-list');
            SIDEBAR_MENU_SUBSECTION.appendChild(REPETITIVE_TASK_LIST);

            const PROJECT_TASKS_HEADER = document.createElement('header');
                PROJECT_TASKS_HEADER.title = 'Click for view all project tasks';
                PROJECT_TASKS_HEADER.classList.add('menu', 'project-tasks');

                const PROJECT_TASKS_HEADING = document.createElement('h3');
                PROJECT_TASKS_HEADING.className = 'project-tasks-project';

                    //todo const PROJECT_TASKS_ICON;

                PROJECT_TASKS_HEADING.textContent = 'Project Tasks:'
                //todo PROJECT_TASKS_HEADING.appendChild(PROJECT_TASKS_ICON);

                PROJECT_TASKS_HEADER.appendChild(PROJECT_TASKS_HEADING);

                const PROJECT_TASKS_COUNT = document.createElement('p');
                    PROJECT_TASKS_COUNT.classList.add('project', 'task-count');
                PROJECT_TASKS_HEADER.appendChild(PROJECT_TASKS_COUNT);

            SIDEBAR_MENU_SUBSECTION.appendChild(PROJECT_TASKS_HEADER);

            const PROJECT_TASK_LIST = document.createElement('ul');
                PROJECT_TASK_LIST.classList.add('project', 'task-list');
            SIDEBAR_MENU_SUBSECTION.appendChild(PROJECT_TASK_LIST);

            const MENU_BUTTONS_CONTAINER = document.createElement('footer');
            MENU_BUTTONS_CONTAINER.className = 'menu-buttons-container';

                const SHOW_MATRIX_BTN = document.createElement('button');
                    SHOW_MATRIX_BTN.className = 'show-matrix-btn';
                    SHOW_MATRIX_BTN.textContent = 'Show Priority Matrix';
                MENU_BUTTONS_CONTAINER.appendChild(SHOW_MATRIX_BTN);

                const NEW_TASKS_BTN = document.createElement('button');
                    NEW_TASKS_BTN.className = 'new-task-btn';
                    NEW_TASKS_BTN.textContent = 'Create New Task';
                MENU_BUTTONS_CONTAINER.appendChild(NEW_TASKS_BTN);

            SIDEBAR_MENU_SUBSECTION.appendChild(MENU_BUTTONS_CONTAINER);

        MAIN_SECTION.appendChild(SIDEBAR_MENU_SUBSECTION);

        const TASKS_AREA_SUBSECTION = document.createElement('section');
        TASKS_AREA_SUBSECTION.classList.add('tasks-area-subsection', 'empty');

            const TASKS_AREA_SUBSECTION_HEADER = document.createElement('header');
                const TASKS_AREA_SUBSECTION_HEADING = document.createElement('h2');
                    TASKS_AREA_SUBSECTION_HEADING.className = 'tasks-area-headıng';
                TASKS_AREA_SUBSECTION_HEADER.appendChild(TASKS_AREA_SUBSECTION_HEADING);
            TASKS_AREA_SUBSECTION.appendChild(TASKS_AREA_SUBSECTION_HEADER);
            
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