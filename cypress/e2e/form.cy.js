/// <reference types="cypress" />

describe("User Log in Validation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("enter a valid name", () => {
    cy.get("#form_name_area").type("Ha");

    cy.get("#form_name_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be less then 3 characters");

    cy.get("#form_name_area").type("{backspace}{backspace}");

    cy.get("#form_name_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be empty");

    cy.get("#form_name_area").type("Lorem ipsum dolor sit amet ");

    cy.get("#form_name_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be more then 20 characters");

    // nameInput.type("ornek urun 1");

    // cy.get("#name-validation").should("be.hidden");
  });
});
