function guest(req, res, next){
	if(!req.session.user_mail){
		return res.redirect('/login');
	}
	next();
}

function check(req, res, next){
	if(req.session.user_mail){
		return res.redirect('/admin/dashboard');
	}
	next();
}

module.exports = {
	guest:guest,
	check:check
}