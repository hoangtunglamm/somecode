module.exports = function(express, app, body_parser, session){

	// Config cho Session
	app.set('trust proxy', 1) // trust first proxy
	app.use(session({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: false }
	}));
	
	app.use('/static', express.static(__dirname + '/../public'));
	
	app.set('views', __dirname+'/views');
	app.set('view engine', 'ejs');
	
	// Sử dụng Body-Parser với dữ liệu được truyền từ Form 
	app.use(body_parser.urlencoded({ extended: true }));
	 
	// Sử dụng Body-Parser với dữ liệu dạng Json
	app.use(body_parser.json());
	
	

}