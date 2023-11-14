describe('testando o site https://www.saucedemo.com/', () => {
    it('Caso de teste 1: fazer login com sucesso', () => {
        fazerLogin()
    })
    it('Caso de teste 2: fazer login com falha', () => {
        const nome_disponiveis = [
            'standard_user',
            'locked_out_user',
            'problem_user',
            'performance_glitch_user',
            'error_user',
            'visual_user'
        ]
        const index = randomIntFromInterval(0, 5)
        const nome = nome_disponiveis[index]
        const senha = 'secret_sauce'

        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type(nome)
        cy.get('[data-test="password"]').type(senha)
        cy.get('[data-test="password"]').clear()
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Password is required')
    })
    it('Caso de teste 3: adicionando produto no carrinho de compras com sucesso', () => {
        fazerLogin()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
    })
    it('Caso de teste 4: finalizando a compra com sucesso', () => {
        const usuario = fazerLogin()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type(usuario.nome)
        cy.get('[data-test="lastName"]').type(usuario.nome)
        cy.get('[data-test="postalCode"]').type(usuario.codigoPostal)
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    })
    it('Caso de teste 5: finalizando a compra com falha', () => {
        fazerLogin()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required')
    })
    it('Caso de teste 6: fazendo o logout com sucesso', () => {
        fazerLogin()

        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.url().should('eq', 'https://www.saucedemo.com/')
    })
})

//função para gerar um número aleatorio entre dois números (min e max)
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function fazerLogin() {
    const nome_disponiveis = [
        'standard_user',
        'locked_out_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user'
    ]
    const codigoPostal = randomIntFromInterval(10000, 99999) + '-' + randomIntFromInterval(100, 999)
    const index = randomIntFromInterval(0, 5)
    const nome = nome_disponiveis[index]
    const senha = 'secret_sauce'

    cy.visit("https://www.saucedemo.com/")
    cy.get('[data-test="username"]').type(nome)
    cy.get('[data-test="password"]').type(senha)
    cy.get('[data-test="login-button"]').click()

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

    return { nome, senha, codigoPostal }
}