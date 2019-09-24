import { getDefaultState } from "../../../src/store";

context("Booking", () => {
  const getStore = () => cy.window().its("app.$store");

  describe("check and populate store", () => {
    it("resets store and starts a search", () => {
      // goes to the actual page
      cy.visit("/flight-select");
      cy.contains("h1", "Mito Airline");

      // should compare empty states are okay
      const defaultState = getDefaultState();
      getStore()
        .its("state")
        .should("deep.equal", defaultState);

      // should set stations
      cy.fixture("selectedStations").then(selectedStations => {
        getStore().then(store => {
          const selectedStation = selectedStations.selectedStations;
          store.dispatch("selectStation", { type: "outbound", station: selectedStation.outbound });
          store.dispatch("selectStation", { type: "return", station: selectedStation.return });
        });
      });

      // should set dates
      cy.fixture("search").then(search => {
        const { departureDate, returnDate } = search.search;
        getStore().then(store => {
          store.dispatch("setInputValue", { propName: "departureDate", value: departureDate });
          store.dispatch("setInputValue", { propName: "returnDate", value: returnDate });
        });
      });

      // should get result
      getStore().then(store => {
        store.dispatch("getResults", "outbound");
        store.dispatch("getResults", "return");
      });
    });
  });

  describe("select outbound, return fare and pay", () => {
    it("Selects outbound fare", () => {
      // Selects outbound fare
      // Selects return fare
      // should display click on the pay button
      // should check if modal displayed
      // should click on reset
    });
  });
});
