# movie-site

Site para gerenciamento de usuários e filmes.

## Tecnologia utilizada

    Serviço desenvolvido utilizando os frameworks NextJS e MaterialUI.

    A autenticação funciona através de JWT.

    O serviço pode ser executado local ou em um container docker.

## Sobre o Serviço

    O site não está totalmente preparado para o responsivo.

### Iniciando o serviço

    O serviço pode ser executado local utilizando o comando `yarn dev`. Para isso é necessário configurar o arquivo `next.config.js` na raiz do projeto.

    // TODO: Como executar em container docker

<br>

| Variáveis de ambiente | Descrição                                              | Valor default                    |
| --------------------- | ------------------------------------------------------ | -------------------------------- |
| movieApiBaseUrl       | Host para api de filmes                                | http://localhost:3001            |
| movieSiteBaseUrl      | Host da aplicação                                      | http://localhost:3000            |
| responsiveBreakpoint  | Tamanho de tela para quebra de responivo               | 768                              |

<br> 
<br>

### Scripts para uso

    Para executar os scripts abaixo, acesse a raiz do projeto através de um terminal e digite o comando desejado utilizando `yarn` ou `npm`. Exemplo: yarn dev.

| Comando      | Descrição                                           |
| ------------ | --------------------------------------------------- |
| dev          | Inicia a aplicação local                            |
| build        | Faz o build da aplicação para produção              |
| start        | Inicia a aplicação em produção                      |
| prettier     | Ajusta a formatação do código utilizando o prettier |

<br>

## TODO
    - Implementar responsivo em todo o serviço
    - layout pode ser melhorado
    - implementar execução via Docker
    - implementar testes