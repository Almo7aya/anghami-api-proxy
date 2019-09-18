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
		proxyReq.setHeader('origin', 'https://widget.anghami.com');
		proxyReq.setHeader('referer', 'https://widget.anghami.com');
		proxyReq.setHeader('cookie', 'sss=ns56202810_4a550b27a015a5d11a0ea8c86dac5313;'); // fake account
	},
	onProxyRes: (proxyRes, req) => {
		proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
	}
}));

app.listen(port, () => console.log('the proxy server is running at port => ' + port));
