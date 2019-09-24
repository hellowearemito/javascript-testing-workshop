// https://jestjs.io/docs/en/expect

// https://jestjs.io/docs/en/expect#tobevalue
// Use .toBe to compare primitive values or to check referential identity of object instances.
test("toBe", () => {
  expect(1).toBe(1);
  expect(false).toBe(false);
  expect({}).not.toBe({});
});

// https://jestjs.io/docs/en/expect#toequalvalue
// Use .toEqual to compare recursively all properties of object instances (also known as "deep" equality).
test("toEqual", () => {
  const conf1 = {
    topic: "JavaScript",
    speakers: 21
  };
  const conf2 = {
    topic: "JavaScript",
    speakers: 21
  };

  expect(conf1).toEqual(conf2);
  expect(conf1).not.toBe(conf2);

  const array1 = ["javascript", "testing", { framework: "jest", e2e: "cypress" }];
  const array2 = ["javascript", "testing", { framework: "jest", e2e: "cypress" }];

  expect(array1).toEqual(array2);
});

// https://jestjs.io/docs/en/expect#tomatchobjectobject
// Use .toMatchObject to check that a JavaScript object matches a subset of the properties of an object.
test("toMatchObject", () => {
  const houseForSale = {
    bath: true,
    bedrooms: 4,
    kitchen: {
      amenities: ["oven", "stove", "washer"],
      area: 20,
      wallColor: "white"
    }
  };
  const desiredHouse = {
    bath: true,
    kitchen: {
      amenities: ["oven", "stove", "washer"],
      wallColor: expect.stringMatching(/white|yellow/)
    }
  };

  expect(houseForSale).toMatchObject(desiredHouse);
});

// https://jestjs.io/docs/en/expect#tohavebeencalledtimesnumber
// Use .toHaveBeenCalledTimes to ensure that a mock function got called exact number of times.
const drinkEach = (callback, drinks) => drinks.forEach(callback);
test("drinkEach drinks each drink", () => {
  const drink = jest.fn();
  drinkEach(drink, ["lemon", "octopus"]);
  expect(drink).toHaveBeenCalledTimes(2);
});

// Truthiness
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// Numbers
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// Strings
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

// Arrays and iterables
const shoppingList = ["diapers", "kleenex", "trash bags", "paper towels", "beer"];

test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});
