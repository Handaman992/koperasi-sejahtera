
const json = (data, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test") {
      try {
        await env.DB.prepare(
          "SELECT coop_id FROM cooperative_state LIMIT 1"
        ).all();

        return json({
          success: true,
          message: "Cloudflare D1 terhubung"
        });
      } catch (error) {
        return json({
          success: false,
          message: "Database D1 gagal diakses"
        }, 500);
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return json({
        success: false,
        message: "API login belum dikonfigurasi"
      }, 501);
    }

    return env.ASSETS.fetch(request);
  }
};
