// Fetch the users being followed by a specific account, by ID
// https://developer.twitter.com/en/docs/twitter-api/users/follows/quick-start
const needle = require("needle");
const keys = require("../config/keys");
const token = keys.TWITTER_BEARER_TOKEN;

const getFollowing = async (userID) => {
  const url = `https://api.twitter.com/2/users/${userID}/following`;

  let users = [];
  let params = {
    max_results: 1000,
    "user.fields": "created_at",
  };

  const options = {
    headers: {
      "User-Agent": "v2FollowingJS",
      Authorization: `Bearer ${token}`,
    },
  };

  let hasNextPage = true;
  let nextToken = null;
  console.log("Retrieving users this user is following...");
  while (hasNextPage) {
    let resp = await getPage(url, params, options, nextToken);
    if (
      resp &&
      resp.meta &&
      resp.meta.result_count &&
      resp.meta.result_count > 0
    ) {
      if (resp.data) {
        users.push.apply(users, resp.data);
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

  console.log(users);
  console.log(`Got ${users.length} users.`);

  return users;
};

const getPage = async (url, params, options, nextToken) => {
  if (nextToken) {
    params.next_token = nextToken;
  }

  try {
    const resp = await needle("get", url, params, options);

    if (resp.statusCode != 200) {
      console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
      return;
    }
    return resp.body;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

module.exports = { getFollowing, getPage };
