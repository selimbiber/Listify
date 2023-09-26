function createTasksList(taskCategory = 'empty', taskArea) {
    const TASK_LIST = document.createElement('ul');
    TASK_LIST.classList.add(taskCategory, taskArea, 'task-list');

    taskCategory === 'empty' ? '' : document.querySelector('.tasks-area-heading').textContent = taskCategory;

    return TASK_LIST;
}

function createMenuTaskListItem(taskTitle, taskStatus) {
    const MENU_TASK_LIST_ITEM = document.createElement('li');
        MENU_TASK_LIST_ITEM.classList.add(taskStatus, 'task-list-item');

            const TASK_TITLE = document.createElement('p');
                TASK_TITLE.className = 'task-title';
                TASK_TITLE.textContent = taskTitle;
            MENU_TASK_LIST_ITEM.appendChild(TASK_TITLE);

            const TASK_DETAILS_BTN = document.createElement('button');
                TASK_DETAILS_BTN.className = 'task-details-btn';
                TASK_DETAILS_BTN.textContent = 'DETAILS';
            MENU_TASK_LIST_ITEM.appendChild(TASK_DETAILS_BTN)

    return MENU_TASK_LIST_ITEM;
}

function createMainTaskListItem(taskTitle, taskStatus, taskDeadline) {
    const MAIN_TASK_LIST_ITEM = document.createElement('li');
        MAIN_TASK_LIST_ITEM.classList.add(taskStatus, 'task-list-item');

        const LIST_ITEM_LEFT_SIDE = document.createElement('div');
        LIST_ITEM_LEFT_SIDE.className = 'li-left-side';

            const CUSTOM_CHECKBOX_CONTAINER = document.createElement('label');
            CUSTOM_CHECKBOX_CONTAINER.className = 'custom-checkbox-container';

                const CHECKBOX_BTN = document.createElement('input');
                    CHECKBOX_BTN.type = 'checkbox';
                CUSTOM_CHECKBOX_CONTAINER.appendChild(CHECKBOX_BTN);

                const CHECKBOX_MARK = document.createElement('span');
                    CHECKBOX_MARK.className = 'checkmark';
                CUSTOM_CHECKBOX_CONTAINER.appendChild(CHECKBOX_MARK);

            LIST_ITEM_LEFT_SIDE.appendChild(CUSTOM_CHECKBOX_CONTAINER);

            const TASK_TITLE = document.createElement('p');
                TASK_TITLE.className = 'task-title';
                TASK_TITLE.textContent = taskTitle;
            LIST_ITEM_LEFT_SIDE.appendChild(TASK_TITLE);

        MAIN_TASK_LIST_ITEM.appendChild(LIST_ITEM_LEFT_SIDE);

        const LIST_ITEM_RIGHT_SIDE = document.createElement('div');
        LIST_ITEM_RIGHT_SIDE.className = 'li-right-side';

            const TASK_DUE_DATE = document.createElement('p');
                TASK_DUE_DATE.className = 'task-due-date';
                TASK_DUE_DATE.textContent = taskDeadline;
            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_DUE_DATE);

            const TASK_DETAILS_BTN = document.createElement('button');
                TASK_DETAILS_BTN.className = 'task-details-btn';
                TASK_DETAILS_BTN.textContent = 'DETAILS';
            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_DETAILS_BTN);

            const TASK_EDIT_BTN = document.createElement('button');
            TASK_EDIT_BTN.className = 'task-edit-btn';

                const TASK_EDIT_BTN_ICON = document.createElement('i');
                    TASK_EDIT_BTN_ICON.classList.add('fas', 'fa-edit');
                TASK_EDIT_BTN.appendChild(TASK_EDIT_BTN_ICON);

            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_EDIT_BTN);

            const TASK_DELETE_BTN = document.createElement('button');
            TASK_DELETE_BTN.className = 'task-delete-btn';

                const TASK_DELETE_BTN_ICON = document.createElement('i');
                    TASK_DELETE_BTN_ICON.classList.add('fa-solid', 'fa-trash');
                TASK_DELETE_BTN.appendChild(TASK_DELETE_BTN_ICON);

            LIST_ITEM_RIGHT_SIDE.appendChild(TASK_DELETE_BTN);

        MAIN_TASK_LIST_ITEM.appendChild(LIST_ITEM_RIGHT_SIDE);

    return MAIN_TASK_LIST_ITEM;
}

