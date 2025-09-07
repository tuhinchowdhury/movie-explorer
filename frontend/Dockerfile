FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install && npm install @headlessui/react @heroicons/react

COPY . .

# Install netcat for wait-for.sh
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

EXPOSE 5173

CMD ["/wait-for.sh", "backend", "8000", "npx", "vite", "--host", "0.0.0.0", "--port", "5173"]

