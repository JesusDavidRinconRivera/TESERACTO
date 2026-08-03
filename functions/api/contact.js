/**
 * Cloudflare Pages Function — Formulario de contacto TESERACTO
 * Recibe POST de /api/contact y envía email vía Resend API
 *
 * Requiere variable de entorno RESEND_API_KEY en Cloudflare Pages
 */

/**
 * Escapa caracteres peligrosos para prevenir XSS al interpolar input
 * del usuario en HTML (correo electrónico).
 * Convierte: & < > " ' en sus entidades HTML seguras.
 * @param {string} str - Texto a escapar
 * @returns {string} Texto seguro para HTML
 */
function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await context.request.formData();

    const nombre   = (formData.get('nombre')   || '').trim();
    const empresa  = (formData.get('empresa')  || '').trim();
    const telefono = (formData.get('telefono') || '').trim();
    const correo   = (formData.get('correo')   || '').trim();
    const mensaje  = (formData.get('mensaje')  || '').trim();

    if (!nombre || !empresa || !telefono || !correo || !mensaje) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Todos los campos son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'El correo no es válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const resendKey = context.env.RESEND_API_KEY;
    if (!resendKey) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Falta configurar el servicio de correo.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const htmlBody = `
      <h2>Nueva solicitud de cotización</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd;">Nombre</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(nombre)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd;">Empresa</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(empresa)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd;">Teléfono</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(telefono)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd;">Correo</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(correo)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border:1px solid #ddd;">Mensaje</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(mensaje)}</td></tr>
      </table>
      <p style="margin-top:16px;color:#888;font-size:12px;">Enviado desde el formulario de teseracto.tech</p>
    `;

    const textBody = `Nueva solicitud de cotización\n\nNombre: ${nombre}\nEmpresa: ${empresa}\nTeléfono: ${telefono}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TESERACTO <noreply@teseracto.tech>',
        to: ['contacto@teseracto.tech'],
        reply_to: correo,
        subject: `Nueva solicitud de cotización — ${empresa}`,
        html: htmlBody,
        text: textBody,
      }),
    });

    if (!emailResponse.ok) {
      const err = await emailResponse.text();
      console.error('[TESERACTO] Resend error:', emailResponse.status, err);
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'No se pudo enviar el correo. Intenta de nuevo o llámanos.',
          resendStatus: emailResponse.status,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (err) {
    console.error('[TESERACTO] Error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Error interno. Intenta de nuevo o llámanos.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
