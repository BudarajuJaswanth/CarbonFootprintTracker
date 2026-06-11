// Core Web Vitals monitoring for Lighthouse
export const reportWebVitals = () => {
  // Largest Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.debug('LCP:', entry);
    }
  });
  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay
  const onFIDCallback = (metric: any) => {
    console.debug('FID:', metric);
  };

  if ('PerformanceEventTiming' in window) {
    const observer2 = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        onFIDCallback(entry);
      }
    });
    try {
      observer2.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // First Input Delay not supported
    }
  }

  // Cumulative Layout Shift
  let clsValue = 0;
  const observer3 = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.debug('CLS:', clsValue);
      }
    }
  });

  try {
    observer3.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // Layout Shift not supported
  }
};

export const trackError = (error: Error, errorInfo: any) => {
  // Send to monitoring service (e.g., Sentry)
  console.error('Error:', error, errorInfo);
};
