// Лог при загрузке контент-скрипта
console.log("Content script loaded!");

// Функция для получения текущего URL страницы
function getPageUrl() {
    return window.location.href.split('?')[0]; // Берём URL без параметров для точности
}

// Функция для сохранения данных на основе URL и id полей
function saveFieldData(event) {
    const fieldId = event.target.id;  // Получаем id элемента
    const fieldValue = event.target.value;  // Получаем введенное значение
    const pageUrl = getPageUrl(); // Получаем текущий URL страницы

    console.log(`Изменение в поле с id "${fieldId}" на странице "${pageUrl}": ${fieldValue}`);

    if (!fieldId) {
        console.log("Поле без id, пропускаем сохранение.");
        return;
    }

    // Сохраняем данные на основе URL страницы
    chrome.storage.local.get({ savedPages: {} }, function(result) {
        const savedPages = result.savedPages || {};
        if (!savedPages[pageUrl]) {
            savedPages[pageUrl] = {};
        }
        savedPages[pageUrl][fieldId] = fieldValue;
        
        chrome.storage.local.set({ savedPages: savedPages }, function() {
            console.log(`Поле с id "${fieldId}" на странице "${pageUrl}" сохранено со значением "${fieldValue}".`);
        });
    });
}

// Функция для автозаполнения полей на основе URL
function fillFields() {
    const pageUrl = getPageUrl(); // Получаем текущий URL страницы

    chrome.storage.local.get({ savedPages: {} }, function(result) {
        const savedPages = result.savedPages || {};
        const pageData = savedPages[pageUrl] || {}; // Получаем сохранённые данные для текущей страницы

        console.log(`Заполняем данные для страницы "${pageUrl}". Найдено полей: ${Object.keys(pageData).length}`);

        Object.keys(pageData).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = pageData[fieldId];
                const inputEvent = new Event('input', { bubbles: true });
                field.dispatchEvent(inputEvent);
                console.log(`Поле с id "${fieldId}" заполнено автоматически значением "${pageData[fieldId]}"`);
            } else {
                console.log(`Поле с id "${fieldId}" не найдено на странице.`);
            }
        });
    });
}

// Функция для отслеживания изменений в полях
function trackFieldChanges() {
    const inputs = document.querySelectorAll('input, textarea');
    console.log(`Найдено ${inputs.length} полей для отслеживания.`);

    inputs.forEach(input => {
        if (input.id) {
            input.addEventListener('input', saveFieldData);
            console.log(`Добавлено отслеживание для поля с id "${input.id}"`);
        } else {
            console.log("Поле без id, отслеживание не добавлено.");
        }
    });
}

// Добавляем задержку для полной загрузки элементов страницы
setTimeout(() => {
    // Заполняем поля после загрузки страницы
    fillFields();

    // Добавляем отслеживание изменений в полях
    trackFieldChanges();
}, 3000); // Задержка 3 секунды