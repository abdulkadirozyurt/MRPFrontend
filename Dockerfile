# Node.js resmi imajını kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /app

# package.json dosyasını ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Kodları ve diğer dosyaları kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Uygulamayı çalıştır
CMD ["npm", "run", "start"]

# Dinlenecek port
EXPOSE 3000
