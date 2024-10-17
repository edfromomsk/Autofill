// Лог при загрузке контент-скрипта
console.log("Content script loaded!");

// Функция для отслеживания изменений в полях и их сохранения
function saveFieldData(event) {
    const fieldId = event.target.id;  // Получаем id элемента
    const fieldValue = event.target.value;  // Получаем введенное значение

    // Логируем изменения в поле
    console.log(`Изменение в поле с id "${fieldId}": ${fieldValue}`);

    // Проверяем, что поле имеет id
    if (!fieldId) {
        console.log("Поле без id, пропускаем сохранение.");
        return;
    }

    // Сохраняем id и value в локальном хранилище
    chrome.storage.local.get({ savedFields: {} }, function(result) {
        const savedFields = result.savedFields || {};
        savedFields[fieldId] = fieldValue;
        chrome.storage.local.set({ savedFields: savedFields }, function() {
            console.log(`Поле с id "${fieldId}" и значением "${fieldValue}" сохранено.`);
        });
    });
}

// Функция для отслеживания изменений в полях
function trackFieldChanges() {
    const inputs = document.querySelectorAll('input, textarea'); // Выбираем все поля input и textarea
    console.log(`Найдено ${inputs.length} полей для отслеживания.`);
    
    inputs.forEach(input => {
        if (input.id) {
            input.addEventListener('input', saveFieldData); // Добавляем событие для отслеживания изменений
            console.log(`Добавлено отслеживание для поля с id "${input.id}"`);
        } else {
            console.log("Поле без id, отслеживание не добавлено.");
        }
    });
}

// Функция для автозаполнения полей на основе сохраненных данных
function fillFields() {
    chrome.storage.local.get({ savedFields: {} }, function(result) {
        const savedFields = result.savedFields || {};
        console.log(`Найдено сохраненных полей: ${Object.keys(savedFields).length}`);

        Object.keys(savedFields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = savedFields[fieldId];
                // Создаем событие input, чтобы система обработала изменение
                const inputEvent = new Event('input', { bubbles: true });
                field.dispatchEvent(inputEvent);
                console.log(`Поле с id "${fieldId}" заполнено автоматически значением "${savedFields[fieldId]}"`);
            } else {
                console.log(`Поле с id "${fieldId}" не найдено на странице.`);
            }
        });
    });
}

// Добавляем задержку для полной загрузки элементов страницы
setTimeout(() => {
    // Добавляем автозаполнение после задержки
    fillFields();

    // Добавляем отслеживание изменений в полях после задержки
    trackFieldChanges();
}, 3000); // Задержка 3 секунды