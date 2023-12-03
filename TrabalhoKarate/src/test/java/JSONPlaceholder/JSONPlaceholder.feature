Feature: Testando API JSONPlaceholder.

Background: Executa antes de cada teste
    * def url_base = "https://jsonplaceholder.typicode.com/"

Scenario: Test 1: Testando retorno.
    Given url url_base
    And path "/todos/1"
    When method GET
    Then status 200

Scenario: Test 2: Testando retorno com informações inválidas.
    Given url url_base
    And path "/abacate"
    When method GET
    Then status 404

Scenario: Test 3: Testando o retorno comments/1 e verificando o JSON.
    Given url url_base
    And path "/comments/1"
    When method GET
    Then status 200
    And match response.email == 'Eliseo@gardner.biz'
    And match response.id == 1

Scenario: Test 4: Testando o retorno comments com id inválido.
    Given url url_base
    And path "/comments/1000000"
    When method GET
    Then status 404

Scenario: Test 5: Testando o retorno albums entrando em um dos elementos do array e testando retorno JSON.
    Given url url_base
    And path "/albums"
    When method GET
    Then status 200
    And def title = $[5].title
    And print title

Scenario: Test 6: Testando o retorno todos/1 e verificando o JSON.
    Given url url_base
    And path "/todos/1"
    When method GET
    Then status 200
    And match response.id == 1
    And match response.completed == false
    And match response.title == 'delectus aut autem'