import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.1.66:5602";

/**
 * POST /api/auth/me/avatar
 * Streams the raw multipart body directly to the backend to avoid
 * Next.js rewrite proxy corrupting the multipart boundary.
 */
export async function POST(req: NextRequest) {
  const forwardHeaders = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") return;
    forwardHeaders.set(key, value);
  });

  const backendRes = await fetch(`${BACKEND_URL}/api/auth/me/avatar`, {
    method: "POST",
    headers: forwardHeaders,
    body: req.body,
    // @ts-expect-error – required for Node 18+ streaming
    duplex: "half",
  });

  const body = await backendRes.text();
  return new NextResponse(body, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") ?? "application/json",
    },
  });
}
