import type { NextApiRequest, NextApiResponse } from "next";
import { shopify } from "@/lib/shopify";

/**
 * One file auth: handles /api/auth (begin) and /api/auth/callback (finish)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const base = process.env.SHOPIFY_APP_URL!;
  const url = new URL(req.url!, base);
  const path = url.pathname;
  const isCallback = path.endsWith("/api/auth/callback");
  try {
    if (!isCallback) {
      const shopParam = (url.searchParams.get("shop") || process.env.SHOPIFY_SHOP)!;
      await (shopify as any).auth.begin({
        shop: shopParam,
        callbackPath: "/api/auth/callback",
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
      });
      return;
    }
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).end();
    }
    const result = await (shopify as any).auth.callback({ rawRequest: req, rawResponse: res });
    await (shopify as any).session.storage.storeSession(result.session);
    return res.redirect(302, "/");
  } catch (e: any) {
    console.error("Auth error:", e);
    return res.status(500).send(e?.message || "Auth error");
  }
}