const { test, expect } = require('@playwright/test');

test.describe('Pruebas de interfaz para el formulario de registro', () => {
    test('Registro exitoso de un cliente', async ({ page }) => {
        await page.goto('http://localhost/InterfazTesting');
        await page.fill('input[name="cedula"]', '0302993720');
        await page.fill('input[name="nombre"]', 'Maria Peñafiel');
        await page.fill('input[name="correo"]', 'fernanda.penafiel@ucuenca.edu.ec');
        await page.fill('input[name="direccion"]', 'Calle Falsa 123');
        await page.click('input[type="submit"]');

        await page.waitForSelector('#responseModal');
        const modalMessage = await page.locator('#modalMessage').innerText();
        expect(modalMessage).toContain('Registro exitoso');
    });

    test('Error al enviar datos incompletos', async ({ page }) => {
        await page.goto('http://localhost/InterfazTesting');
        await page.fill('input[name="cedula"]', '0300846060');
        await page.click('input[type="submit"]');

        await page.waitForSelector('#responseModal');
        const modalMessage = await page.locator('#modalMessage').innerText();
        expect(modalMessage).toContain('El campo nombre no puede estar vacío.');
    });

    test('Registro existente de un cliente', async ({ page }) => {
      await page.goto('http://localhost/InterfazTesting');
      await page.fill('input[name="cedula"]', '0302993712');
      await page.fill('input[name="nombre"]', 'Marisol Peñafiel');
      await page.fill('input[name="correo"]', 'marisol.penafiel@ucuenca.edu.ec');
      await page.fill('input[name="direccion"]', 'Tarqui y Vega Muñoz');
      await page.click('input[type="submit"]');

      await page.waitForSelector('#responseModal');
      const modalMessage = await page.locator('#modalMessage').innerText();
      expect(modalMessage).toContain('Registro existente');
  });
});
