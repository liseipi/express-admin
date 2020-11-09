### 生成密钥和公钥
```
cd src/config/key/
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
```
