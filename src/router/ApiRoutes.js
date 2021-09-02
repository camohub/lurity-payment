let API_URL_SHORT = 'http://localhost:8000';
let API_URL = API_URL_SHORT + '/';


export default {

    API_URL_SHORT: API_URL_SHORT,

    API_URL: API_URL,

    PAYMENT_CAMPAIGN_URL: 'https://portal.lurity.com/api/v1/campaigns/7028f519b6a9fd42',

    PAYMENT_CHECKOUT_URL: API_URL + 'api/lurity-checkout',

    PAYMENT_TRANSACTION_URL: API_URL + 'api/lurity-transaction/',

    PAYMENT_CLIENT_TOKEN_URL: API_URL + 'api/lurity-gateway-client-token',
}
