const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    const token = 'AQUPpvEHfqb9Scg6TpPRgfEoqmeeuqLqCr5hUvxNYWV8ra9KpPJQrSvjHf0cUY7VPAdT3LOzIB2_bJDwB6t56p7EQVb2kkL73c4WmGTAEH7lcBTknnOm9qCa_IwpNaHFwF38KbVgq-M6dK5os7EMxm6rKv9bfjlZyLO-J2L3fvQ0dFFtbN2HQpOc6zYpx2FZQA1AyAj7NmwlG1o3_c7OwaM0WPKJj4g4pk9vgwJuYdwMuSkLb-FZ1DQPx2JZ2u-mHWAuBaHVmmYSJzwJwsaPE31Xn2KLWwr1_9oSCZeKaU1XNf69rr4xm8O1w9iTl8tfnYCLOgXp2yvSKP0ug9SpDQCm1AwhLw';
    
    app.use(
        '/v2/adCreativesV2?q=search&search.campaign.values[0]=urn:li:sponsoredCampaign:193773413&search.status.values[0]=ACTIVE&search.status.values[1]=CANCELED&sort.field=ID&sort.order=DESCENDING',
        createProxyMiddleware(
        {
        target : "htpp://localhost:3000",
        secure : false,
        Headers : {
            accept: "application/json",
            method: "GET",
            Authorization : `Bearer ${token}`
        },
        changeOrigin : true
    }));
}