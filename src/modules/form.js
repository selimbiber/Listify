function taskCreateForm() {
    const TASK_CREATE_FORM = document.createElement('form');
        TASK_CREATE_FORM.action = 'https://httpbin.org/post';
        TASK_CREATE_FORM.method = 'post';
        TASK_CREATE_FORM.id = 'task-create-form';
        TASK_CREATE_FORM.className = 'task-create-form';

        const MAIN_FIELDSET = document.createElement('fieldset');
        MAIN_FIELDSET.className = 'main-fieldset';

            const TOP_LEGEND_TEXT = document.createElement('legend');
                TOP_LEGEND_TEXT.textContent = 'Create a new task!';
            MAIN_FIELDSET.appendChild(TOP_LEGEND_TEXT);

            const TASK_TITLE_LABEL = document.createElement('label');
                TASK_TITLE_LABEL.htmlFor = 'task_title-input';
                TASK_TITLE_LABEL.textContent = 'Title:'
            
                const TASK_TITLE_INPUT = document.createElement('input');
                    TASK_TITLE_INPUT.type = 'text';
                    TASK_TITLE_INPUT.name = 'task-title';
                    TASK_TITLE_INPUT.id = 'task_title-input';
                    TASK_TITLE_INPUT.maxLength = '9';
                TASK_TITLE_LABEL.appendChild(TASK_TITLE_INPUT);

            MAIN_FIELDSET.appendChild(TASK_TITLE_LABEL);

            const TASK_DETAILS_LABEL = document.createElement('label');
                TASK_DETAILS_LABEL.htmlFor = 'task_details-textarea';
                TASK_DETAILS_LABEL.textContent = 'Details (Optional):';

                const TASK_DETAILS_TEXTAREA = document.createElement('textarea');
                    TASK_DETAILS_TEXTAREA.id = 'task_details-textarea';
                    TASK_DETAILS_TEXTAREA.className = 'task_details-textarea';
                    TASK_DETAILS_TEXTAREA.name = 'task-details';
                TASK_DETAILS_LABEL.appendChild(TASK_DETAILS_TEXTAREA);
            
            MAIN_FIELDSET.appendChild(TASK_DETAILS_LABEL);

            const TASK_DATE_LABEL = document.createElement('label');
                TASK_DATE_LABEL.htmlFor = 'task_date-input';
                TASK_DATE_LABEL.textContent = 'Deadline:';

                const TASK_DATE_INPUT = document.createElement('input');
                    TASK_DATE_INPUT.type = 'date';
                    TASK_DATE_INPUT.name = 'task-deadline';
                    TASK_DATE_INPUT.id = 'task_date-input';
                TASK_DATE_LABEL.appendChild(TASK_DATE_INPUT);

            MAIN_FIELDSET.appendChild(TASK_DATE_LABEL);

            const TOP_HORIZONTAL_LINE = document.createElement('hr');
            MAIN_FIELDSET.appendChild(TOP_HORIZONTAL_LINE);

            const PRIORITY_STATUS_SUB_FIELDSET = document.createElement('fieldset');
            PRIORITY_STATUS_SUB_FIELDSET.className = 'sub-fieldset';

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

                PRIORITY_STATUS_SUB_FIELDSET.appendChild(URGENCY_STATUS_LABEL);

                const IMPORTANCE_STATUS_LABEL = document.createElement('label');
                IMPORTANCE_STATUS_LABEL.htmlFor = 'task_importance-status-input';

                    const IMPORTANCE_STATUS_INPUT = document.createElement('input');
                        IMPORTANCE_STATUS_INPUT.type = 'checkbox';
                        IMPORTANCE_STATUS_INPUT.name = 'task_importance-answer';
                        IMPORTANCE_STATUS_INPUT.id = 'task_importance-status-input';

                    IMPORTANCE_STATUS_LABEL.textContent = 'Is this important?';
                    IMPORTANCE_STATUS_LABEL.appendChild(IMPORTANCE_STATUS_INPUT);

                PRIORITY_STATUS_SUB_FIELDSET.appendChild(IMPORTANCE_STATUS_LABEL);

                const SUB_HORIZONTAL_LINE = document.createElement('hr');
                PRIORITY_STATUS_SUB_FIELDSET.appendChild(SUB_HORIZONTAL_LINE);

            MAIN_FIELDSET.appendChild(PRIORITY_STATUS_SUB_FIELDSET);

            const REPEAT_STATUS_SUB_FIELDSET = document.createElement('fieldset');
            REPEAT_STATUS_SUB_FIELDSET.className = 'sub-fieldset';

                const REPEAT_STATUS_LEGEND_TEXT = document.createElement('legend');
                    REPEAT_STATUS_LEGEND_TEXT.textContent = 'Setting Repeat Status:';
                REPEAT_STATUS_SUB_FIELDSET.appendChild(REPEAT_STATUS_LEGEND_TEXT);

                const EACH_DAY_RADIO_LABEL = document.createElement('label');
                EACH_DAY_RADIO_LABEL.htmlFor = 'repeat-status_each-day';

                    const EACH_DAY_RADIO_BTN = document.createElement('input');
                        EACH_DAY_RADIO_BTN.type = 'radio';
                        EACH_DAY_RADIO_BTN.name = 'task-repeat-status';
                        EACH_DAY_RADIO_BTN.id = 'repeat-status_each-day';

                    EACH_DAY_RADIO_LABEL.textContent = 'Each Day';
                    EACH_DAY_RADIO_LABEL.appendChild(EACH_DAY_RADIO_BTN);

                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_DAY_RADIO_LABEL);

                const EACH_WEEK_RADIO_LABEL = document.createElement('label');
                EACH_WEEK_RADIO_LABEL.htmlFor = 'repeat-status_each-week';

                    const EACH_WEEK_RADIO_BTN = document.createElement('input');
                        EACH_WEEK_RADIO_BTN.type = 'radio';
                        EACH_WEEK_RADIO_BTN.name = 'task-repeat-status';
                        EACH_WEEK_RADIO_BTN.id = 'repeat-status_each-week';

                    EACH_WEEK_RADIO_LABEL.textContent = 'Each Week';
                    EACH_WEEK_RADIO_LABEL.appendChild(EACH_WEEK_RADIO_BTN);

                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_WEEK_RADIO_LABEL);

                const EACH_MONTH_RADIO_LABEL = document.createElement('label');
                EACH_MONTH_RADIO_LABEL.htmlFor = 'repeat-status_each-month';

                    const EACH_MONTH_RADIO_BTN = Document.createElement('input');
                        EACH_MONTH_RADIO_BTN.type = 'radio';
                        EACH_MONTH_RADIO_BTN.name = 'task-repeat-status';
                        EACH_MONTH_RADIO_BTN.id = 'repeat-status_each-month';

                    EACH_MONTH_RADIO_LABEL.textContent = 'Each Month';
                    EACH_MONTH_RADIO_LABEL.appendChild(EACH_MONTH_RADIO_BTN);

                REPEAT_STATUS_SUB_FIELDSET.appendChild(EACH_MONTH_RADIO_LABEL);

                const NO_REPEAT_RADIO_LABEL = document.createElement('label');
                NO_REPEAT_RADIO_LABEL.htmlFor ='repeat-status_no-repeat';

                    const NO_REPEAT_RADIO_BTN = document.createElement('input');
                        NO_REPEAT_RADIO_BTN.type = 'radio';
                        NO_REPEAT_RADIO_BTN.name = 'task-repeat-status';
                        NO_REPEAT_RADIO_BTN.id = 'repeat-status_no-repeat';
                        NO_REPEAT_RADIO_BTN.checked = 'true';

                    NO_REPEAT_RADIO_LABEL.textContent = 'No Repeat';
                    NO_REPEAT_RADIO_LABEL.appendChild(NO_REPEAT_RADIO_BTN);

                REPEAT_STATUS_SUB_FIELDSET.appendChild(NO_REPEAT_RADIO_LABEL);

            MAIN_FIELDSET.appendChild(REPEAT_STATUS_SUB_FIELDSET);

            const CLOSE_FORM_BTN = document.createElement('button');
                CLOSE_FORM_BTN.className = 'close-form-btn';
                CLOSE_FORM_BTN.title = 'click this button for close the form';

                const CLOSE_FORM_BTN_ICON = document.createElement('i');
                    CLOSE_FORM_BTN_ICON.classList.add('fa-solid', 'fa-x');
                CLOSE_FORM_BTN.appendChild(CLOSE_FORM_BTN_ICON);

            MAIN_FIELDSET.appendChild(CLOSE_FORM_BTN);

        TASK_CREATE_FORM.appendChild(MAIN_FIELDSET);

        const CONFIRM_FORM_BTN = document.createElement('input');
            CONFIRM_FORM_BTN.type = 'submit';
            CONFIRM_FORM_BTN.value = 'CREATE';
            CONFIRM_FORM_BTN.className = 'create-task-btn';
        TASK_CREATE_FORM.appendChild(CONFIRM_FORM_BTN);

    return TASK_CREATE_FORM;
}