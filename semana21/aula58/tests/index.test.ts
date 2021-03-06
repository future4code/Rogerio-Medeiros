import { performPurchase } from "../src";
import { LOCATION, NACIONALITY } from "../src/entities/enums";
import { Casino, User, UserNacionatily } from "../src/entities/user";
import { checkAge } from "../src/services/checks";

//2a.
test("Testing balance greater than value", () => {
  const user: User = {
    name: "Indio Medeiros",
    balance: 100,
  };

  const result = performPurchase(user, 50);

  expect(result).toEqual({
    ...user,
    balance: 50,
  });
});

//2b.
test("Testing balance greater than value", () => {
  const user: User = {
    name: "Indio Medeiros",
    balance: 50,
  };

  const result = performPurchase(user, 50);

  expect(result).toEqual({
    ...user,
    balance: 0,
  });
});

//2c.
test("Testing balance greater than value", () => {
  const user: User = {
    name: "Indio Medeiros",
    balance: 30,
  };

  const result = performPurchase(user, 50);

  expect(result).toEqual(undefined);
});

//4a.
test("1 Testing brasilizan allowed", () => {
  const brasilizan: UserNacionatily = {
    name: "indio",
    age: 19,
    nacionality: NACIONALITY.BRAZILIAN,
  };

  const casino: Casino = {
    name: "Discoteca baiana",
    location: LOCATION.BRAZIL,
  };

  const result = checkAge(casino, [brasilizan]);
  expect(result.brazilians.allowed).toEqual(["indio"]);
});

//4b.
test("1  american allowed", () => {
  const brasilizan: UserNacionatily = {
    name: "indio",
    age: 19,
    nacionality: NACIONALITY.AMERICAN,
  };

  const casino: Casino = {
    name: "Discoteca baiana",
    location: LOCATION.BRAZIL,
  };

  const result = checkAge(casino, [brasilizan]);
  expect(result.americans.allowed).toEqual(["indio"]);
});

//4c.
test("1 No one allowed", () => {
  const brasilizan: UserNacionatily = {
    name: "indio",
    age: 19,
    nacionality: NACIONALITY.BRAZILIAN,
  };

  const american: UserNacionatily = {
    name: "indian",
    age: 19,
    nacionality: NACIONALITY.AMERICAN,
  };

  const casino: Casino = {
    name: "Discoteca baiana",
    location: LOCATION.EUA,
  };

  const result = checkAge(casino, [brasilizan, brasilizan, american, american]);

  expect(result.brazilians.unallowed).toEqual(["indio", "indio"]);
  expect(result.americans.unallowed).toEqual(["indian", "indian"]);
});

//4d
test("2 american allowed and 2 brazilian unallowed", () => {
  const brasilizan: UserNacionatily = {
    name: "indio BR",
    age: 19,
    nacionality: NACIONALITY.BRAZILIAN,
  };

  const american: UserNacionatily = {
    name: "indio EUA",
    age: 21,
    nacionality: NACIONALITY.AMERICAN,
  };

  const casino: Casino = {
    name: "Discoteca americana",
    location: LOCATION.EUA,
  };

  const result = checkAge(casino, [brasilizan, brasilizan, american, american]);

  expect(result.brazilians.unallowed).toEqual(["indio BR", "indio BR"]);
  expect(result.americans.allowed).toEqual(["indio EUA", "indio EUA"]);
});

//5a
test("1 brazilian allowed", () => {
  const brazilian: UserNacionatily = {
    name: "Astrodev",
    age: 19,
    nacionality: NACIONALITY.BRAZILIAN,
  };

  const casino: Casino = {
    name: "Balada Estelar",
    location: LOCATION.BRAZIL,
  };

  const result = checkAge(casino, [brazilian]);
  expect(result.brazilians.allowed.length).toBeGreaterThan(0);
  expect(result.brazilians.allowed.length).toBeLessThan(2);
});

//5b.
test("1 american allowed", () => {
  const brazilian: UserNacionatily = {
    name: "Astrodev",
    age: 19,
    nacionality: NACIONALITY.AMERICAN,
  };

  const casino: Casino = {
    name: "Balada Estelar",
    location: LOCATION.BRAZIL,
  };

  const result = checkAge(casino, [brazilian]);
  expect(result.americans.unallowed.length).toBe(0);
});

//5c.
test("No one allowed", () => {
  const brazilian: UserNacionatily = {
    name: "Astrodev BR",
    age: 19,
    nacionality: NACIONALITY.BRAZILIAN,
  };

  const american: UserNacionatily = {
    name: "Astrodev EUA",
    age: 19,
    nacionality: NACIONALITY.AMERICAN,
  };

  const casino: Casino = {
    name: "Balada Estelar",
    location: LOCATION.EUA,
  };

  const result = checkAge(casino, [brazilian, brazilian, american, american]);

  expect(result.brazilians.unallowed).toContain("Astrodev BR");
  expect(result.americans.unallowed).toContain("Astrodev EUA");
});

//5d.
test("2 american allowed and 2 brazilians unallowed", () => {
  const brazilian: UserNacionatily = {
    name: "Astrodev BR",
    age: 19,
    nacionality: NACIONALITY.BRAZILIAN,
  };

  const american: UserNacionatily = {
    name: "Astrodev EUA",
    age: 21,
    nacionality: NACIONALITY.AMERICAN,
  };

  const casino: Casino = {
    name: "Balada Estelar",
    location: LOCATION.EUA,
  };

  const result = checkAge(casino, [brazilian, brazilian, american, american]);
  expect(result.brazilians.unallowed.length).toBeGreaterThan(1);
  expect(result.americans.unallowed.length).toBeLessThan(1);
  expect(result.americans.allowed.length).toBe(2);
});
