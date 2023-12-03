/// <reference types="Cypress" />

describe('criando cenário de teste para o site globalsqa.com', () => {
    it('Caso de teste 1: criando um cliente com sucesso', () => {
        createCustumer()
    })
    it('Caso de teste 2: criando um cliente com falha', () => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
        cy.get(':nth-child(3) > .btn').click()
        cy.get('[ng-class="btnClass1"]').click()

        let horas = new Date().getHours().toString()
        let minutos = new Date().getMinutes().toString()
        let segundos = new Date().getSeconds().toString()

        let name = horas + minutos + segundos + 'name'
        let lastName = horas + minutos + segundos + 'lastName'

        cy.get(':nth-child(1) > .form-control').type(name)
        cy.get(':nth-child(2) > .form-control').type(lastName)
        cy.get('form.ng-dirty > .btn').click()

        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list')
        cy.get(':nth-child(6) > :nth-child(1)').should('not.exist')
    })
    it('Caso de teste 3: criando uma conta para o cliente com sucesso', () => {
        const custumer = createCustumer()
        
        cy.get('[ng-class="btnClass2"]').click()
        cy.get('#userSelect').select(custumer.name + " " + custumer.lastName)
        cy.get('#currency').select('Dollar')
        cy.get('form.ng-dirty > button').click()

        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list')
        cy.get(':nth-child(6) > :nth-child(4)').should('not.be.empty')
    })
})

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createCustumer() {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('[ng-class="btnClass1"]').click()

    let horas = new Date().getHours().toString()
    let minutos = new Date().getMinutes().toString()
    let segundos = new Date().getSeconds().toString()

    let name = horas + minutos + segundos + 'name'
    let lastName = horas + minutos + segundos + 'lastName'
    let postalcode = randomIntFromInterval(100000, 999999)

    cy.get(':nth-child(1) > .form-control').type(name)
    cy.get(':nth-child(2) > .form-control').type(lastName)
    cy.get(':nth-child(3) > .form-control').type(postalcode)
    cy.get('form.ng-dirty > .btn').click()

    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list')
    cy.get(':nth-child(6) > :nth-child(1)').should('have.text', name)

    return {name, lastName, postalcode}
}