# Nginx 部署文档

## 文档目录

1. [安装 Nginx](#1-安装-nginx)
   - [macOS 安装](#11-macos-安装)
   - [Ubuntu/Debian 安装](#12-ubuntudebian-安装)
   - [CentOS/RHEL 安装](#13-centosrhel-安装)
   - [验证安装](#14-验证安装)
   - [默认配置位置](#15-默认配置位置)
2. [Nginx 配置](#2-nginx-配置)
   - [基本配置结构](#21-基本配置结构)
   - [性能调优参数](#22-性能调优参数)
   - [反向代理配置](#23-反向代理配置)
   - [负载均衡配置](#24-负载均衡配置)
3. [Nginx 服务管理](#3-nginx-服务管理)
   - [启动、停止和重启命令](#31-启动停止和重启命令)
   - [常用维护命令](#32-常用维护命令)
   - [日志管理](#33-日志管理)
   - [安全相关命令](#34-安全相关命令)
4. [完整配置文件示例及说明](#4-完整配置文件示例及说明)
   - [基本配置示例](#41-基本配置示例)
   - [配置说明](#42-配置说明)
   - [配置部署步骤](#43-配置部署步骤)
   - [常见配置场景扩展](#44-常见配置场景扩展)
5. [总结](#5-总结)

## 介绍

本文档提供了 Nginx 的完整部署指南，包括安装、配置、服务管理以及针对 XDream 研发平台的具体配置示例。本指南适用于不同操作系统环境（macOS、Ubuntu/Debian、CentOS/RHEL），并包含了性能调优、反向代理、负载均衡等常用功能的配置方法。

## 1. 安装 Nginx

### 1.1 macOS 安装

在 macOS 系统上，可以使用 Homebrew 进行安装：

```bash
# 安装 Homebrew（如果尚未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 使用 Homebrew 安装 Nginx
brew install nginx

# 启动 Nginx 服务
brew services start nginx
```

### 1.2 Ubuntu/Debian 安装

```bash
# 更新软件包列表
apt update

# 安装 Nginx
apt install nginx -y

# 启动 Nginx 服务
systemctl start nginx

# 设置开机自启
systemctl enable nginx
```

### 1.3 CentOS/RHEL 安装

```bash
# 安装 EPEL 仓库
yum install epel-release -y

# 安装 Nginx
yum install nginx -y

# 启动 Nginx 服务
systemctl start nginx

# 设置开机自启
systemctl enable nginx
```

### 1.4 验证安装

```bash
# 检查 Nginx 版本
nginx -v

# 检查 Nginx 服务状态
# macOS: brew services list
# Linux: systemctl status nginx
```

### 1.5 默认配置位置

- 配置文件: `/etc/nginx/nginx.conf` (Linux) 或 `/usr/local/etc/nginx/nginx.conf` (macOS)
- 站点配置目录: `/etc/nginx/sites-available/` 和 `/etc/nginx/sites-enabled/` (Linux)
- 日志目录: `/var/log/nginx/` (Linux) 或 `/usr/local/var/log/nginx/` (macOS)
- 网页根目录: `/usr/share/nginx/html/` (Linux) 或 `/usr/local/var/www/` (macOS)

## 2. Nginx 配置

### 2.1 基本配置结构

Nginx 配置文件由以下几个主要部分组成：

- **全局块**：设置影响整个 Nginx 服务器的全局配置
- **events 块**：配置与网络连接相关的参数
- **http 块**：包含所有与 HTTP 协议相关的配置
  - **server 块**：配置虚拟主机
    - **location 块**：配置 URL 路径匹配和处理规则

### 2.2 性能调优参数

以下是一些常用的性能调优参数，可以添加到相应的配置块中：

#### 2.2.1 全局块优化

```nginx
# 工作进程数，建议设置为 CPU 核心数
worker_processes auto;

# 错误日志配置
error_log /var/log/nginx/error.log warn;

# PID 文件位置
pid /var/run/nginx.pid;
```

#### 2.2.2 Events 块优化

```nginx
events {
    # 每个工作进程的最大连接数
    worker_connections 1024;
    
    # 使用高效的事件驱动模型
    use epoll;  # Linux 系统
    # use kqueue;  # BSD/macOS 系统
    
    # 一次接受所有新连接
    multi_accept on;
}
```

#### 2.2.3 HTTP 块优化

```nginx
http {
    # 启用 sendfile 以加速文件传输
    sendfile on;
    
    # 优化 sendfile 使用
    tcp_nopush on;
    
    # 减少网络传输延迟
    tcp_nodelay on;
    
    # 长连接超时时间
    keepalive_timeout 65;
    
    # 每个客户端的最大长连接请求数
    keepalive_requests 100;
    
    # 缓冲区配置
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    output_buffers 1 32k;
    postpone_output 1460;
    
    # Gzip 压缩
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 2.3 反向代理配置

反向代理是 Nginx 的常用功能，以下是基本的代理配置示例：

```nginx
location / {
    # 代理到后端服务器
    proxy_pass http://backend_server:port;
    
    # 设置代理头信息
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # 代理超时设置
    proxy_connect_timeout 60;
    proxy_send_timeout 60;
    proxy_read_timeout 60;
    
    # 缓冲区设置
    proxy_buffering on;
    proxy_buffer_size 16k;
    proxy_buffers 4 32k;
    proxy_busy_buffers_size 64k;
}
```

### 2.4 负载均衡配置

如果需要将请求分发到多个后端服务器，可以配置负载均衡：

```nginx
# 在 http 块中定义上游服务器组
upstream backend_servers {
    # 简单轮询
    server backend1:port;
    server backend2:port;
    server backend3:port;
    
    # 可选配置
    # server backend1:port weight=5;  # 权重设置
    # server backend2:port max_fails=3 fail_timeout=30s;  # 失败重试
    # ip_hash;  # IP 哈希，确保同一客户端访问同一服务器
}

# 在 server 块中使用
location / {
    proxy_pass http://backend_servers;
    # 其他代理配置...
}

## 3. Nginx 服务管理

### 3.1 启动、停止和重启命令

#### 3.1.1 Linux 系统（Systemd）

```bash
# 启动 Nginx
systemctl start nginx

# 停止 Nginx
systemctl stop nginx

# 重启 Nginx
systemctl restart nginx

# 重新加载配置（不中断服务）
systemctl reload nginx

# 查看 Nginx 状态
systemctl status nginx

# 设置开机自启
systemctl enable nginx

# 取消开机自启
systemctl disable nginx
```

#### 3.1.2 macOS 系统

```bash
# 使用 Homebrew 服务管理
brew services start nginx
brew services stop nginx
brew services restart nginx
brew services reload nginx
brew services list

# 或直接使用 nginx 命令
nginx          # 启动
nginx -s stop  # 立即停止
nginx -s quit  # 优雅停止
nginx -s reload # 重新加载配置
```

### 3.2 常用维护命令

```bash
# 检查配置文件语法
nginx -t

# 检查特定配置文件语法
nginx -t -c /path/to/nginx.conf

# 查看 Nginx 版本信息
nginx -v      # 简短版本信息
nginx -V      # 详细版本信息，包括编译选项

# 查看 Nginx 进程
ps aux | grep nginx

# 查看 Nginx 监听的端口
netstat -tulpn | grep nginx
# 或
lsof -i -P -n | grep nginx
```

### 3.3 日志管理

```bash
# 查看访问日志（实时）
tail -f /var/log/nginx/access.log  # Linux
# 或
tail -f /usr/local/var/log/nginx/access.log  # macOS

# 查看错误日志（实时）
tail -f /var/log/nginx/error.log  # Linux
# 或
tail -f /usr/local/var/log/nginx/error.log  # macOS

# 日志轮转（通常由系统自动完成）
# 手动触发日志轮转
logrotate -f /etc/logrotate.d/nginx  # Linux
```

### 3.4 安全相关命令

```bash
# 限制 Nginx 进程的文件描述符数
ulimit -n 65535

# 使用 HTTPS 时生成自签名证书（仅用于测试）
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt

## 4. 完整配置文件示例及说明

### 4.1 基本配置示例（基于当前项目）

以下是一个完整的 Nginx 配置文件示例，基于当前 XDream 研发平台的配置：

```nginx
# Nginx配置文件 - XDream研发平台

worker_processes auto;
events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    # 主站配置 - www.xdreamdev.com 指向3000端口
    server {
        listen 80;
        server_name www.xdreamdev.com;
        
        location / {
            proxy_pass http://146.56.251.98:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # 代码平台配置 - code.xdreamdev.com 指向8080端口
    server {
        listen 80;
        server_name code.xdreamdev.com;
        
        location / {
            proxy_pass http://146.56.251.98:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # 文件服务配置 - file.xdreamdev.com 指向5000端口
    server {
        listen 80;
        server_name file.xdreamdev.com;
        
        location / {
            proxy_pass http://146.56.251.98:5000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### 4.2 配置说明

#### 4.2.1 全局配置部分

- `worker_processes auto;`：自动设置工作进程数，通常等于 CPU 核心数，以充分利用系统资源。
- `events` 块：配置工作进程如何处理连接，`worker_connections 1024;` 表示每个工作进程最多可以同时处理 1024 个连接。

#### 4.2.2 HTTP 核心配置

- `include mime.types;`：包含 MIME 类型映射文件，使 Nginx 能够识别不同文件类型。
- `default_type application/octet-stream;`：设置默认的 MIME 类型。
- `sendfile on;`：启用零复制文件传输，提高文件传输效率。
- `keepalive_timeout 65;`：设置长连接超时时间为 65 秒，减少连接建立的开销。

#### 4.2.3 虚拟主机配置

本配置包含三个虚拟主机（server 块），分别对应三个不同的域名：

1. **主站配置**（www.xdreamdev.com）：
   - 监听 80 端口
   - 将请求代理到后端服务器 146.56.251.98 的 3000 端口
   - 传递必要的请求头信息，包括主机名、真实 IP 和协议类型

2. **代码平台配置**（code.xdreamdev.com）：
   - 监听 80 端口
   - 将请求代理到后端服务器 146.56.251.98 的 8080 端口
   - 同样配置了完整的代理头信息

3. **文件服务配置**（file.xdreamdev.com）：
   - 监听 80 端口
   - 将请求代理到后端服务器 146.56.251.98 的 5000 端口
   - 配置了标准的代理头信息

### 4.3 配置部署步骤

1. **复制配置文件**：
   ```bash
   # Linux 系统
   sudo cp nginx.conf /etc/nginx/nginx.conf
   
   # macOS 系统（使用 Homebrew 安装）
   cp nginx.conf /usr/local/etc/nginx/nginx.conf
   ```

2. **检查配置语法**：
   ```bash
   nginx -t
   ```

3. **重新加载配置**：
   ```bash
   # Linux 系统
   sudo systemctl reload nginx
   
   # macOS 系统
   brew services reload nginx
   # 或
   nginx -s reload
   ```

4. **配置域名解析**：
   - 在 DNS 服务器或本地 hosts 文件中，将 www.xdreamdev.com、code.xdreamdev.com 和 file.xdreamdev.com 指向您的服务器 IP。
   - 本地测试时，可以修改 hosts 文件：
     ```bash
     # Linux/macOS
     sudo vi /etc/hosts
     
     # 添加以下行
     127.0.0.1 www.xdreamdev.com
     127.0.0.1 code.xdreamdev.com
     127.0.0.1 file.xdreamdev.com
     ```

### 4.4 常见配置场景扩展

#### 4.4.1 HTTPS 配置示例

```nginx
server {
    listen 443 ssl;
    server_name www.xdreamdev.com;
    
    # SSL 证书配置
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;
    
    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    
    location / {
        proxy_pass http://146.56.251.98:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name www.xdreamdev.com;
    return 301 https://$host$request_uri;
}```

#### 4.4.2 静态文件服务配置

```nginx
server {
    listen 80;
    server_name static.xdreamdev.com;
    
    root /var/www/static;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 缓存控制
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}```

#### 4.4.3 负载均衡配置（扩展当前配置）

```nginx
http {
    # 定义上游服务器组
    upstream main_app {
        server 146.56.251.98:3000;
        server 146.56.251.98:3001 backup;  # 备用服务器
    }
    
    upstream code_platform {
        server 146.56.251.98:8080;
        server 146.56.251.98:8081;        # 第二个实例
    }
    
    upstream file_service {
        server 146.56.251.98:5000;
    }
    
    # 主站配置
    server {
        listen 80;
        server_name www.xdreamdev.com;
        
        location / {
            proxy_pass http://main_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    
    # 其他配置类似...
}

## 5. 总结

本 Nginx 部署文档提供了从安装到配置、从服务管理到高级功能的全面指导。根据您的实际环境（macOS、Ubuntu/Debian 或 CentOS/RHEL），您可以参考相应的安装步骤，并根据项目需求调整配置文件。

### 关键要点

1. **安装方式**：根据操作系统选择合适的安装方法，安装完成后务必验证 Nginx 是否正常运行。

2. **配置管理**：
   - 合理调整性能参数以适应您的服务器硬件环境
   - 配置反向代理时确保正确设置请求头信息
   - 对于高流量站点，考虑实施负载均衡以提高可靠性和性能

3. **服务管理**：
   - 使用 `nginx -t` 验证配置语法正确性
   - 使用平滑重载（reload）而非重启来应用配置更改
   - 定期查看日志以监控系统状态和排查问题

4. **安全考虑**：
   - 对于生产环境，建议配置 HTTPS 加密通信
   - 限制 Nginx 进程的文件描述符数以优化性能
   - 考虑实施访问控制和其他安全措施

通过遵循本指南，您应该能够成功部署和管理 Nginx 服务器，为您的应用提供高性能、可靠的 Web 服务支持。
```