# API de Compra de Ingressos para Eventos 🎫

Este projeto é uma API RESTful para gerenciar a compra de ingressos para eventos. A API permite que os usuários listem eventos, criem contas, façam login, realizem compras, listem suas compras e cancelem compras. Esta é a primeira versão do projeto, com funcionalidades principais implementadas e preparada para futuras expansões.

## Funcionalidades

A API oferece as seguintes operações:

- **Listar eventos**: Visualize todos os eventos disponíveis.
- **Criar uma conta**: Cadastre-se para acessar a plataforma.
- **Fazer login**: Autentique-se para realizar ações protegidas.
- **Realizar compra**: Compre ingressos para eventos de seu interesse.
- **Listar compras**: Veja o histórico de compras realizadas.
- **Cancelar compra**: Cancele uma compra, se necessário.

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- **TypeScript**: Linguagem utilizada para tipagem estática e segurança no desenvolvimento.
- **Node.js**: Plataforma de desenvolvimento para JavaScript no backend.
- **Express**: Framework para construir a API de forma rápida e organizada.
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
- **Jest**: Framework de testes para garantir a qualidade e confiabilidade da API.
- **Dotenv**: Gerenciador de variáveis de ambiente para proteger informações sensíveis.
- **UUID**: Gerador de identificadores únicos, usado para identificação de recursos.


## Estrutura do Projeto

API_REST_VENDAS/
├── .github/                  # Arquivos e configurações do GitHub  
├── node_modules/             # Dependências do projeto  
├── resultados/               # Pasta para armazenar resultados de testes ou outras saídas  
├── src/                      # Código-fonte principal  
│   ├── auxiliares/           # Funções auxiliares  
│   │   └── criptografia.ts   # Função de criptografia para senhas  
│   ├── middlewares/          # Middlewares para validação e autenticação  
│   │   └── autenticarLogin.ts # Middleware de autenticação  
│   ├── tipos/                # Definição de tipos e interfaces  
│   │   ├── Compra.ts         # Tipo para compras  
│   │   ├── Evento.ts         # Tipo para eventos  
│   │   └── Usuario.ts        # Tipo para usuários  
│   ├── app.ts                # Configuração principal do app Express  
│   ├── bancoDeDados.ts       # Simulação de banco de dados em memória  
│   ├── fraseSecreta.ts       # Armazena frases secretas e dados sensíveis  
│   ├── index.ts              # Ponto de entrada do servidor  
│   └── rotas.ts              # Definição das rotas da API  
├── _test_/                   # Arquivos de teste unitário e integração  
│   ├── parteI.test.ts  
│   ├── parteII.test.ts  
│   ├── parteIII.test.ts  
│   ├── parteIV.test.ts  
│   └── parteV.test.ts  
├── .gitignore                # Arquivos ignorados pelo Git  
├── CustomReporter.js         # Arquivo customizado para relatórios de testes  
├── jest.config.js            # Configuração do Jest para testes  
├── package-lock.json         # Arquivo de lock das dependências  
├── package.json              # Configurações e dependências do projeto  
├── README.md                 # Documentação do projeto  
└── tsconfig.json             # Configuração do TypeScript  

## Endpoints

Aqui estão alguns dos principais endpoints implementados:

- `GET /` - Retorna uma mensagem.  
- `GET /eventos?maxPreco=5000` - Lista todos os eventos cadastrados no banco de dados, caso filtro seja passado
  retorna somente os eventos com preço menor ou igual ao filtro.  
- `POST /compras?comprovante=COMPROVANTE_LOGIN` - Essa rota é responsável pela criação de uma nova compra.  
- `GET /compras?comprovante=COMPROVANTE_LOGIN` - Listagem das compras de um usuário.  
- `DELETE/compras/:id?comprovante=COMPROVANTE_LOGIN` - Cancelar uma compra específica.

## Instalação e Uso

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash```
   git clone https://github.com/felipeomelodev/API-REST-VENDA-DE-INGRESSOS.git
   cd API_REST_VENDAS

2. **Instalar as dependências**:
   ```npm install ```

3. **Para rodar o servidor**:
   ```npm run dev ```

4. **Para executar os testes**:
   ```npm run test```

## Considerações Finais

Este projeto tem como objetivo demonstrar a implementação de uma API RESTful para o gerenciamento de eventos e compras de ingressos, com foco em segurança, testes e boas práticas de desenvolvimento. A estrutura do código foi organizada de forma modular para facilitar a manutenção e expansão futura, incluindo a implementação de middlewares, criptografia de senhas e testes automatizados. Sinta-se à vontade para contribuir com melhorias, relatar problemas ou sugerir novas funcionalidades. Para mais informações, consulte a documentação e os testes inclusos no repositório.
