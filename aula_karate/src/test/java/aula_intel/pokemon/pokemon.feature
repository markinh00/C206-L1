Feature: Testando API StarWars.

Background: Executa antes de cada teste
    * def url_base = "https://pokeapi.co/api/v2/"

Scenario: Testando retorno.
    Given url "https://pokeapi.co/api/v2/pokemon/pikachu"
    When method GET
    Then status 200

Scenario: Testando retorno com informações inválidas.
    Given url "https://pokeapi.co/api/v2/pokemon/chocolate"
    When method GET
    Then status 404

Scenario: Testando o retorno pikachu e verificando o JSON.
    Given url url_base
    And path "pokemon/pikachu"
    When method GET
    Then status 200
    And match response.name == 'pikachu'
    And match response.id == 25

Scenario: Testando o retorno pokemon Rede entrando em um dos elementos do array de idiomas e testando retorno JSON.
    Given url url_base
    And path "/version/1/"
    When method GET
    Then status 200
    And def idioma = $.names[5].language.url
    And print idioma