### Pluga Challenge Front-end

PT_BR: Este projeto é um desafio do processo seletivo da Pluga para Front-end. O objetivo é refatorar uma aplicação React para Next.js, implementar testes, melhorar performance e apresentar funcionalidades como listagem dos apps integrados à Pluga, busca, paginação e um modal com os últimos apps acessados.

ENG_US: This project is a challenge from Pluga's Front-end hiring process. The goal is to refactor a React application to Next.js, implement tests, improve performance, and deliver features such as listing Pluga's integrated apps, search, pagination, and a modal with recently accessed apps.

- Next.js
- React
- TypeScript
- Tailwind e DaisyUI
- Jest
- React Testing Library

## Estrutura do Projeto

O projeto está organizado da seguinte forma:
- `src/`: Contém todo o código-fonte da aplicação.
  - `components/`: Componentes reutilizáveis.
  - `app/`: Páginas do Next.js.
  - `services/`: Chamada da API.
  - `types/`: Tipos TypeScript e interfaces.
  - `contexts/`: Contextos da aplicação.


## Executando o Projeto
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```  

## Testes

Para rodar os testes automatizados, siga os passos abaixo:

1. Instale as dependências de teste:
   ```bash
   npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom
   ```

2. Certifique-se de que os arquivos de configuração estejam presentes:
   - `jest.config.js`:
     ```js
     module.exports = {
       testEnvironment: "jsdom",
       setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
       moduleNameMapper: {
         "\\.(css|less|sass|scss)$": "identity-obj-proxy",
         "^@/(.*)$": "<rootDir>/src/$1",
       },
       transform: {
         "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
       },
       testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
     };
     ```
   - `jest.setup.ts`:
     ```ts
     import '@testing-library/jest-dom/extend-expect';
     ```
   - `tsconfig.jest.json` (caso necessário):
     ```json
     {
       "extends": "./tsconfig.json",
       "compilerOptions": {
         "module": "commonjs"
       }
     }
     ```

3. Execute os testes:
   ```bash
   npm run test
   ```

Os testes estão localizados em `src/components/__tests__/` e utilizam Jest e React Testing Library para garantir o funcionamento dos componentes.