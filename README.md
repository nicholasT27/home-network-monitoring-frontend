# Home Network Monitor: Dashboard (frontend)

![Dashboard](docs/images/08-new-unknown-device.png)

The web dashboard of the Home Network Device Monitoring and Alert System. You sign in, see which devices are on your home network, mark the ones you recognise as **Trusted**, and get alerts when an **Unknown** device appears. The part that scans the network is in the [backend repository](https://github.com/nicholasT27/home-network-monitoring-backend).

**Just want to use it?** Open the live dashboard: https://home-network-monitoring-frontend.pages.dev, then follow the **Steps for a new user** in the [backend README](https://github.com/nicholasT27/home-network-monitoring-backend#steps-for-a-new-user).

## Run the dashboard on your computer

You need [Node.js](https://nodejs.org) 20.19+ or 22 (check with `node -v`) and the backend running (see "Try it on one computer" in the backend README).

**1. Download this project.** Click the green **Code** button, then **Download ZIP**, and unzip it.

**2. Install and start it.** Open a terminal in the unzipped folder:

```bash
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev
```

**3. Open http://localhost:5173**, click **Create an account**, then **Scan now**.

| Sign in | Create an account |
|---|---|
| ![Sign in](docs/images/01-sign-in.png) | ![Create an account](docs/images/02-create-account.png) |

## What you see

| Network and alerts | Home agent | Active alerts |
|---|---|---|
| ![Network and alerts](docs/images/03-network-and-email.png) | ![Home agent](docs/images/05-home-agent-panel.png) | ![Active alerts](docs/images/09-active-alerts.png) |

- **Scan now** (top right) starts a scan; the banner shows when it is finished.
- The five tiles count devices, online, trusted, unknown and suspicious.
- In the device list, **Trust** marks a device as known; the pencil renames it, the clock shows its history, the bin removes it.
- **Network & alerts** sets the network range and the email address for alerts.

![Scan finished](docs/images/07-scan-finished.png)

---

# For developers

### Build

```bash
npm run build               # writes the static site to dist/
npm run preview             # serves dist/ on http://localhost:4173 to check it
```

### Deploy on Cloudflare Pages

Cloudflare Pages hosts the static dashboard for free. (It cannot run the PHP backend; that goes on a PHP host, see the backend repository.)

1. Sign in at https://dash.cloudflare.com and open **Workers & Pages** → **Create** → **Pages** → **Connect to Git** (menu names change from time to time).
2. Choose this repository (`home-network-monitoring-frontend`) and the `main` branch.
3. Build settings:

   | Setting | Value |
   |---|---|
   | Framework preset | Vite (or None) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave empty)* |

4. Under **Environment variables** (Production) add:
   - `VITE_API_BASE_URL` = the address of your backend, **with `https://` and no trailing slash**, for example `https://your-backend.example.com` or `https://your-site.example.com/api`. This is the folder that contains the backend's `index.php`.
   - (`NODE_VERSION` = `22` is already set by the `.node-version` file; add it as a variable only if the build complains about the Node version.)
5. Click **Save and Deploy**. Cloudflare gives you an address such as `https://home-network-monitoring-frontend.pages.dev`.
6. **Allow that address in the backend.** In the backend's `.env` add `ALLOWED_ORIGINS=https://home-network-monitoring-frontend.pages.dev` (your real Pages address), then reload the backend. Without this the browser blocks the dashboard's requests (a CORS error).
7. Open the Pages address, create an account, and follow the **Home agent** panel.

Every push to `main` redeploys the dashboard automatically. If you change `VITE_API_BASE_URL`, redeploy (the value is read when the site is built). To change the backend address without rebuilding, edit `public/config.js` instead (see the comments in that file).

#### Using Cloudflare with a backend that is not on HTTPS

The dashboard is served over HTTPS, so browsers refuse to call a backend over plain `http://` (mixed content). Give the backend an `https://` address (most hosts offer a free certificate).

### Troubleshooting

| What you see | Cause and fix |
|---|---|
| "Cannot reach the monitoring server" | `VITE_API_BASE_URL` is wrong or empty (check it in Pages → Settings → Environment variables, then redeploy), or the backend is down. |
| Browser console shows a CORS error | The dashboard's address is missing from `ALLOWED_ORIGINS` in the backend's `.env` (it must match exactly, e.g. `https://name.pages.dev`, no trailing slash). |
| Request blocked as "mixed content" | The backend address starts with `http://`. Use `https://`. |
| The API answers with an HTML page instead of JSON | The host is putting a security page in front of the API (some free hosts do this). Open the API address in a browser and see the backend README, section "Choosing a host". |
| Build fails on Cloudflare | Check the build log; make sure the build command is `npm run build` and the output directory is `dist`. |

### Project layout

```
index.html  vite.config.js  package.json  .node-version  .env.example
public/config.js            optional override of the backend address (no rebuild needed)
docs/images/               screenshots used in this README
src/
  main.jsx  App.jsx         app shell: sign-in gate, polling, scan button
  api.js                    all calls to the backend, token handling
  format.js                 time and network-address helpers
  styles.css
  components/               Login, DeviceList, AlertsPanel, ActivityPanel,
                            SettingsPanel, AgentPanel, Tile, Note
```

Part of the CSN project "Home Network Device Monitoring and Alert System" (Wawasan Open University).
