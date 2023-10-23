import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const { authorization } = req.headers;
  
  const token = authorization.split('Bearer')[1].trim();

  const response = await fetch(`${movieApiBaseUrl}/verifyToken`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });

  res.status(response.status).json({});
}