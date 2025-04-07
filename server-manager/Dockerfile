FROM docker:dind

WORKDIR /app

# Install required packages
RUN apk add --no-cache \
    bash \
    curl \
    nodejs \
    npm \
    python3 \
    py3-pip

# Copy application code
COPY . .

# Install Node.js dependencies
RUN npm ci

# Install Docker Compose
RUN pip3 install docker-compose

# Create directory for Minecraft servers
RUN mkdir -p /minecraft

EXPOSE 8080

CMD ["npm", "start"]
