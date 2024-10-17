// Данные для автозаполнения
const autofillData = {
    repository: "https://gitlab.wildberries.ru/content/content-card"
};

// Функция для заполнения поля формы с эмуляцией пользовательского ввода
function fillRepositoryField() {
    const repositoryField = document.getElementById(":rq:");
    if (repositoryField) {
        repositoryField.value = autofillData.repository;

        // Создаем и инициируем событие input, чтобы система обработала изменение
        const inputEvent = new Event('input', { bubbles: true });
        repositoryField.dispatchEvent(inputEvent);

        console.log("Поле 'Репозиторий сервиса' заполнено автоматически.");
    } else {
        console.log("Поле 'Репозиторий сервиса' не найдено.");
    }
}

// Добавляем задержку, чтобы убедиться, что поле полностью загружено
setTimeout(fillRepositoryField, 3000); // Задержка 3 секунды