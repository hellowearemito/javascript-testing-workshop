// import { filterStations, isConnectionAllowed } from "../utils";

test("isConnectionAllowed only allows valid connections", () => {
  // Make some assertions for the isConnectionAllowed function
});

describe("filterStations", () => {
  test("returns an empty array if no stations found", () => {
    // Create an empty array of stations
    // Make some assertions that the returned value is equal to an empty array
    // if filterStations is called with this empty array.
  });

  test("returns a single match for a station code", () => {
    // Create an array of stations
    // You can use the below array for example:
    // const stations = [
    //  {
    //    iata: "BUD",
    //    shortName: "Budapest"
    //  },
    //  {
    //    iata: "LTN",
    //    shortName: "London Luton"
    //  }
    // ];
    //
    // Assert that only a single item is returned
    // if a station code is passed as the second parameter to filterStations
  });

  test("returns multiple matches if there is a partial name match", () => {
    // Create an array of stations
    // You can use the below array for example:
    // const stations = [
    //   {
    //     iata: "BUD",
    //     shortName: "Budapest"
    //   },
    //   {
    //     iata: "OTP",
    //     shortName: "Bucharest"
    //   },
    //   {
    //     iata: "HAM",
    //     shortName: "Hamburg"
    //   },
    //   {
    //     iata: "LTN",
    //     shortName: "London Luton"
    //   }
    // ];
    //
    // Call filterStations with a second parameter that will match multiple stations (e.g. "bu").
    //
    // Create an object that contains the desired properties
    // then match the results to that object
    //
    // Hint: use .toMatchObject, you can find examples in tests/jest-expect/__tests__/expect-matchers.js
  });
});
