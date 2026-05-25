import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { CustomWorld } from "../../hooks/world";

let homePage: HomePage;
let loginPage: LoginPage;
Given("user opens the homepage", async function (this: CustomWorld) {
  homePage = new HomePage(this.page);

  await homePage.openHomepage();
});

Then("homepage logo should be visible", async function (this: CustomWorld) {
  await expect(homePage.logoImage).toBeVisible();
});
Then("Verify homepage carousel banner is visible",async function (this: CustomWorld){
    await expect(homePage.carousel).toBeVisible();
});
Then(
  "all header navigation links should be visible",
  async function (this: CustomWorld) {

    const navigationLinks = [
      homePage.homeLink,
      homePage.productsLink,
      homePage.cartLink,
      homePage.signupLoginLink,
      homePage.testCasesLink,
      homePage.apiTestingLink,
      homePage.videoTutorialsLink,
      homePage.contactUsLink,
    ];

    for (const link of navigationLinks) {

      await expect(link).toBeVisible();

      await expect(link).toBeEnabled();
    }
  },
);
Then("category section should be visible", async function (this: CustomWorld) {
  await expect(homePage.categorySection).toBeVisible();
});
Then("Verify category section displays all main categories",async function (this: CustomWorld) {
   await expect(homePage.womenCategory).toBeVisible();
   await expect(homePage.menCategory).toBeVisible();
  await expect (homePage.KidsCategory).toBeVisible();
});

Then(
  "featured items section should be visible",
  async function (this: CustomWorld) {
    await expect(homePage.featuredItemsTitle).toBeVisible();
  },
);

Then("footer section should be visible", async function (this: CustomWorld) {
  await expect(homePage.footerSection).toBeVisible();
});

Then("signup login link should be visible", async function (this: CustomWorld) {
  await expect(homePage.signupLoginLink).toBeVisible();
});

Then("products link should be visible", async function (this: CustomWorld) {
  await expect(homePage.productsLink).toBeVisible();
});


