const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const hasGoogleAnalytics = () => Boolean(GA_MEASUREMENT_ID);

export const initializeGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID || typeof document === "undefined") {
    return;
  }

  if (window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag = function gtag() {
    window.dataLayer?.push(arguments as unknown as unknown[]);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
};

export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
