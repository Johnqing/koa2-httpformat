// 日志格式化
const format = function(ctx, format = `:remote-addr|:url|:req[cookies]|:referrer|:user-agent`){
	const req = ctx.request;
	const res = ctx.response;
	return format
		.replace(':url', req.originalUrl)
		.replace(':method', req.method)
		.replace(':status', res.__statusCode || res.statusCode)
		.replace(':response-time', res.responseTime)
		.replace(':date', new Date().toUTCString())
		.replace(':referrer', req.headers.referer || req.headers.referrer || 'referrer')
		.replace(':http-version', req.httpVersionMajor + '.' + req.httpVersionMinor)
		.replace(':remote-addr', req.headers['x-forwarded-for']||req.headers['x-real-ip'])
		.replace(':user-agent', req.headers['user-agent'] || '')
		.replace(
		':content-length',
		(res._headers && res._headers['content-length']) ||
		(res.__headers && res.__headers['Content-Length']) ||
		'-'
	)
		.replace(/:req\[([^\]]+)\]/g, (_, field) => {
			if(field === 'cookies'){
				let __cookie = req[field];
				return JSON.stringify(__cookie || {});
			}
			return req[field].toLowerCase();
		})
		.replace(/:res\[([^\]]+)\]/g, (_, field) => {
			return res._headers ?
				(res._headers[field.toLowerCase()] || res.__headers[field])
				: (res.__headers && res.__headers[field]);
		});
};
exports.formatLog = format;
