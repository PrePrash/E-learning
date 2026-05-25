import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly loginHeading: Locator;

  readonly signupHeading: Locator;

  readonly loginEmailInput: Locator;

  readonly loginPasswordInput: Locator;

  readonly loginButton: Locator;

  readonly signupNameInput: Locator;

  readonly signupEmailInput: Locator;

  readonly signupButton: Locator;

  readonly accountInfoHeading: Locator;

  readonly titleMrRadio: Locator;

  readonly passwordInput: Locator;

  readonly firstNameInput: Locator;

  readonly lastNameInput: Locator;

  readonly addressInput: Locator;

  readonly countryDropdown: Locator;

  readonly stateInput: Locator;

  readonly cityInput: Locator;

  readonly zipcodeInput: Locator;

  readonly mobileNumberInput: Locator;

  readonly createAccountButton: Locator;

  readonly accountCreatedMessage: Locator;

  readonly continueButton: Locator;

  readonly loggedInUser: Locator;

  readonly logoutLink: Locator;

  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.loginHeading = page.getByText("Login to your account");

    this.signupHeading = page.getByText("New User Signup!");

    this.loginEmailInput = page.locator('input[data-qa="login-email"]');

    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');

    this.loginButton = page.getByRole("button", {
      name: "Login",
    });
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');

    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');

    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.accountInfoHeading = page.locator('text="Enter Account Information"');

    this.titleMrRadio = page.locator("#id_gender1");

    this.passwordInput = page.locator("#password");

    this.firstNameInput = page.locator("#first_name");

    this.lastNameInput = page.locator("#last_name");

    this.addressInput = page.locator("#address1");

    this.countryDropdown = page.locator("#country");

    this.stateInput = page.locator("#state");

    this.cityInput = page.locator("#city");

    this.zipcodeInput = page.locator("#zipcode");

    this.mobileNumberInput = page.locator("#mobile_number");

    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });

    this.accountCreatedMessage = page.getByText("Account Created!");

    this.continueButton = page.getByRole("link", {
      name: "Continue",
    });

    this.loggedInUser = page.locator('a:has-text("Logged in as")');
    this.logoutLink = page.getByRole("link", {
      name: "Logout",
    });

    this.loginErrorMessage = page.getByText(
      "Your email or password is incorrect!",
    );
  }

  async registerNewUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.fillText(this.signupNameInput, name);

    await this.fillText(this.signupEmailInput, email);

    await this.closeGoogleVignetteIfPresent();

    await this.clickElement(this.signupButton);

    await this.closeGoogleVignetteIfPresent();

    await this.waitForElement(this.accountInfoHeading);

    await this.waitForElement(this.accountInfoHeading);

    await this.clickElement(this.titleMrRadio);

    await this.fillText(this.passwordInput, password);

    await this.fillText(this.firstNameInput, "Preeti");

    await this.fillText(this.lastNameInput, "Garg");

    await this.fillText(this.addressInput, "Delhi");

    await this.selectDropdownOption(this.countryDropdown, "India");

    await this.fillText(this.stateInput, "Delhi");

    await this.fillText(this.cityInput, "New Delhi");

    await this.fillText(this.zipcodeInput, "110001");

    await this.fillText(this.mobileNumberInput, "9876543210");

    await this.clickElement(this.createAccountButton);
  }
  async loginUser(email: string, password: string): Promise<void> {
    await this.fillText(this.loginEmailInput, email);

    await this.fillText(this.loginPasswordInput, password);

    await this.clickElement(this.loginButton);
  }
  async loginWithInvalidCredentials(): Promise<void> {
    await this.fillText(this.loginEmailInput, "invaliduser@gmail.com");

    await this.fillText(this.loginPasswordInput, "wrongpassword");

    await this.clickElement(this.loginButton);
  }
  async logoutUser(): Promise<void> {
    await this.clickElement(this.logoutLink);
  }
}
