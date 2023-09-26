export function createPageBackground() {
    if ( document.querySelector('.page-background') ) document.querySelector('.page-background').remove();
    const PAGE_BACKGROUND = document.createElement('div');
    PAGE_BACKGROUND.className = 'page-background';
    document.body.insertBefore(PAGE_BACKGROUND, HEADER_SECTION);
}

export function toggleSidebarMenu() {
    const SIDEBAR_MENU = document.querySelector('.sidebar-menu-subsection');
    const TASKS_AREA = document.querySelector('.tasks-area-subsection');

    if ( SIDEBAR_MENU.classList.contains('open') ) {
        SIDEBAR_MENU.classList.remove('open');
        TASKS_AREA.classList.add('centering');
    } else {
        SIDEBAR_MENU.classList.add('open');
        TASKS_AREA.classList.remove('centering');
    }
}

export function toggleThemeMode() {
    const TOGGLE_THEME_BTN = document.querySelector('#toggle-theme_checkbox-btn');
    const PREFERS_DARK_THEME = window.matchMedia("(prefers-color-scheme: dark)");

    if (PREFERS_DARK_THEME.matches) {
        document.body.classList.add("dark-mode");
        TOGGLE_THEME_BTN.checked = 'true';
    }

    TOGGLE_THEME_BTN.addEventListener('click', () => {
        if ( document.body.classList.contains("dark-mode") ) {
            document.body.classList.remove("dark-mode");
        } else {
            document.body.classList.add("dark-mode");
        }
    });
}