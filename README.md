# 🚀 DriveConnect

**DriveConnect** is a application that **seamlessly unifies multiple Google Drive accounts**, giving users a single, coherent storage experience. Our app allows you to connect multiple drive accounts and use all of your drive account storage via our app. This also helps to reduce a phenomena called as **fragmentation of memory** which occurs due to partial usage of drive resulting into restricted storage in spite of having the total required space


![drive connect logo](./public/Graphic.png)

---

## 🌟 Key Features

- **Multi‑account aggregation**: Link and combine multiple Google Drive accounts under one unified interface.
- **Efficient file Storage**: Chunks file based on it size and uploads chunks to your drive account allowing for pause/resume and removing fragmentation problems.
- **OAuth 2.0 authentication**: Secure user authentication with token management and refresh capabilities.
- **Real‑time sync**: Optionally monitor Drives for changes to keep the aggregated state fresh.
- **RESTful API**: A clean, scalable HTTP API for integrations and web/app frontends.
- **MongoDB powered**: Flexible document‑oriented backend for drive metadata and user data.
- **Security**: We break your files into small units called as **chunks and store them in your own drives so your data remains with with you. 
And in fact even Google can't access this data inside your drive as this data is only available to our app.The app allows you to have multiple drive account storage while having the abstraction of using a single one.

---


## ⚙️ Architecture Overview

```text
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Frontend   │◄──────│  DriveConnect│─────▶│  Google API  │
│ (web/mobile) │  HTTP │    Backend   │  API  │   (Drive)    │
└──────────────┘       └──────┬───────┘       └──────────────┘
                             │
                             ▼
                        ┌─────────┐
                        │ MongoDB │
                        └─────────┘
```

- **Backend (TypeScript)**: Handles OAuth flows, token storage, file listing, metadata indexing, and API endpoints.
- **MongoDB**: Stores user profiles, linked account info, and aggregated drive metadata.
- **Google Drive API**: Used to list files, fetch metadata, and perform operations across drives.


## 🛡️ Security & Auth

- **OAuth 2.0**: Secure user authentication with Google — tokens are stored encrypted.
- **Token Refresh**: Automatically refreshes expired tokens behind the scenes.
- **Scoped Access**: Access is limited to Drive scopes, with granular permissions only where needed.

---

## 🚀 Use Cases

- **Personal**: Allows to have multiple drives and single point of access to have virtually unlimited Storage.

---

**DriveConnect** simplifies multi‑Drive management. If you've ever juggled multiple Google accounts to find a file—this is your one‑stop solution. Enjoy! 😊

