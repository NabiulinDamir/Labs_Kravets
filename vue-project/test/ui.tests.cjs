const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');
const fs = require('fs');

describe('Todoo Component Tests', function () {
    this.timeout(30000); // Увеличиваем таймаут для всех тестов
    let driver;

    before(async function () {
        // Создаю временную директорию для пользовательских данных
        const tempDir = path.join(os.tmpdir(), 'temp_user_data_' + Date.now());
        fs.mkdirSync(tempDir, { recursive: true });

        const chromeOptions = new chrome.Options()
            .addArguments('--no-sandbox')
            .addArguments('--disable-dev-shm-usage')
            .addArguments('--headless=new') 
            .addArguments(`--user-data-dir=${tempDir}`);

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get('http://localhost:5173');
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    it('Корректное отображение названия', async function () {
        const titleElement = await driver.findElement(By.xpath("//*[text()='Заметки']"));
        const titleText = await titleElement.getText();
        assert.strictEqual(titleText, 'Заметки');
    });

    it('Создание новой заметки', async function () {
        const createNoteButton = await driver.findElement(By.xpath("//div[contains(text(), 'Создать заметку')]"));
        await createNoteButton.click();

        // Жду появления формы для новой заметки
        await driver.wait(until.elementLocated(By.css('textarea.TextArea')), 5000);

        // Ввожу заголовок и содержание
        const titleInput = await driver.findElement(By.css('textarea.TextArea'));
        await titleInput.sendKeys('Новая заметка');

        const contentInput = await driver.findElement(By.css('div.note_item_body textarea.TextArea'));
        await contentInput.sendKeys('Это содержание новой заметки');

        // Нажимаю кнопку "Сохранить"
        const saveButton = await driver.findElement(By.xpath("//div[contains(text(), 'Сохранить')]"));
        await saveButton.click();

        // Проверяю, что заметка появилась
        const notes = await driver.findElements(By.css('.note_item'));
        assert.strictEqual(notes.length, 5, 'Заметка не была создана');
    });

    // it('Редактирование заметки', async function () {
    //     const createNoteButton = await driver.findElement(By.xpath("//div[contains(text(), 'Заметка 1')]"));
    //     await createNoteButton.click();

    //     // Нажимаем кнопку "Изменить" у первой заметки
    //     const editButton = await driver.findElement(By.xpath("//div[contains(text(), 'Изменить')]"));
    //     await editButton.click();

    //     // Редактируем заголовок
    //     const titleInput = await driver.findElement(By.css('textarea.TextArea'));
    //     await titleInput.clear();
    //     await titleInput.sendKeys('Измененный заголовок');

    //     // Нажимаем кнопку "Сохранить"
    //     const saveButton = await driver.findElement(By.xpath("//div[contains(text(), 'Сохранить')]"));
    //     await saveButton.click();

    //     // Проверяем, что заголовок изменился
    //     const updatedTitle = await driver.findElement(By.css('.Text')).getText();
    //     assert.strictEqual(updatedTitle, 'Измененный заголовок', 'Заголовок заметки не изменился');
    // });

    // it('Удаление заметки', async function () {
    //     // Нажимаем кнопку "Удалить" у первой заметки
    //     const deleteButton = await driver.findElement(By.xpath("//div[contains(text(), 'Удалить')]"));
    //     await deleteButton.click();

    //     // Проверяем, что заметка удалена
    //     const notes = await driver.findElements(By.css('.note_item'));
    //     assert.strictEqual(notes.length, 0, 'Заметка не была удалена');
    // });

    it('Раскрытие и сворачивание тела заметки', async function () {
        // Создаем новую заметку
        const createNoteButton = await driver.findElement(By.xpath("//div[contains(text(), 'Создать заметку')]"));
        await createNoteButton.click();

        // Ждем появления формы для новой заметки
        await driver.wait(until.elementLocated(By.css('textarea.TextArea')), 5000);

        // Вводим заголовок и содержание
        const titleInput = await driver.findElement(By.css('textarea.TextArea'));
        await titleInput.sendKeys('Тестовая заметка');

        const contentInput = await driver.findElement(By.css('div.note_item_body textarea.TextArea'));
        await contentInput.sendKeys('Это тестовое содержание');

        // Нажимаем кнопку "Сохранить"
        const saveButton = await driver.findElement(By.xpath("//div[contains(text(), 'Сохранить')]"));
        await saveButton.click();

        // Нажимаем на заголовок заметки, чтобы раскрыть тело
        const noteHeader = await driver.findElement(By.css('.note_item_header'));
        await noteHeader.click();

        // Проверяем, что тело заметки раскрыто
        const noteBody = await driver.findElement(By.css('.note_item_body.expanded'));
        assert.ok(noteBody, 'Тело заметки не раскрылось');

        // Нажимаем на заголовок заметки, чтобы свернуть тело
        await noteHeader.click();

        // Проверяем, что тело заметки свернуто
        const isCollapsed = await driver.findElements(By.css('.note_item_body.expanded'));
        assert.strictEqual(isCollapsed.length, 0, 'Тело заметки не свернулось');
    });
});