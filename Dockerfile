FROM mcr.microsoft.com/playwright:v1.58.2-jammy
ENV DOCKER=true

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "tsx", "node_modules/.bin/cucumber-js", "--import", "tests/ui/steps/**/*.ts"]
