import getConfig from 'next/config';

const { movieApiBaseUrl } = getConfig().serverRuntimeConfig;

export default async function handler(req, res) {
  const token = req.cookies.token;
  const data = req.body;

  let url = null
  if (req.method === 'PUT') {
    url = `${movieApiBaseUrl}/v1/user/${data.id}`
  } else {
    url = `${movieApiBaseUrl}/v1/user`
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

  if(response.status === 200) {
    const result = await response.json();
    return res.status(response.status).json(result);
  }

  return res.status(response.status).json({});
}