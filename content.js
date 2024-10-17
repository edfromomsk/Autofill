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
        console.log("Поле 'Репозиторий сервиса' заполнено автоматически.");
    } else {
        console.log("Поле 'Репозиторий сервиса' не найдено.");
    }

    // Поле 'Назначение токена'
    const tokenPurposeField = document.getElementById(":rm:");
    if (tokenPurposeField) {
        tokenPurposeField.value = autofillData.tokenPurpose;
        console.log("Поле 'Назначение токена' заполнено автоматически.");
    } else {
        console.log("Поле 'Назначение токена' не найдено.");
    }
}

// Добавляем задержку, чтобы убедиться, что все поля полностью загружены
setTimeout(fillFields, 3000); // Задержка 3 секунды