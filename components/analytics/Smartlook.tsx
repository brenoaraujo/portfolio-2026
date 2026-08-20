import Script from "next/script";

/**
 * Smartlook session recording, region eu. Loaded via next/script
 * (afterInteractive) so it runs client-side once the page is interactive.
 *
 * The vendor snippet is hardened: all references are window-qualified (avoids
 * bare-identifier issues in strict/bundled contexts) and `init` is guarded so
 * it only runs once — re-execution (Fast Refresh, remount) otherwise calls
 * `smartlook('init')` when the global is no longer a plain function, throwing
 * "smartlook is not a function".
 */
export function Smartlook() {
  return (
    <Script
      id="smartlook"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(d){
  if (window.smartlook) return;
  var o = window.smartlook = function(){ o.api.push(arguments) };
  o.api = [];
  var h = d.getElementsByTagName('head')[0];
  var c = d.createElement('script');
  c.async = true; c.type = 'text/javascript'; c.charset = 'utf-8';
  c.src = 'https://web-sdk.smartlook.com/recorder.js';
  h.appendChild(c);
})(document);
if (!window.__smartlookInited) {
  window.__smartlookInited = true;
  window.smartlook('init', '75361479432312a449390dee3f6899b5013fdefe', { region: 'eu' });
}`,
      }}
    />
  );
}
