# 多阶段Dockerfile用于构建和运行Next.js应用（不需要数据库）
# 使用方法：
# 1. 构建镜像: docker build -t xdream-app .
# 2. 运行容器: docker run -p 3000:3000 xdream-app

# 阶段1: 构建应用
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置npm镜像源以加速依赖安装
RUN npm config set registry https://registry.npmmirror.com

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制所有源代码
COPY . .

# 创建.env文件（如果需要，可以根据.env.example创建）
RUN if [ -f .env.example ]; then cp .env.example .env; fi

# 设置SKIP_ENV_VALIDATION以跳过环境变量验证，使应用可以在没有数据库的情况下运行
ENV SKIP_ENV_VALIDATION=true

# 构建应用
RUN npm run build

# 阶段2: 运行应用
FROM node:18-alpine AS runner

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=true

# 从构建阶段复制package.json和必要的文件
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# 暴露应用端口
EXPOSE 3000

# 运行应用
CMD ["npm", "start"]

# 注意：由于跳过了环境变量验证，应用可能会在尝试访问数据库时显示错误
# 这是预期行为，因为我们没有配置数据库环境