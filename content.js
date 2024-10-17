// Данные для автозаполнения
const autofillData = {
    repository: "https://gitlab.wildberries.ru/content/content-card",
    tokenPurpose: "Расширение токена необходимо для управления новым атрибутом app-2-app"
};

// Функция для заполнения полей формы
function fillFields() {
    // Поле 'Репозиторий сервиса'
    const repositoryField = document.getElementById(":rq:");
    if (repositoryField) {
        repositoryField.value = autofillData.repository;
        repositoryField.dispatchEvent(new Event('input')); // Программное событие, чтобы поле "заметило" изменение
        console.log("Поле 'Репозиторий сервиса' заполнено автоматически.");
    } else {
        console.log("Поле 'Репозиторий сервиса' не найдено.");
    }

    // Поле 'Назначение токена'
    const tokenPurposeField = document.getElementById(":rm:");
    if (tokenPurposeField) {
        tokenPurposeField.value = autofillData.tokenPurpose;
        tokenPurposeField.dispatchEvent(new Event('input')); // Программное событие, чтобы поле "заметило" изменение
        console.log("Поле 'Назначение токена' заполнено автоматически.");
    } else {
        console.log("Поле 'Назначение токена' не найдено.");
    }
}

// Наблюдатель для отслеживания изменений в DOM
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        fillFields(); // Вызываем заполнение, если произошли изменения
    });
});

// Настраиваем наблюдение за изменениями в DOM
observer.observe(document.body, { childList: true, subtree: true });

// Добавляем начальную задержку для полной загрузки страницы
setTimeout(fillFields, 3000); // Задержка 3 секунды