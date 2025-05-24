# ---- STAGE 0: Dependências de sistema ----
    FROM node:22-alpine AS base
    WORKDIR /app
    RUN apk add --no-cache libc6-compat openssl
    
    # ---- STAGE 1: Instalação de dependências + geração do Prisma Client ----
    FROM base AS deps
    RUN npm install -g pnpm@10.10.0
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    # copie schema para gerar o client corretamente
    COPY prisma/schema.prisma ./prisma/schema.prisma
    RUN npx prisma generate --schema=./prisma/schema.prisma
    
    # ---- STAGE 2: Build da aplicação ----
    FROM deps AS builder
    COPY . .
    RUN pnpm run build
    
    # ---- STAGE 3: Imagem final de produção ----
    FROM node:22-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    
    # Instala apenas dependências de produção
    COPY package.json pnpm-lock.yaml ./
    RUN npm install -g pnpm@10.10.0 \
      && pnpm install --prod --frozen-lockfile
    
    # Copia artefatos do build e Prisma
    COPY --from=builder /app/dist       ./dist
    COPY --from=deps    /app/prisma     ./prisma
    COPY --from=deps    /app/node_modules ./node_modules
    
    EXPOSE 3334
    
    CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/main.js"]
    