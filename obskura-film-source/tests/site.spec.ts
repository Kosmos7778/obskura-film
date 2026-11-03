import { test, expect } from "@playwright/test";

/**
 * Тесты сайта кинокомпании «ОБСКУРА».
 *
 * Ключевое требование: первый экран — это кино (кадры и трейлер),
 * а всё остальное раскрывается ниже по скроллу И через боковое меню.
 *
 * Запуск:  bunx playwright test   (или npm run test)
 * Требуется один раз: bun add -d @playwright/test && bunx playwright install chromium
 * Если dev-сервер не запущен, playwright.config.ts поднимет его сам.
 */

const SECTIONS = ["about", "filmography", "projects", "press", "ai", "contacts"] as const;

const menuButton = (page: import("@playwright/test").Page, i: number) =>
  page.locator('nav[aria-label="Разделы сайта"] button').nth(i);

/** Дождаться окончания интро-заставки (2,4 с + фейд 1,1 с) */
async function passIntro(page: import("@playwright/test").Page) {
  await page.waitForTimeout(3600);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await passIntro(page);
});

test("первый экран — кино: кадр фильма виден сразу, разделы начинаются ниже фолда", async ({ page }) => {
  // Кадр на hero виден без скролла (src может быть закодирован через /_next/image)
  const heroFrame = page.locator('img[src*="hero-"]').first();
  await expect(heroFrame).toBeVisible();

  // Все секции существуют и начинаются ниже первого экрана
  const data = await page.evaluate((ids) => {
    const innerH = window.innerHeight;
    const tops = ids.map((id) => {
      const el = document.getElementById(id);
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
    });
    return { innerH, tops };
  }, SECTIONS);

  expect(data.tops.every((t) => t !== null)).toBeTruthy(); // ни одна секция не потерялась
  expect(data.tops[0]).toBeGreaterThan(data.innerH); // «О компании» — ниже первого экрана
  // Секции идут строго по порядку, без пересечений
  const sorted = [...(data.tops as number[])].sort((a, b) => a - b);
  expect(sorted).toEqual(data.tops);
});

test("боковое меню содержит шесть пронумерованных разделов", async ({ page }) => {
  const buttons = page.locator('nav[aria-label="Разделы сайта"] button');
  await expect(buttons).toHaveCount(6);
  await expect(buttons.nth(0)).toContainText("01");
  await expect(buttons.nth(5)).toContainText("06");
});

test("каждый пункт бокового меню приводит ровно в свою секцию", async ({ page }) => {
  for (let i = 0; i < SECTIONS.length; i++) {
    const targetTop = await page.evaluate((id) => {
      const el = document.getElementById(id)!;
      return Math.round(el.getBoundingClientRect().top + window.scrollY);
    }, SECTIONS[i]);

    await menuButton(page, i).click();

    // Lenis-скролл длится ~1,7 с — ждём, пока scrollY совпадёт с позицией секции
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 6000 })
      .toBe(targetTop);
  }
});

test("scroll-spy: активный пункт меню подсвечивается после перехода", async ({ page }) => {
  await menuButton(page, 1).click(); // 02 Фильмография
  await page.waitForTimeout(2200);

  const active = page.locator('nav[aria-label="Разделы сайта"] button[aria-current="true"]');
  await expect(active).toHaveCount(1);
  await expect(active).toContainText("02");
});

test("шоурил-трейлер открывается с первого экрана и закрывается по Esc", async ({ page }) => {
  await page.locator('button[aria-label="Смотреть трейлер-шоурил кинокомпании"]').click();

  const dialog = page.locator('[role="dialog"][aria-label="Трейлер кинокомпании"]');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("ОБСКУРА"); // титульная карточка

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden({ timeout: 4000 });
});

test("в фильмографии шесть вышедших фильмов с постерами", async ({ page }) => {
  const posters = page.locator("#filmography img[src*='film-']");
  await expect(posters).toHaveCount(6);
});

test("мобильная версия: бургер открывает оверлей-меню, пункт ведёт в секцию", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  // На мобильных десктопная рейка скрыта, есть бургер
  await expect(page.locator('button[aria-label="Открыть меню"]')).toBeVisible();

  await page.locator('button[aria-label="Открыть меню"]').click();

  // Оверлей-меню — второй nav с тем же aria-label (первый скрыт в DOM)
  const overlayNav = page.locator('nav[aria-label="Разделы сайта"]').last();
  await expect(overlayNav).toBeVisible();

  const targetTop = await page.evaluate((id) => {
    const el = document.getElementById(id)!;
    return Math.round(el.getBoundingClientRect().top + window.scrollY);
  }, "projects");

  await overlayNav.locator("button", { hasText: "Проекты" }).click();

  // go() ждёт 350 мс на закрытие оверлея, затем скроллит
  await expect
    .poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 8000 })
    .toBe(targetTop);
});
