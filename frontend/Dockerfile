# Imagem de DESENVOLVIMENTO do frontend (next dev com hot reload)
FROM node:20-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1 \
    WATCHPACK_POLLING=true

COPY package.json package-lock.json ./
RUN npm ci

# Em DEV o código é sobrescrito pelo bind mount (-v ./frontend:/app);
# node_modules fica num volume anônimo para não usar os binários do host.
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
