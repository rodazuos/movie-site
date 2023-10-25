import getConfig from "next/config";

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const token = req.cookies.token;

  let url = "";
  let data = {};
  if (req.method === "POST") {
    data = { vote: req.body.vote };
    url = `${movieApiBaseUrl}/v1/movie/${req.body.id}/vote`;
  } else {
    return res.status(500).json({});
  }

  const response = await fetch(url, {
    method: req.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  res.status(response.status).json({});
}
