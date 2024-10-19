// Получает урл страницы
function getPageUrl() {
    return window.location.href.split('?')[0]; // без параметров
}

// Сохраняет данные на основе URL и id полей в локал сторедж
function saveFieldData(event) {
    const fieldId = event.target.id;  // Получает id элемента
    const fieldValue = event.target.value;  // Получает введенное значение
    const pageUrl = getPageUrl(); // Получает урл

    // Сохраняет данные
    chrome.storage.local.get({ savedPages: {} }, function(result) {
        const savedPages = result.savedPages || {};
        if (!savedPages[pageUrl]) {
            savedPages[pageUrl] = {};
        }
        savedPages[pageUrl][fieldId] = fieldValue;
        
        chrome.storage.local.set({ savedPages: savedPages });
    });
}

// Автозаполнение полей
function fillFields() {
    const pageUrl = getPageUrl(); // Получает текущий URL страницы

    chrome.storage.local.get({ savedPages: {} }, function(result) {
        const savedPages = result.savedPages || {};
        const pageData = savedPages[pageUrl] || {}; // Получает сохранённые данные для текущей страницы

        let fieldsFound = false;

        Object.keys(pageData).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = pageData[fieldId];
                const inputEvent = new Event('input', { bubbles: true });
                field.dispatchEvent(inputEvent);
                fieldsFound = true;
            }
        });

        if (fieldsFound) {
            console.log("Поля заполнены.");
        } else {
            console.log("Не удалось найти поля для заполнения.");
        }
    });
}

// Отслеживание изменений в полях
function trackFieldChanges() {
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.id) {
            input.addEventListener('input', saveFieldData);
        }
    });
}

// Задержка для полной загрузки страницы
setTimeout(() => {
    fillFields();
    trackFieldChanges();
}, 500);