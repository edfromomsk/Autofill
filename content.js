// Данные для автозаполнения
const autofillData = {
    repository: "https://gitlab.wildberries.ru/content/content-card",
    tokenPurpose: "Расширение токена необходимо для управления новым атрибутом app-2-app",
    scopeList: "\"contentAdmin\""
};

// Функция для заполнения полей формы
function fillFields() {
    // Создаем и инициируем событие input, чтобы система обработала изменения
    const inputEvent = new Event('input', { bubbles: true });

    // Поле 'Репозиторий сервиса'
    const repositoryField = document.getElementById(":rq:");
    if (repositoryField) {
        repositoryField.value = autofillData.repository;
        repositoryField.dispatchEvent(inputEvent); // Программное событие, чтобы система обработала изменение
        console.log("Поле 'Репозиторий сервиса' заполнено автоматически.");
    } else {
        console.log("Поле 'Репозиторий сервиса' не найдено.");
    }

    // Поле 'Назначение токена'
    const tokenPurposeField = document.getElementById(":rm:");
    if (tokenPurposeField) {
        tokenPurposeField.value = autofillData.tokenPurpose;
        tokenPurposeField.dispatchEvent(inputEvent); // Программное событие, чтобы система обработала изменение
        console.log("Поле 'Назначение токена' заполнено автоматически.");
    } else {
        console.log("Поле 'Назначение токена' не найдено.");
    }

    // Поле 'Список Scope'ов (пространств)'
    const scopeListField = document.getElementById(":rr:");
    if (scopeListField) {
        scopeListField.value = autofillData.scopeList;
        scopeListField.dispatchEvent(inputEvent); // Программное событие, чтобы система обработала изменение
        console.log("Поле 'Список Scope'ов (пространств)' заполнено автоматически.");
    } else {
        console.log("Поле 'Список Scope'ов (пространств)' не найдено.");
    }
}

// Добавляем задержку, чтобы убедиться, что все поля полностью загружены
setTimeout(fillFields, 3000); // Задержка 3 секунды