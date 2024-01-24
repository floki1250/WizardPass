import { app, BrowserWindow } from "electron";

import * as path from "path";
// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.ROOT, "dist-electron");
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, "public")
  : path.join(process.env.ROOT, ".output/public");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow;

function bootstrap() {
  win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 720,
    webPreferences: {
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
    icon: "./assets/icon.png",
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, "index.html"));
  }
}

app.whenReady().then(bootstrap);
