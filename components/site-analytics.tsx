"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Cookieless page-view counts from Vercel Web Analytics. Query strings are
 * dropped before sending, so shared plan links (?ids=...) and searches stay
 * out of the analytics data.
 */
export function SiteAnalytics() {
  return <Analytics beforeSend={(event) => ({ ...event, url: event.url.split("?")[0] })} />;
}
