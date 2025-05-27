# 📦 Deploy Next.js App (SSR) dengan aaPanel

Panduan ini menjelaskan cara deploy proyek Next.js yang menggunakan fitur SSR (Server-Side Rendering) ke server menggunakan **aaPanel**.

---

## 🔧 1. Upload Project ke Server

- Upload seluruh source code Next.js ke server, misalnya ke direktori:

- Jangan lupa upload juga file `.env` atau `.env.production`.

---

## 📦 2. Install Dependency & Build Aplikasi

Masuk ke direktori project melalui terminal (SSH):

```bash
cd /www/wwwroot/frontend-hipmi-cms/
npm install
npm run build
npm install -g pm2
pm2 start npm --name hipmi-frontend -- start
