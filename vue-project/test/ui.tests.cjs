const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const os = require('os');
const fs = require('fs');

describe('Todoo Component Tests', function() {
    this.timeout(10000);
    let driver;

    before(async function() {
        // Создаем временную директорию для пользовательских данных
        const tempDir = path.join(os.tmpdir(), 'temp_user_data_' + Date.now());
        fs.mkdirSync(tempDir, { recursive: true });

        const chromeOptions = new chrome.Options()
            .addArguments('--no-sandbox')
            .addArguments('--disable-dev-shm-usage')
            .addArguments(`--user-data-dir=${tempDir}`);

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get('http://localhost:5173'); 
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('Корректное отображение названия', async function() {
        const titleElement = await driver.findElement(By.xpath("//*[text()='Заметки']"));
        const titleText = await titleElement.getText();
        assert.strictEqual(titleText, 'Заметки');
    });
});



    // it('Возможность создать заметку', async function() {
    //     const createButton = await driver.findElement(By.xpath("//*[text()='Создать заметку']"));
    //     await createButton.click();

    //     const textboxes = await driver.wait(until.elementsLocated(By.css('textarea.TextArea')), 15000);
    //     const textbox = textboxes[0]; 

    //     assert.ok(textbox, 'Textbox для новой заметки должен быть отображен');

    //     await driver.wait(until.elementIsVisible(textbox), 15000); 
    //     await textbox.sendKeys('Тестовая заметка');

    //     const saveButton = await driver.findElement(By.xpath("//*[text()='Сохранить']"));
    //     await driver.wait(until.elementIsVisible(saveButton), 15000); 
    //     await saveButton.click();

    //     const noteText = await driver.wait(until.elementLocated(By.xpath("//*[text()='Тестовая заметка']")), 15000);
    //     assert.ok(noteText, 'Новая заметка должна быть отображена');
    // });

    // it('Возможность удалить заметку', async function() {
    //     const deleteButtons = await driver.findElements(By.xpath("//*[text()='Удалить']"));
    //     if (deleteButtons.length > 0) {
    //         await driver.wait(until.elementIsVisible(deleteButtons[0]), 15000);
    //         await deleteButtons[0].click(); 
    //     }

    //     const deletedNote = await driver.wait(until.elementsLocated(By.xpath("//*[text()='Тестовая заметка']")), 15000);
    //     assert.strictEqual(deletedNote.length, 0, 'Заметка должна быть удалена');
    // });

