import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
  //1. go to test page
  await page.goto("https://main.d2r1jmobwdbsgk.amplifyapp.com/");

  //2. test category
  await page.getByPlaceholder("new category").fill("2");
  await page.getByRole("button", { name: "update" }).click();

  const category = await page.getByTestId("category").innerText();

  expect(category).toEqual("category: 2");

  //3. test get
  await page.getByPlaceholder("put key").fill("1");
  await page.getByPlaceholder("put value").fill("1");

  await page.getByRole("button", { name: "put" }).click();

  await page.getByPlaceholder("put key").fill("2");
  await page.getByPlaceholder("put value").fill("2");

  await page.getByRole("button", { name: "put" }).click();

  await page.getByPlaceholder("put key").fill("3");
  await page.getByPlaceholder("put value").fill("3");

  await page.getByRole("button", { name: "put" }).click();

  const result = await page.getByTestId("result").innerText();

  expect(result).toEqual("result: evicts key 1");

  return;
});
