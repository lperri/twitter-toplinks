// Following: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-home_timeline
// https://api.twitter.com/1.1/statuses/home_timeline.json

// This endpoint requires user context, not just bearer token:
//          Bearer Token used on endpoint which doesn't support
//            application-only auth
//          Requesting an endpoint which requires a user context
//            (such as statuses/home_timeline) with a Bearer Token will produce:
//             HTTP/1.1 403 Forbidden
//            {"errors":[{"message":"Your credentials do not allow access to this resource","code":220}]}

const needle = require("needle");
const keys = require("../config/keys");
const token = keys.TWITTER_BEARER_TOKEN;

const getHomeFeed = async () => {
  const url = "https://api.twitter.com/1.1/statuses/home_timeline.json";

  let tweets = [];
  let params = {
    include_entities: true,
  };

  const options = {
    headers: {
      Authorization:
        'OAuth oauth_consumer_key="lMIH3CgDsYhWsRUCTxBb2GaCT",oauth_token="1347388146275684352-Nucnbbq2gURfZxgNI117nynlS1d8Xg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1612758038",oauth_nonce="2G0lTM3p0f1",oauth_version="1.0",oauth_signature="zN4hT8Nf1%2BEQ2SSqRX3U9gCL2KA%3D"',
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving tweets from this user's timeline...");
  while (hasNextPage) {
    let resp = await getPage(url, params, options, nextToken);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        tweets.push.apply(tweets, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  // console.log(tweets);
  console.log(`Got ${tweets.length} tweets.`);

  return tweets;
};

const getPage = async (url, params, options, nextToken) => {
  if (nextToken) {
    params.next_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(
        `${resp.statusCode} ${resp.statusMessage}:\n${JSON.stringify(
          resp.body
        )}`
      );
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

module.exports = { getHomeFeed, getPage };
