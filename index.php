<html>
    <head>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <link rel="stylesheet" href="assert/css/style.css" />
        <link href="assert/css/bootstrap.min.css" rel="stylesheet" />
        <script src="assert/js/bootstrap.min.js"></script>
        <script src="assert/js/fanpages.js"></script>
        <title>Face Book Fan Page list</title>
    </head>
    <body>
    <script>
        window.fbAsyncInit = function() {
            FB.init({
            appId            : '137992170278555',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
            });
            FB.AppEvents.logPageView();
            FB.getLoginStatus(function(response){
                if(response.status ==="connected"){
                    $('#loginBtn').hide();
                    $('#logoutBtn').show();
                }else if(response.status===""){
                    $('#loginBtn').show();
                    $('#logoutBtn').hide();
                }else{
                    $('#loginBtn').show();
                    $('#logoutBtn').hide();
                }
            });
        };
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
</script>

<section class="flw inner-page dashboard-container">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-10 col-xs-10 db-menu"> 
                <ul>
                    <li><button style="width:100%;" id="loginBtn" onclick="login()">Login</button><button id="logoutBtn" style="width:100%;" onclick="logout()">Log Out</button></li>
                </ul>                             	
                <ul id="fanpages-feed">
                    <li></li>                                               
                </ul>
            </div>
            <div class="col-lg-8 col-md-7 col-sm-10 col-xs-10 page-detail-container">
                <div class="row" style="height: 40px;">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <ul class="pager">
                            <li><a href="javascript:previous()">Previous</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search" name="search" id="keyword" onchange="search()">
                        <div class="input-group-btn">
                            <button class="btn btn-default" onclick="search()"><i class="glyphicon glyphicon-search"></i></button>
                        </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <ul class="pager">
                            <li><a href="javascript:next()">Next</a></li>
                        </ul>
                    </div>
                </div>
                <!-- right side -->
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-1 col-md-1 "></div>
                            <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12">
                                <div class="panel panel-default">
                                    <div class="panel-heading" id="panel-heading"><i class="glyphicon glyphicon-info-sign"></i>Page Information</div>
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item list-group-item-action">
                                            <div class="media-body">
                                                <div class="row">
                                                    <div class="col-lg-6"><strong>Fanpage url</strong></div>
                                                    <div class="col-lg-6" id="fanpage-url">Fanpage url</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item list-group-item-action">
                                            <div class="media-body">
                                                <div class="row">
                                                    <div class="col-lg-6"><strong>Number of fans </strong></div>
                                                    <div class="col-lg-6" id="fans">Number of fans</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item list-group-item-action">
                                            <div class="media-body">
                                                <div class="row">
                                                    <div class="col-lg-6"><strong>Number of fans divided by 4 </strong></div>
                                                    <div class="col-lg-6" id="fansByfour">Number of fans divided by 4</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item list-group-item-action">
                                            <div class="media-body">
                                                <div class="row">
                                                    <div class="col-lg-6"><strong>Description</strong></div>
                                                    <div class="col-lg-6" id="description">Description</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</section>
            
</body>
</html>
