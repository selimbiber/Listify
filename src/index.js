import initializePageLayout from "./modules/layout";
initializePageLayout();

import { 
    toggleSidebarMenu, 
    toggleThemeMode, 
    toggleBetweenTaskAreas,
    checkEmptyTasksArea, 
    changeZeroTaskCountColor
} from "./modules/helpers";

toggleSidebarMenu();

toggleThemeMode();

toggleBetweenTaskAreas();

checkEmptyTasksArea();

changeZeroTaskCountColor();

import { showTaskCreationForm } from "./modules/form";
showTaskCreationForm();
import { loadUserDataFromLocalStorage } from "./modules/data";
loadUserDataFromLocalStorage();