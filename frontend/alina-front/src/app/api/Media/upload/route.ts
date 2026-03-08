import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.1.66:5602";

/**
 * POST /api/Media/upload
 *
 * Next.js rewrites cannot reliably proxy multipart/form-data because the
 * framework's internal body handling can corrupt the boundary.
 * This Route Handler streams the raw multipart body directly to the backend
 * and returns the response, bypassing any body-parsing middleware.
 */
export async function POST(req: NextRequest) {
  // Forward every header except Host (which must match the backend)
  const forwardHeaders = new Headers();
  req.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === "host") return;            // must NOT forward – backend sets its own
    forwardHeaders.set(key, value);
  });

  const url = new URL(req.url);
  const backendUrl = `${BACKEND_URL}/api/Media/upload${url.search}`;

  const backendRes = await fetch(backendUrl, {
    method: "POST",
    headers: forwardHeaders,
    body: req.body,               // raw stream – no parsing, no buffering
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
