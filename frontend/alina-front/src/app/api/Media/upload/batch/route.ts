import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.1.66:5602";

/**
 * POST /api/Media/upload/batch
 *
 * Proxies multipart/form-data with multiple files directly to the backend
 * batch upload endpoint, bypassing Next.js body-parsing middleware.
 */
export async function POST(req: NextRequest) {
  const forwardHeaders = new Headers();
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === "host") return;
    forwardHeaders.set(key, value);
  });

  // Forward optional query params: gigId, taskId, customOfferId
  const incomingUrl = new URL(req.url);
  const backendUrl = `${BACKEND_URL}/api/Media/upload/batch${incomingUrl.search}`;

  const backendRes = await fetch(backendUrl, {
    method: "POST",
    headers: forwardHeaders,
    body: req.body,
    // @ts-expect-error – Node 18+ requires this to disable auto body-consumption
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
