import { NextResponse, type NextRequest } from "next/server";

// Legacy URLs that differ from the new ones only by letter case. Compared exactly, so the
// lowercase destination never matches and can't loop.
const CASE_REDIRECTS: Record<string, string> = {
  "/FAQ": "/faq",
  "/Privacy-Policy": "/privacy-policy",
};

export function middleware(req: NextRequest) {
  const target = CASE_REDIRECTS[req.nextUrl.pathname];
  if (!target) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ["/FAQ", "/Privacy-Policy"] };
