# Home Networking Monitoring System: Dashboard (frontend)

![Dashboard](docs/images/08-new-unknown-device.png)

The web dashboard of the Home Networking Monitoring System. You sign in, see which devices are on your home network, mark the ones you recognise as **Trusted**, and get alerts when an **Unknown** device appears. The part that scans the network is in the [backend repository](https://github.com/nicholasT27/home-network-monitoring-backend).

## Open the dashboard

Nothing to install or set up. Just click the link:

### 👉 [https://home-network-monitoring-frontend.pages.dev](https://home-network-monitoring-frontend.pages.dev)

Sign in with the test account:

| | |
|---|---|
| Email | `test@gmail.com` |
| Password | `test12345` |

(Or click **Create an account** to use your own email.)

| Sign in | Create an account |
|---|---|
| ![Sign in](docs/images/01-sign-in.png) | ![Create an account](docs/images/02-create-account.png) |

The dashboard lists the devices on a network, but a web page cannot see inside your home. To scan your own network, run the small home agent: follow the **Steps for a new user** in the [backend README](https://github.com/nicholasT27/home-network-monitoring-backend#steps-for-a-new-user).

## What you see

| Network and alerts | Home agent | Active alerts |
|---|---|---|
| ![Network and alerts](docs/images/03-network-and-email.png) | ![Home agent](docs/images/05-home-agent-panel.png) | ![Active alerts](docs/images/09-active-alerts.png) |

- **Scan now** (top right) starts a scan; the banner shows when it is finished.
- The five tiles count devices, online, trusted, unknown and suspicious.
- In the device list, **Trust** marks a device as known; the pencil renames it, the clock shows its history, the bin removes it.
- **Network & alerts** sets the network range and the email address for alerts.

![Scan finished](docs/images/07-scan-finished.png)
