const app = require('express')();
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const port = process.env.PORT || 5300;

const anghamiAPIsEndpoint = 'https://api.anghami.com';

app.use(cors());

app.use('/', proxy({
    target: anghamiAPIsEndpoint,
    changeOrigin: true,
	onProxyReq: (proxyReq, req, res) => {
		proxyReq.setHeader('origin', 'https://widget.anghami.com');
	},
	onProxyRes: (proxyRes) => {
		proxyRes.headers['Access-Control-Allow-Origin'] = '*';
	}
}));

app.listen(port, () => console.log('the proxy server is running at port => ' + port));
