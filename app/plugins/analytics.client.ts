// Cloudflare Web Analytics. Skips local dev and the /iptv pages.
const TOKEN = "76434a38bb27489eb58f08bb266cf7a4";

export default defineNuxtPlugin(() => {
  if (import.meta.dev || location.pathname.startsWith("/iptv")) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.dataset.cfBeacon = JSON.stringify({ token: TOKEN, spa: true });
  document.head.append(script);
});
