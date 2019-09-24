describe("Fill form with one way data", () => {
  const stationsUrl = "https://jsconf-ws-api.mito.hu/asset/stations";

  it("should search for a one way flight", () => {
    cy.visit("/");
    cy.contains("h1", "Mito Airline");
    cy.request("GET", stationsUrl).as("stations");
    cy.get("@stations").should(response => {
      expect(response.body).to.have.length(114);
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
    });

    // Selects outbound station

    // Selects return station

    // Open departure datepicker

    // Selects departure date (Tomorrow)

    // Submit search
  });
});
