import Script from "next/script";

/**
 * Smartlook session recording. The vendor's inline snippet, loaded via
 * next/script (afterInteractive) so it runs client-side once the page is
 * interactive. Region: eu.
 */
export function Smartlook() {
  return (
    <Script id="smartlook" strategy="afterInteractive">
      {`window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
    smartlook('init', '75361479432312a449390dee3f6899b5013fdefe', { region: 'eu' });`}
    </Script>
  );
}
