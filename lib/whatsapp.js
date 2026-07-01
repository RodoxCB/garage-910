export function buildWhatsAppUrl(phone, message) {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message || "");
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
