# Guia Básico de Comandos Git

Este guia contém os principais comandos do Git para autenticação, criação e conexão com repositórios.

---

## Autenticação (Login no Git)

### Configurar usuário global

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```

---

## Inicializar um repositório local

```bash
git init
```

---

### Login via navegador (Web)

Ao usar repositórios HTTPS (como no GitHub), você pode se autenticar pelo navegador:

1. Execute um comando como:

```bash
git push
```

2. Uma janela será aberta no navegador solicitando login.

3. Faça login na sua conta (GitHub/GitLab).

4. Autorize o acesso do Git.

---

### Autenticação com token (HTTPS)

Ao fazer push/pull, será solicitado:

* Usuário: seu login
* Senha: use um **Personal Access Token**

---

## Conectar a um repositório remoto

```bash
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
```

Verificar conexão:

```bash
git remote -v
```

---

## Clonar um repositório existente

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

---

### Verificar status

```bash
git status
```

### Adicionar arquivos

```bash
git add .
```

```bash
git add nome-do-arquivo
```

### Criar commit

```bash
git commit -m "Mensagem do commit"
```

---

## Enviar alterações (push)

Primeiro push (define branch principal):

```bash
git push -u origin main
```

Próximos pushes:

```bash
git push
```

---

## Atualizar repositório local (pull)

```bash
git pull origin main
```

---

## Trabalhando com branches

### Criar nova branch

```bash
git branch nome-da-branch
```

### Trocar de branch

```bash
git checkout nome-da-branch
```

Ou criar e trocar ao mesmo tempo:

```bash
git checkout -b nome-da-branch
```

---

## Outros comandos úteis

### Ver histórico de commits

```bash
git log
```

### Desfazer alterações locais

```bash
git checkout -- nome-do-arquivo
```

### Remover arquivo do stage

```bash
git reset nome-do-arquivo
```

---
