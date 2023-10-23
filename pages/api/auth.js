import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const response = await fetch(`${movieApiBaseUrl}/login`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  if (response.status === 200) {
    const result = await response.json();
    return res.status(response.status).json(result);
  }
  res.status(response.status).json({});
}
