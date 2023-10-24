import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const token = req.cookies.token;
  const data = req.body;
  
  const response = await fetch(`${movieApiBaseUrl}/v1/user/${data.id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  res.status(response.status).json(result);
}