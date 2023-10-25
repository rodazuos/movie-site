import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const token = req.cookies.token;
  const params = new URLSearchParams(req.query);
  
  const response = await fetch(`${movieApiBaseUrl}/v1/movies/list?${params}`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const result = await response.json();

  res.status(response.status).json(result);
}