function createTaskInfoBox(taskStatus, taskTitle, taskCategory, taskDetails, taskDeadline, taskPriority, taskRepeat, taskStatus) {
    const TASK_INFO_BOX = document.createElement('article');
    TASK_INFO_BOX.classList.add(taskStatus, 'task-info-box');

        const TASK_INFO_BOX_HEADER = document.createElement('header');
            const TASK_TITLE = document.createElement('h4');
                TASK_TITLE.className = 'task-title';
                TASK_TITLE.title = 'Task Title';
                TASK_TITLE = taskTitle;
            TASK_INFO_BOX_HEADER.appendChild(TASK_TITLE);

            const TASK_CATEGORY = document.createElement('p');
                TASK_CATEGORY.className = 'task-category';
                TASK_CATEGORY.title = 'Task Category';
                TASK_CATEGORY.textContent = taskCategory;
            TASK_INFO_BOX_HEADER.appendChild(TASK_CATEGORY);
        TASK_INFO_BOX.appendChild(TASK_INFO_BOX_HEADER);

        const TASK_INFO_BOX_DETAILS = document.createElement('p');
            TASK_INFO_BOX_DETAILS.className = 'task-details';
            TASK_INFO_BOX_DETAILS.title = 'Task Details';
            TASK_INFO_BOX_DETAILS.textContent = taskDetails;
        TASK_INFO_BOX.appendChild(TASK_INFO_BOX_DETAILS);

        const TASK_DUE_DATE = document.createElement('p');
            TASK_DUE_DATE.className = 'task-deadline';
            TASK_DUE_DATE.textContent = 'Deadline:';

            const TASK_DUE_DATE_SPAN = document.createElement('span');
                TASK_DUE_DATE_SPAN.className = 'task-text';
                TASK_DUE_DATE_SPAN.textContent = taskDeadline;
            TASK_DUE_DATE.appendChild(TASK_DUE_DATE_SPAN);

        TASK_INFO_BOX.appendChild(TASK_DUE_DATE);

        const TASK_PRIORITY_RATING = document.createElement('p');
            TASK_PRIORITY_RATING.className = 'task-priority';
            TASK_PRIORITY_RATING.textContent = 'Priority:';

            const TASK_PRIORITY_RATING_SPAN = document.createElement('span');
                TASK_PRIORITY_RATING_SPAN.className = 'task-text';
                TASK_PRIORITY_RATING_SPAN.textContent = taskPriority;
            TASK_PRIORITY_RATING.appendChild(TASK_PRIORITY_RATING_SPAN);

        TASK_INFO_BOX.appendChild(TASK_PRIORITY_RATING);

        const TASK_REPEAT_OPTION = document.createElement('p');
            TASK_REPEAT_OPTION.className = 'task-repeat';
            TASK_REPEAT_OPTION.textContent = taskRepeat;
        
            const TASK_REPEAT_OPTION_SPAN = document.createElement('span');
                TASK_REPEAT_OPTION_SPAN.className = 'task-text';
                TASK_REPEAT_OPTION_SPAN.textContent = taskRepeat;
            TASK_REPEAT_OPTION.appendChild(TASK_REPEAT_OPTION_SPAN);

        TASK_INFO_BOX.appendChild(TASK_REPEAT_OPTION);

        const TASK_CURRENT_STATUS = document.createElement('p');
            TASK_CURRENT_STATUS.className = 'task-status';
            TASK_CURRENT_STATUS.textContent = taskStatus;
        
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
    
    return TASK_INFO_BOX;
}