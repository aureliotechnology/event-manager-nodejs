# Event Manager API

A **Event Manager API** é uma solução moderna e escalável para gerenciamento de eventos, desenvolvida com foco em rapidez, qualidade e alta manutenibilidade. Este projeto foi criado com as melhores práticas de engenharia de software – adotando uma arquitetura hexagonal, Clean Code e os princípios SOLID – para oferecer uma base robusta e flexível, que pode ser facilmente ampliada e adaptada às necessidades futuras.

## Visão Geral

A API foi construída utilizando o **NestJS** com **Node.js 18 (LTS)** e **MongoDB** (com Mongoose), adotando UUIDs como chave primária para facilitar a transição para modelos relacionais, se necessário. Além disso, a documentação da API é gerada automaticamente via **Swagger (OpenAPI)**, proporcionando uma interface interativa para desenvolvedores e integradores.

## Principais Características

- **Desenvolvimento Rápido e de Alta Qualidade:**
  O projeto foi desenvolvido de forma ágil, sem sacrificar a qualidade. Cada parte do código foi pensada para ser clara, modular e de fácil manutenção.

- **Arquitetura Hexagonal:**
  A separação clara entre as camadas de domínio, aplicação, infraestrutura e apresentação garante que as regras de negócio fiquem isoladas, facilitando a evolução e testes do sistema.

- **Testes Abrangentes:**
  Foram implementados testes unitários para as entidades, DTOs e serviços, garantindo robustez e confiabilidade. Embora os testes dos controllers ainda não estejam finalizados, eles estão em desenvolvimento e serão implementados o mais breve possível.

- **Organização do Código e Melhoria Contínua:**
  O código está organizado de forma a facilitar a compreensão e a colaboração. Melhorias constantes foram incorporadas durante o desenvolvimento, resultando em um sistema eficiente e de alta performance.

- **Documentação Automática:**
  Com o Swagger integrado, a API apresenta uma documentação interativa e atualizada, permitindo que qualquer desenvolvedor possa explorar e testar os endpoints de forma simples e intuitiva.

## Estrutura do Projeto

A organização do projeto segue os seguintes padrões:

```plaintext
src/
├── events/
|---------domain/
|---------presentation/
|----------------------controlles/
|---------enum/
|---------services/
├── config/
└── shared/
