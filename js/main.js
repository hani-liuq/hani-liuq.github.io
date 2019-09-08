const apiServer = 'http://127.0.0.1:8080'
const root = document.getElementById('mainJS').getAttribute('root');
document.write(`<script type="text/javascript" src="${root}plugins/layui/layui.js"></script>`)
document.write(`<script type="text/javascript" src="${root}js/vue.min.js"></script>`)
document.write(`<script type="text/javascript" src="${root}js/axios.min.js"></script>`)
document.write(`<script type="text/javascript" src="${root}js/http.js"></script>`)


function setIframeHeight(iframe) {
	if (iframe) {
		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if (iframeWin.document.body) {
			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
		}
	}
};