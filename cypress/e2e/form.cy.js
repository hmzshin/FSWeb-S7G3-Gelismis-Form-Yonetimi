/// <reference types="cypress" />

describe("User Log in Validation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("enter a valid name", () => {
    cy.get(".form_name_area").type("Lorem");
    cy.get(".form_name_area_validty").should("not.be.visible");

    cy.get(".form_name_area").type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}"
    );

    cy.get(".form_name_area").type("Na");

    cy.get(".form_name_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be less then 3 characters");

    cy.get(".form_name_area").type("{backspace}{backspace}");

    cy.get(".form_name_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be empty");

    cy.get(".form_name_area").type("Lorem ipsum dolor sit amet ");

    cy.get(".form_name_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be more then 20 characters");
  });

  it("enter a valid surname", () => {
    cy.get(".form_surname_area").type("Lorem");
    cy.get(".form_surname_area_validty").should("not.be.visible");

    cy.get(".form_surname_area").type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}"
    );

    cy.get(".form_surname_area").type("Su");

    cy.get(".form_surname_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be less then 3 characters");

    cy.get(".form_surname_area").type("{backspace}{backspace}");

    cy.get(".form_surname_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be empty");

    cy.get(".form_surname_area").type("Lorem ipsum dolor sit amet ");

    cy.get(".form_surname_area_validty")
      .should("be.visible")
      .should("have.text", "Can not be more then 20 characters");
  });
  it("enter a valid email", () => {
    cy.get(".form_email_input").type("Lorem");

    cy.get(".form_email_validty")
      .should("be.visible")
      .should("have.text", "Invalid email!");

    cy.get(".form_email_input").type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}"
    );

    cy.get(".form_email_validty")
      .should("be.visible")
      .should("have.text", "Can not be empty");

    cy.get(".form_email_input").type("Lorem@example.com");

    cy.get(".form_email_validty").should("not.be.visible");
  });
});
