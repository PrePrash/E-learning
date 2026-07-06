import { faker } from "@faker-js/faker";

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export const generateUserData = (): UserData => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const generateUserDataForAPI = () => {
  return {
    name: faker.person.fullName(),
    email: `test_${Date.now()}@gmail.com`,
    password: faker.internet.password(),
    title: "Mrs",
    birth_date: "10",
    birth_month: "May",
    birth_year: "1998",
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
     address2:faker.location.city(),
    country: "India",
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.phone.number(),
  };
};