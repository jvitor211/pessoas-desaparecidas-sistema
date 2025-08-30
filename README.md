# Sistema de Pessoas Desaparecidas - Mato Grosso

> Single Page Application para consulta e colaboração de informações sobre pessoas desaparecidas da Polícia Civil de Mato Grosso.

## 📋 Dados de Inscrição

**Desenvolvedor:** João Rondon  
**Email:** jvbarbosa211@gmail.com  
**Numero:** (65) 992681781 
**Data de Desenvolvimento:** Agosto 2025  
**Tecnologias:** React + TypeScript + Tailwind CSS + Vite  

## 🎨 **Atualizações Recentes - Design Profissional**

### ✨ **Tema Dark Institucional**
- Paleta de cores oficial da Polícia Civil MT (dourado + escuro)
- Background gradiente escuro profissional
- Identidade visual consistente em todos componentes

### 🏛️ **Logo Oficial Integrada**
- Brasão da Polícia Civil MT no header
- Posicionamento responsivo (desktop/mobile)
- Efeitos visuais com hover dourado

### ⚡ **Interface Minimalista**
- Filtros compactos que aproveitam todo espaço da tela
- Layout responsivo otimizado (2→3→4→6 colunas)
- Cards com cores padronizadas (sem variações azul/roxo)

### 🔍 **Busca Aprimorada**  
- **NOVO**: Filtro por sexo (Masculino/Feminino)
- Campos organizados em grid inteligente
- Botões de ação próximos e centralizados

## 🌟 Funcionalidades

### ✅ Implementadas
- **Consulta de Registros**: Visualização de pessoas desaparecidas e localizadas
- **Busca Avançada**: Filtros por nome, status, sexo e localização
- **Paginação**: Sistema de navegação entre páginas (10 registros por página)
- **Detalhes Completos**: Página dedicada com informações detalhadas
- **Envio de Informações**: Formulário para colaboração cidadã
- **Upload de Fotos**: Anexo de imagens com validação
- **Layout Responsivo**: Adaptação para desktop, tablet e mobile
- **Lazy Loading**: Otimização de carregamento de rotas
- **Tratamento de Erros**: Feedback adequado para falhas de API
- **Containerização**: Docker pronto para produção

### 🎨 Interface
- **Tema Dark Profissional**: Cores institucionais da Polícia Civil MT
- **Logo Oficial**: Brasão da Polícia Civil MT integrado ao header
- **Design Minimalista**: Interface otimizada para máxima eficiência
- **Filtros Compactos**: Layout inteligente que aproveita todo espaço da tela
- **Cores Padronizadas**: Paleta dourada/escura consistente em todos elementos
- **Componentes reutilizáveis** com design system profissional
- **Máscaras de entrada** (telefone) com validação
- **Notificações toast** com feedback visual
- **Estados de loading** elegantes
- **Página 404 personalizada**

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Docker (opcional)

### 1. Instalação Local

```bash
# Clone o repositório
git clone https://github.com/jvitor211/pessoas-desaparecidas-sistema.git
cd pessoas-desaparecidas-sistema

# Instale as dependências
npm install

# Execute em modo desenvolvimento (requer Node.js 20.19+ ou 22.12+)
npm run dev

# ALTERNATIVA: Se sua versão do Node.js for anterior a 20.19
# Use o servidor de produção:
npm run build
npm run serve

# Acesse http://localhost:3000 (servidor customizado)
# ou http://localhost:5173 (Vite dev)
```

### 2. Build para Produção

```bash
# Gere o build otimizado
npm run build

# Visualize o build local
npm run preview
```

### 3. Execução com Docker

```bash
# Build da imagem
docker build -t pessoas-desaparecidas-app .

# Execute o container
docker run -p 8080:80 pessoas-desaparecidas-app

# Acesse http://localhost:8080
```

### 4. Docker Compose (opcional)

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 🧪 Testes

```bash
# Execute os testes (se implementados)
npm run test

# Cobertura de testes
npm run test:coverage

# Lint do código
npm run lint

# Verificação de tipos TypeScript
npm run type-check
```

## ⚠️ Problemas Conhecidos e Soluções

### Erro de Versão do Node.js

**Problema:** `You are using Node.js 20.10.0. Vite requires Node.js version 20.19+ or 22.12+`

**Soluções:**

1. **Opção Recomendada - Servidor Python (Mais Estável):**
   ```bash
   npm run build
   python server.py
   # Acesse: http://localhost:3000
   ```

2. **Alternativa - Servidor Node.js:**
   ```bash
   npm run build
   npm run serve
   # Acesse: http://localhost:3000
   ```

2. **Atualizar Node.js (Ideal):**
   - Baixe Node.js 22.x em: https://nodejs.org/
   - Ou use nvm: `nvm install 22 && nvm use 22`

3. **Docker (Alternativa):**
   ```bash
   docker build -t pessoas-desaparecidas-app .
   docker run -p 8080:80 pessoas-desaparecidas-app
   # Acesse: http://localhost:8080
   ```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── InformationForm.tsx
├── pages/              # Páginas da aplicação
│   ├── HomePage.tsx
│   └── PersonDetailPage.tsx
├── hooks/              # Hooks customizados
│   ├── usePerson.ts
│   └── usePersons.ts
├── services/           # Serviços de API
│   └── api.ts
├── types/              # Definições TypeScript
│   └── index.ts
├── utils/              # Utilitários
│   └── formatters.ts
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router Dom** - Roteamento SPA
- **Tailwind CSS** - Framework CSS utilitário

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de esquemas
- **@hookform/resolvers** - Integração Yup + React Hook Form

### HTTP e Estado
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações

### Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Heroicons** - Biblioteca de ícones

### Deploy
- **Docker** - Containerização
- **Nginx** - Servidor web

## 🌐 API Endpoints

Base URL: `VITE_API_BASE_URL`

### Pessoas
- `GET /api/pessoas` - Lista pessoas com filtros
- `GET /api/pessoas/{id}` - Busca pessoa por ID
- `GET /api/estatisticas` - Estatísticas gerais

### Informações
- `POST /api/informacoes` - Envia nova informação

### Parâmetros de Busca
- `page` - Número da página (0-indexed)
- `size` - Itens por página
- `nome` - Filtro por nome
- `status` - DESAPARECIDA | LOCALIZADA
- `sexo` - MASCULINO | FEMININO
- `localDesaparecimento` - Filtro por local

## 🔐 Segurança e Privacidade

- Todas as informações são tratadas com confidencialidade
- Dados compartilhados apenas com autoridades competentes
- Validação de uploads (tipo e tamanho de arquivo)
- Headers de segurança configurados no Nginx
- Sanitização de inputs do usuário

## 📱 Responsividade

### Breakpoints Suportados
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Funcionalidades Mobile
- Navigation adaptativa
- Cards em grid responsivo
- Formulários otimizados para touch
- Paginação simplificada

## 🐛 Tratamento de Erros

### Tipos de Erro
- **Network Errors**: Problemas de conectividade
- **API Errors**: Erros do servidor (4xx, 5xx)
- **Validation Errors**: Erros de validação de formulário
- **File Upload Errors**: Problemas com upload de arquivos

### User Feedback
- Toasts informativos
- Estados de loading
- Mensagens de erro contextuais
- Fallbacks para dados não encontrados

## 🚨 Contatos de Emergência

- **Polícia Civil MT**: 197
- **Emergência**: 190
- **API Issues**: Verificar status em `VITE_API_BASE_URL`

## 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico para a Polícia Civil de Mato Grosso.


**Desenvolvido com ❤️ para ajudar a conectar famílias**
