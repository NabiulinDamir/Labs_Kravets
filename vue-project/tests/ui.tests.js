const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Todoo Component', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:5173'); 
    });

    after(async function() {
        await driver.quit();
    });

    it('Корректное отображение названия', async function() {
        const titleElement = await driver.findElement(By.xpath("//*[text()='Заметки']"));
        const titleText = await titleElement.getText();
        assert.strictEqual(titleText, 'Заметки');
    });

    it('Возможность создать заметку', async function() {
        const addButton = await driver.findElement(By.xpath("//*[text()='Создать заметку']"));
        await addButton.click();

        const textbox = await driver.wait(until.elementsLocated(By.css('input[type="text"]')), 5000);
        assert.ok(textbox.length > 0, 'Textbox должен быть отображен');
    });

    it('Возможность изменить заметку', async function() {
        const changeButtons = await driver.findElements(By.xpath("//*[text()='Изменить']"));
        
        if (changeButtons.length > 0) {
            await changeButtons[0].click();
        }

        const textbox = await driver.wait(until.elementsLocated(By.css('input[type="text"]')), 5000);
        assert.ok(textbox.length > 0, 'Textbox должен быть отображен для редактирования');
    });
});