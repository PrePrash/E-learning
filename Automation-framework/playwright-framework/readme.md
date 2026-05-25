playwright-bdd-framework/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── config/
│   ├── env.ts
│   ├── playwright.config.ts
│   ├── cucumber.js
│   └── globalConfig.ts
│
├── src/
│   │
│   ├── features/
│   │   ├── ui/
│   │   │   ├── login.feature
│   │   │   ├── products.feature
│   │   │   ├── cart.feature
│   │   │   └── contact.feature
│   │   │
│   │   └── api/
│   │       ├── productsApi.feature
│   │       ├── brandsApi.feature
│   │       ├── loginApi.feature
│   │       └── userLifecycle.feature
│   │
│   ├── steps/
│   │   ├── ui/
│   │   │   ├── loginSteps.ts
│   │   │   ├── productsSteps.ts
│   │   │   ├── cartSteps.ts
│   │   │   └── contactSteps.ts
│   │   │
│   │   └── api/
│   │       ├── productsApiSteps.ts
│   │       ├── brandsApiSteps.ts
│   │       ├── loginApiSteps.ts
│   │       └── userLifecycleSteps.ts
│   │
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   ├── ContactPage.ts
│   │   └── ProductDetailsPage.ts
│   │
│   ├── api/
│   │   ├── client/
│   │   │   ├── ApiClient.ts
│   │   │   └── RequestManager.ts
│   │   │
│   │   ├── services/
│   │   │   ├── ProductService.ts
│   │   │   ├── BrandService.ts
│   │   │   ├── AuthService.ts
│   │   │   └── UserService.ts
│   │   │
│   │   ├── payloads/
│   │   │   ├── createUserPayload.ts
│   │   │   ├── updateUserPayload.ts
│   │   │   └── loginPayload.ts
│   │   │
│   │   ├── interfaces/
│   │   │   ├── user.interface.ts
│   │   │   ├── product.interface.ts
│   │   │   └── apiResponse.interface.ts
│   │   │
│   │   └── utils/
│   │       └── formDataBuilder.ts
│   │
│   ├── hooks/
│   │   ├── hooks.ts
│   │   ├── world.ts
│   │   └── testContext.ts
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── fakerData.ts
│   │   ├── dateUtil.ts
│   │   ├── screenshotUtil.ts
│   │   ├── environment.ts
│   │   ├── constants.ts
│   │   ├── waitUtils.ts
│   │   └── fileUploadUtil.ts
│   │
│   ├── fixtures/
│   │   ├── users.json
│   │   └── products.json
│   │
│   └── types/
│       ├── customWorld.ts
│       └── global.d.ts
│
├── test-results/
├── allure-results/
├── allure-report/
├── screenshots/
├── traces/
│
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md




UI Automation Architecture Flow
Feature
 → Steps
   → Pages
     → BasePage
       → Playwright
API Automation Architecture Flow
Feature
 → API Steps
   → Service Layer
     → ApiClient
       → Request Context


Install logger:

npm install winston

Install allure runtime:

npm install allure-js-commons


src/api/
│
├── client/
│    └── ApiClient.ts
│
├── services/
│    ├── ProductService.ts
│    ├── AuthService.ts
│    └── UserService.ts
│
├── interfaces/
│    ├── product.interface.ts
│    ├── auth.interface.ts
│    └── user.interface.ts
│
└── payloads/
     └── user.payload.ts
     