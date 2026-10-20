
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test") {
      try {
        await env.DB.prepare(
          "SELECT coop_id FROM cooperative_state LIMIT 1"
        ).all();

        return Response.json({
          success: true,
          message: "Cloudflare D1 terhubung"
        });
      } catch (error) {
        return Response.json({
          success: false,
          message: error.message
        }, { status: 500 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json(
        { success: false, message: "API belum tersedia" },
        { status: 404 }
      );
    }

    return env.ASSETS.fetch(request);
  }
};
