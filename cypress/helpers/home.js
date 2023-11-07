import { home } from "../locators/home"

export function addToCart(index) {
    cy.get(home.productCard).eq(index).find(home.addButton).click()
    cy.get(home.cartBadge).should('be.visible')
}