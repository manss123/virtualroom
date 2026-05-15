# Virtual Room — Nuxt 4 App

## Development Setup

Install dependencies:

```bash
npm install
```

Copy the environment file and fill in your credentials:

```bash
cp .env.example .env
```

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

---

## Environment Variables & Secrets

Public Firebase config keys go in `apphosting.yaml` as `value:` entries.

Sensitive keys (Admin SDK, Service Account) must be stored in **Google Cloud Secret Manager** and referenced in `apphosting.yaml` as `secret:` — never hardcoded. To add or rotate a secret:

```bash
firebase apphosting:secrets:set SECRET_NAME
```

For local development, copy `.env.example` to `.env` and fill in real values. The `.env` file is gitignored and must never be committed.

---

## Build for Production

```bash
npm run build
```

This generates a `.output` folder containing everything needed to run the app.

---

## Self-Hosted Deployment (Client Server)

### Requirements

- Node.js 18 or higher

```bash
node --version   # verify
```

### 1. Upload the `.output` folder to the server

```
/var/www/myapp/
  └── .output/
        ├── server/
        ├── public/
        └── nitro.json
```

### 2. Create a `.env` file next to `.output`

Fill in every key from `.env.example` with real values:

```
/var/www/myapp/
  ├── .output/
  └── .env
```

### 3. Run the server

```bash
node .output/server/index.mjs
```

Default port is **3000**. To change it:

```bash
PORT=8080 node .output/server/index.mjs
```

---

## Production Process Manager (Recommended)

Use PM2 to keep the server running after terminal closes and auto-restart on reboot:

```bash
npm install -g pm2

pm2 start .output/server/index.mjs --name "virtualroom"
pm2 save
pm2 startup
```

---

## Nginx Reverse Proxy (Optional)

If the server uses Nginx to serve on port 80/443:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

Reload Nginx after saving:

```bash
sudo nginx -t && sudo systemctl reload nginx
```
