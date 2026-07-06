import { Locator, Page, expect } from "@playwright/test";

import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly allProductsTitle: Locator;
  readonly productsGrid: Locator;
  readonly productCards: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productsLink: Locator;
  readonly firstViewProductButton: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly searchedProductsTitle: Locator;
  readonly searchedProductResult: Locator;
  readonly brandsSectionTitle: Locator;
readonly searchResultCards:Locator;
  readonly poloBrandLink: Locator;

  readonly brandPageTitle: Locator;

  readonly productNames: Locator;
  readonly firstProductCard: Locator;

  readonly firstAddToCartButton: Locator;

  readonly continueShoppingButton: Locator;

  readonly cartLink: Locator;

  readonly cartProductRows: Locator;
  readonly visibleProducts: Locator;

  constructor(page: Page) {
    super(page);

    this.allProductsTitle = page.getByText("All Products");

    this.productsGrid = page.locator(".features_items");

    this.productCards = page.locator(".product-image-wrapper");

    this.searchInput = page.locator("#search_product");

    this.searchButton = page.locator('button[id="submit_search"]');
    this.productsLink = page.getByRole("link", {
      name: "Products",
    });
    this.firstViewProductButton = page
      .locator('a[href*="/product_details/"]')
      .first();
this.searchResultCards = page.locator('.features_items .product-image-wrapper');
    this.productName = page.locator(".product-information h2");

    this.productPrice = page.locator(".product-information span span");

    this.productAvailability = page.getByText("Availability:");

    this.productCondition = page.getByText("Condition:");

    this.productBrand = page.getByText("Brand:");
    this.searchedProductsTitle = page.locator(
      'h2:has-text("Searched Products")',
    );
this.searchedProductResult = page.locator(".features_items .productinfo p");
    this.brandsSectionTitle = page.locator('h2:has-text("Brands")');

    this.poloBrandLink = page.locator('a[href="/brand_products/Polo"]');

    this.brandPageTitle = page.locator(".title.text-center");

    this.productNames = page.locator(".productinfo p");
    this.firstProductCard = page.locator(".product-image-wrapper").first();

    this.firstAddToCartButton = page
      .locator('.product-overlay a:has-text("Add to cart")')
      .first();

    this.continueShoppingButton = page.locator(
      'button:has-text("Continue Shopping")',
    );

   this.cartLink = page.locator('ul.navbar-nav a[href="/view_cart"]');
   this.cartProductRows = page.locator("#cart_info tbody tr");
    this.visibleProducts = page.locator(".features_items .col-sm-4:visible");
  }

  async openProductsPage(): Promise<void> {
    await this.clickElement(this.productsLink);
  }
  async openFirstProductDetails(): Promise<void> {
    await this.closeGoogleVignetteIfPresent();

    await this.scrollIntoView(this.firstViewProductButton);

    await this.closeGoogleVignetteIfPresent();

    await this.clickElement(this.firstViewProductButton);
  }
  async searchProduct(productName: string): Promise<void> {
    await this.handleAds(); // 👈 ADD

    await this.searchInput.waitFor({ state: "visible" });

    await this.searchInput.fill(productName);

    await this.handleAds(); // 👈 ADD AGAIN

    await this.searchButton.click({ force: true });

    await this.page.waitForTimeout(2000); // 👈 IMPORTANT FOR UI UPDATE
  }
  async getSearchedProductsText(): Promise<string[]> {
    return await this.searchedProductResult.allInnerTexts();
  }
  async isSearchResultEmpty(): Promise<boolean> {
    return (
      (await this.searchedProductResult
        .first()
        .isVisible()
        .catch(() => false)) === false
    );
  }
async selectBrand(brandName: string): Promise<void> {
  await this.scrollIntoView(this.brandsSectionTitle);
  await this.closeGoogleVignetteIfPresent();

  const brandLocator = this.page.locator(
    `a[href="/brand_products/${brandName}"]`
  );

  await this.waitForElement(brandLocator);
  await brandLocator.click();

  await this.waitForPageLoad();
}

  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allInnerTexts();
  }
 async addFirstProductToCart(): Promise<void> {
  await this.handleAds();
  await this.scrollIntoView(this.firstProductCard);
  await this.closeGoogleVignetteIfPresent();
  await this.hoverElement(this.firstProductCard);
  await this.handleAds();
  await this.waitForElement(this.firstAddToCartButton);
  await this.firstAddToCartButton.click({ force: true });
  // Wait for modal and click "Continue Shopping" if present
  if (await this.continueShoppingButton.isVisible({ timeout: 3000 }).catch(() => false)) {
    await this.continueShoppingButton.click();
  }
  await this.page.waitForTimeout(1500);
}
async navigateToCart(): Promise<void> {
  await this.handleAds();

  // wait for either modal OR direct navbar
const cartLink = this.page.locator('a[href="/view_cart"]').first();
await expect(cartLink).toBeVisible({ timeout: 15000 });
await cartLink.click();

  await this.page.waitForURL(/view_cart/, { timeout: 15000 });

  // IMPORTANT: wait for page content
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForTimeout(1000);
}
}
