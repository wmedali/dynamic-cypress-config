const { addToCart } = require("../helpers/home");
const { login, checkErrorMessage } = require("../helpers/login");

describe("visite d'un site web e-commerce", () => {
    beforeEach(() => {
        cy.visit("/");
    })
    it("Achat de produit", () => {
        login('standard_user', 'secret_sauce')
        addToCart(1)
    });

    it("Erreur en mot de passe", () => {
        login('standard_user', 'error_password')
        checkErrorMessage('Username and password do not match any user in this service')
    });

    it("Nom d'utilisateur vide", () => {
        login('', 'secret_sauce')
        checkErrorMessage('Username is required')
    });

    it('password vide', () => {
        login('standard_user', '')
        checkErrorMessage('Password is required')

    })

});