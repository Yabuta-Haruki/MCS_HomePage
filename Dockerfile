# Node.js公式イメージを使用
FROM node:22-alpine AS build

# 作業ディレクトリの設定
WORKDIR /app

# パッケージ管理ファイルのコピーとインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピーとビルド
COPY . .
RUN npm run build

# 実行用イメージ（軽量版）
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./.env

# ポートの公開
EXPOSE 3000

# アプリの起動
CMD ["node", "dist/main"]
