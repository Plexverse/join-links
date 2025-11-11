
<img width="4096" height="843" alt="Github Repository Header" src="https://github.com/user-attachments/assets/bd603ca6-d4a4-48d3-8d43-6986dd9b92cd" />

A Cloudflare Pages service that redirects users to Lunar Client or Minecraft Bedrock with server addresses.

## How it works

When a user visits `join.plexverse.net/server?id=12345`, the service:
1. Attempts to open `lunarclient://play?serverAddress=server-12345.plexverse.net`
2. If Lunar Client is not installed, automatically redirects to the [Lunar Client download page](https://www.lunarclient.com/download)

For Bedrock servers, it uses the `minecraft://connect` protocol instead.

## Setup on Cloudflare Pages

1. Connect this repository to Cloudflare Pages
2. Set the build command to: (leave empty or use a simple command)
3. Set the build output directory to: `/` (root)
4. Configure your custom domain `join.plexverse.net` in Cloudflare Pages settings
5. Deploy!

## Usage

### Production Servers (Java/Lunar Client)
Visit: `https://join.plexverse.net/server?id=12345`

This will attempt to open Lunar Client with the server address: `server-12345.plexverse.net`

### Dev Servers (Java/Lunar Client)
Visit: `https://join.plexverse.net/server?id=3k7d2ia1&dev`

This will attempt to open Lunar Client with the dev server address: `3k7d2ia1.dev.mineplex.com` on port `25564`

### Bedrock Servers (Production)
Visit: `https://join.plexverse.net/server?id=12345&bedrock`

This will attempt to open Minecraft Bedrock with: `minecraft://connect?serverUrl=server-12345.plexverse.net&serverPort=19132`

### Bedrock Servers (Dev)
Visit: `https://join.plexverse.net/server?id=3k7d2ia1&dev&bedrock`

This will attempt to open Minecraft Bedrock with: `minecraft://connect?serverUrl=3k7d2ia1.dev.mineplex.com&serverPort=19131`

## Files

- `functions/server.js` - Cloudflare Pages Function that handles `/server` route
- `index.html` - Fallback page (handles root route)
