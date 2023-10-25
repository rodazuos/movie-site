import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const token = req.cookies.token;
  const data = req.body;

  let url = null
  if (req.method === 'PUT') {
    url = `${movieApiBaseUrl}/v1/movie/${data.id}`;
  } else if (req.method === 'POST') {
    url = `${movieApiBaseUrl}/v1/movie`;
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    url = `${movieApiBaseUrl}/v1/movie/${id}`;
  } else {
    return res.status(500).json({});
  }
    
  const response = await fetch(url, {
    method: req.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if(response.status === 200 && req.method !== 'DELETE') {
    const result = await response.json();
    return res.status(response.status).json(result);
  }

  return res.status(response.status).json({});
}