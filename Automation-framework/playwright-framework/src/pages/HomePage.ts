import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { config } from "../../config/env";
export class HomePage extends BasePage {
  readonly logoImage: Locator;
  readonly carousel : Locator;
  readonly footerSection: Locator;
  readonly categorySection: Locator;
 readonly featuredItemsTitle: Locator;
    readonly womenCategory : Locator;
    readonly menCategory : Locator;
    readonly KidsCategory : Locator;
    readonly homeLink: Locator;
readonly productsLink: Locator;
readonly cartLink: Locator;
readonly signupLoginLink: Locator;
readonly testCasesLink: Locator;
readonly apiTestingLink: Locator;
readonly videoTutorialsLink: Locator;
readonly contactUsLink: Locator;
  constructor(page: Page) {
    super(page);

    this.logoImage = this.page.getByAltText("Website for automation practice");

    this.footerSection = this.page.locator("#footer");

    this.categorySection = this.page.getByText("Category");

    this.signupLoginLink = this.page.getByRole("link", {
      name: "Signup / Login",
    });

    this.productsLink = this.page.getByRole("link", {
      name: "Products",
    });

    this.featuredItemsTitle = this.page.getByText("Features Items");
    this.carousel = this.page.locator('#slider-carousel');
  this.womenCategory = this.page.locator('a[href="#Women"]');
this.menCategory = this.page.locator('a[href="#Men"]');
this.KidsCategory = this.page.locator('a[href="#Kids"]');
this.homeLink = page.getByRole("link", { name: "Home" });

this.cartLink = page.getByRole("link", {
  name: "Cart",
});

this.testCasesLink = page
  .locator(".navbar-nav")
  .getByRole("link", { name: "Test Cases" });
this.apiTestingLink = page
  .locator(".navbar-nav")
  .getByRole("link", { name: "API Testing" });

this.videoTutorialsLink = page.getByRole("link", {
  name: "Video Tutorials",
});

this.contactUsLink = page.getByRole("link", {
  name: "Contact us",
});
  }

  async openHomepage(): Promise<void> {
    await this.navigateTo(config.baseUrl);
  }


// Navigation 
async clickHome(): Promise<void> {
  await this.clickElement(this.homeLink);
}

async clickProducts(): Promise<void> {
  await this.clickElement(this.productsLink);
}

async clickCart(): Promise<void> {
  await this.clickElement(this.cartLink);
}

async clickSignupLogin(): Promise<void> {
  await this.clickElement(this.signupLoginLink);
}

async clickTestCases(): Promise<void> {
  await this.clickElement(this.testCasesLink);
}

async clickApiTesting(): Promise<void> {
  await this.clickElement(this.apiTestingLink);
}

async clickContactUs(): Promise<void> {
  await this.clickElement(this.contactUsLink);
}

}
