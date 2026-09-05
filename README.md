# VitaNova Clinic — Offline-First Healthcare PWA (Uganda)

VitaNova Clinic is a production-grade, local-first Progressive Web App (PWA) engineered for Uganda's healthcare ecosystem. The application operates seamlessly on smartphones (Android / iPhone), tablets, and desktop computers across fluctuating network conditions, intermittent connectivity, or zero mobile data.

## Getting Started

### Development
```bash
# Start both client and server concurrently
npm run dev
```
- **Client (PWA)**: [http://localhost:5173/](http://localhost:5173/)
- **Backend Sync API**: [http://localhost:3001/](http://localhost:3001/)

### Production Build
```bash
npm run build
```

## Architecture Highlights
- **Local-First Database**: Powered by `Dexie.js` (IndexedDB) for zero-latency local storage.
- **Sync Engine**: Bidirectional synchronization with append-oriented clinical conflict handling.
- **PWA Service Worker**: Pre-caches app shell while strictly preserving medical privacy.
- **Uganda Healthcare Integrations**:
  - MTN Mobile Money and Airtel Money payment abstraction
  - WhatsApp Cloud API & SMS reminder engine
  - Uganda 999 / 112 emergency calling and rapid ambulance dispatch
  - Community Health Worker (CHW) and nurse bedside home-visit documentation
- **Low-Bandwidth Mode**: Optimized for slow 2G/3G connections and battery saving.
- **Offline Simulator**: Header toggle to test offline behavior on demand.
