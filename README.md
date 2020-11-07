
# Express Admin Platform

## Installing

typescript的位置： ./node_modules/.bin/tsc --init

安装依赖

```bash
npm install
```

###windows安装openssl
访问 https://slproweb.com/products/Win32OpenSSL.html

下载Win64 OpenSSL安装后，打开 环境变量 -> 系统变量

在 Path 中加入安装路径 C:\Program Files\OpenSSL-Win64\bin

### 生成密钥和公钥
```
cd /key
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
```