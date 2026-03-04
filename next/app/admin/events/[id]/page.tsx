export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getEventById } from "@/actions/events";
import EventDetailClient from "./event-detail-client";
import QRCode from "qrcode";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nopeca.com";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const role = (session.user as { role: string }).role;
  if (role === "OPERATOR") redirect("/admin/dashboard");

  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const registrationUrl = `${SITE_URL}/en/events/${event.slug}`;

  // Generate QR code as a PNG data URL server-side
  const qrDataUrl = await QRCode.toDataURL(registrationUrl, {
    width: 512,
    margin: 2,
    color: { dark: "#0a1628", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });

  return (
    <EventDetailClient
      event={JSON.parse(JSON.stringify(event))}
      qrDataUrl={qrDataUrl}
      registrationUrl={registrationUrl}
    />
  );
}
