const app = require('express')();
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const port = process.env.PORT || 5300;

const anghamiAPIsEndpoint = 'https://api.anghami.com';

app.use(cors({
	credentials: true,
}));

app.use('/', proxy({
	target: anghamiAPIsEndpoint,
	changeOrigin: true,
	onProxyReq: (proxyReq, req, res) => {
		req.originalHost = req.headers.host
		proxyReq.setHeader('origin', 'https://widget.anghami.com');
		proxyReq.setHeader('referer', 'https://widget.anghami.com');
		proxyReq.setHeader('cookie', 'sss=ns55495274_fc2daa7ffa0d46af8574d4b1834f5bc4;'); // fake account
	},
	onProxyRes: (proxyRes, req) => {
		proxyRes.headers['Access-Control-Allow-Origin'] = req.originalHost;
	}
}));

app.listen(port, () => console.log('the proxy server is running at port => ' + port));
