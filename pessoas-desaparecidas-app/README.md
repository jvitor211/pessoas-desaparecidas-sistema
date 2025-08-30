# 🚔 Sistema de Pessoas Desaparecidas - Polícia Civil MT

##  Dados de Inscrição
- **Candidato**: João Rondon
- **Email**: jvbarbosa211@gmail.com
- **Telefone**: (65) 992681781
- **Projeto**: Sistema Integrado de Pessoas Desaparecidas (SIPD-MT)
- **Data**: 29 de Agosto de 2025
- **Tecnologia**: Single Page Application (SPA) - React + TypeScript
##  Sobre o Projeto

Sistema desenvolvido para a Polícia Judiciária Civil de Mato Grosso que permite aos cidadãos:

1. **Consultar registros** de pessoas desaparecidas ou já localizadas
2. **Enviar informações adicionais** (observações, localização, fotos) sobre essas pessoas

##  Funcionalidades Implementadas

###  Tela Inicial
- ✅ Cards com foto e dados das pessoas (desaparecidas/localizadas)
- ✅ Paginação (mínimo 10 registros por página)
- ✅ Campo de busca conforme parâmetros da API
- ✅ Filtros por status e localização
- ✅ Design responsivo com cores institucionais

### Página de Detalhes
- ✅ Informações completas ao clicar no card
- ✅ Destaque visual do status ("Desaparecida" vs "Localizada")
- ✅ Layout profissional com identidade da Polícia Civil

### Envio de Informações
- ✅ Formulário para cidadãos registrarem novas informações
- ✅ Máscaras de entrada (telefones, datas)
- ✅ Upload de fotos e indicação de localização
- ✅ Validação robusta dos campos

##  Tecnologias Utilizadas

- **React 19** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **React Router Dom** - Roteamento com lazy loading
- **Axios** - Cliente HTTP para API
- **React Hook Form** - Gerenciamento de formulários
- **React Hot Toast** - Notificações
- **Font Awesome** - Biblioteca de ícones profissionais

##  API Endpoints

O sistema consome dados **REAIS** da API oficial da Polícia Civil MT:
- **Configuração**: Via variáveis de ambiente (arquivo `.env`)
- **Documentação**: Disponível via Swagger UI
- **Status**: ✅ **API ativa** com registros reais de pessoas desaparecidas

### Principais Endpoints:
- `GET /v1/pessoas/aberto` - Listagem pública de pessoas
- `GET /v1/pessoas/aberto/filtro` - Busca com filtros
- `GET /v1/pessoas/aberto/estatistico` - Estatísticas gerais
- `GET /v1/pessoas/{id}` - Detalhes de uma pessoa
- `POST /v1/ocorrencias/informacoes-desaparecido` - Envio de informações

> ⚠️ **Configuração de Segurança**: A URL da API é configurada via variáveis de ambiente
> para proteger informações sensíveis. Consulte o arquivo `.env.example` para configuração.

##  Instalação e Execução

### Pré-requisitos
- Node.js 18+ ou Python 3.7+
- Git

### 1. Clonar o Repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd pessoas-desaparecidas-app
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Executar em Desenvolvimento
```bash
npm run dev
```
**Acesse**: `http://localhost:3000`

> ⚠️ **Nota**: O comando `npm run dev` executa o build de produção + servidor local Node.js devido à compatibilidade com a versão do Node.js.

### 4. Build para Produção
```bash
npm run build
```

### 5. Apenas Servir Build Local
```bash
npm run serve
```
**Acesse**: `http://localhost:3000`

## 🐳 Execução com Docker

> ⚠️ **Importante**: Execute os comandos Docker no diretório **pai** (`Desenvolve-MT/`), não dentro de `pessoas-desaparecidas-app/`

### Build da Imagem
```bash
cd ..
docker build -t sipd-mt .
```

### Executar Container
```bash
docker run -p 80:80 sipd-mt
```
**Acesse**: `http://localhost`

### Parar Container
```bash
docker stop $(docker ps -q --filter ancestor=sipd-mt)
```

## 🧪 Testes

### Testar Funcionalidades
1. **Navegação**: Teste a busca e filtros na página inicial
2. **Detalhes**: Clique em um card para ver informações completas
3. **Formulário**: Teste o envio de informações na página de detalhes
4. **Responsividade**: Teste em diferentes tamanhos de tela

### Executar Linting
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── InformationForm.tsx
├── hooks/              # Custom hooks
│   ├── usePerson.ts
│   └── usePersons.ts
├── pages/              # Páginas da aplicação
│   ├── HomePage.tsx
│   └── PersonDetailPage.tsx
├── services/           # Serviços da API
│   ├── api.ts
│   └── api-mock.ts
├── types/              # Definições TypeScript
│   └── index.ts
├── utils/              # Utilitários
│   └── formatters.ts
├── App.tsx             # Componente principal
└── main.tsx           # Ponto de entrada
```

##  Segurança

- ✅ Validação de entrada em todos os formulários
- ✅ Sanitização de dados antes do envio
- ✅ Headers de segurança configurados
- ✅ CORS apropriado para produção

## 📱 Responsividade

- ✅ **Mobile First**: Design otimizado para dispositivos móveis
- ✅ **Breakpoints**: Adaptação para tablet e desktop
- ✅ **Grid Responsivo**: Layout que se adapta automaticamente
- ✅ **Touch Friendly**: Elementos adequados para toque

## ⚠️ Tratamento de Erros

- ✅ Interceptação de erros da API
- ✅ Fallback para dados mock em caso de falha
- ✅ Notificações de erro para o usuário
- ✅ Loading states em todas as operações

## 📞 Contatos de Emergência

- **Polícia Civil**: 197
- **Emergência**: 190
- **Sistema**: Todas as informações são tratadas com confidencialidade

## 📄 Licença

Este projeto foi desenvolvido para a Polícia Civil de Mato Grosso como parte de um teste prático.


**🚔 Desenvolvido com dedicação para contribuir com a segurança pública de Mato Grosso**