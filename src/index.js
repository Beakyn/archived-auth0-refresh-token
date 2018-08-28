const query = require('micro-query');
const cors = require('micro-cors')();
const {send} = require('micro');
const axios = require('axios');

const getRefreshToken = async ({domain, grant_type, client_id, code, redirect_uri}) =>
  axios.post(`https://${domain}/oauth/token`, {
    grant_type,
    client_id,
    code,
    redirect_uri,
  })

const handler = async (req, res) => {
  const q = query(req);

  try {
    if (req.method === 'GET') {
      const data = await getRefreshToken(q)

      return send(res, 200, data);
    }

    return send(res, 405, 'Invalid Method');
  } catch (error) {
    const errorResp = error.response;

    console.error('ERROR:', error.response);

    return send(res, errorResp.status, {...errorResp.data});
  }
}

module.exports = cors(handler)