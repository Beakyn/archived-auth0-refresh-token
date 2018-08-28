const query = require('micro-query');
const cors = require('micro-cors')();
const { send } = require('micro');
const axios = require('axios');

const getRefreshToken = async ({
  domain,
  grant_type,
  client_id,
  code,
  redirect_uri
}) =>
  axios.post(`https://${domain}/oauth/token`, {
    grant_type,
    client_id,
    code,
    redirect_uri
  });

const handler = async (req, res) => {
  const q = query(req);

  try {
    if (req.method === 'GET') {
      const { data } = await getRefreshToken(q);
      const {refresh_token, ...rest} = data;
      // TODO: save refresh_token by user uid
      /**
       * const {uid} = decodeJwt(rest.access_token);
       * await updateUserStorage(uid, refresh_token);
       */
      return send(res, 200, rest);
    }

    return send(res, 405, 'Invalid Method');
  } catch (error) {
    const errorResp = error.response;

    console.error('ERROR:', error.response);

    return send(res, errorResp.status, { ...errorResp.data });
  }
};

const updateUserStorage = async (uid, refresh_token) => 
  axios.post(`${'<OTHER_MICRO_SERVICE_ENDPOINT>'}`, {[uid]: refresh_token});


module.exports = cors(handler);
