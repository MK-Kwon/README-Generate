const axios = require("axios");
// to use environment variables (https://medium.com/@thejasonfile/using-dotenv-package-to-create-environment-variables-33da4ac4ea8f)
require("dotenv").config();

const api = {
    getUser(username) {
        const queryUrl = "https://api.github.com/graphql";
        // OAuth allows for identity delegation
        // To get an access token you send the Authentication server this bearer token along with your client id.
        // https://stackoverflow.com/questions/25838183/what-is-the-oauth-2-0-bearer-token-exactly/25843058
        const oauth = {Authorization: 'bearer' + process.env.GH_TOKEN};
        return axios.post(
            queryUrl,
            {query: `{user(login: "${username}"){
                email
                avatarUrl
            }
        }`
    },
    {headers: oauth});
}
};

module.exports = api;