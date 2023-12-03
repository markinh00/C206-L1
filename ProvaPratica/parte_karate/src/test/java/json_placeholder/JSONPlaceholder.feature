Feature: Testando API JSONPlaceholder.

Background: Executa antes de cada teste
    * def url_base = "https://jsonplaceholder.typicode.com/"
    * def request_json = read('json_de_teste.json')

Scenario: Teste 1: Pegando elementos do array response e testando seu tipo.
    Given url url_base
    And path "/posts"
    When method GET
    Then status 200
    And match $ == "#[]"
    And match $ == "#[100]"
    And match each $ contains {title: "#string", userId: "#number"}

Scenario: Teste 2: Testando retorno com informações inválidas.
    Given url url_base
    And path "/abacate"
    When method GET
    Then status 404
Scenario: Teste 3: Criando um novo elemento com o método post.
    Given url url_base
    And path "/posts"
    And request request_json
    When method POST
    Then status 201
    And match $.id == 101
    And match $.title == "#string"
    And match $.body == "body de teste"
    And match $.userId == "#number"

Scenario: Teste 4: Testando o retorno comments/1 e verificando o JSON.
    Given url url_base
    And path "/comments/1"
    When method GET
    Then status 200
    And match response.email == 'Eliseo@gardner.biz'
    And match response.id == 1

Scenario: Teste 5: Testando o retorno comments com id inválido.
    Given url url_base
    And path "/comments/1000000"
    When method GET
    Then status 404