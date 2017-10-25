function login(){
    FB.login(function(res){
        $('#loginBtn').hide();
        $('#logoutBtn').show();
    });
}
function logout(){
    FB.logout(function(res){
        $('#loginBtn').show();
        $('#logoutBtn').hide();
    });
}

var fanpages;
var pageination;

function check(){
    FB.api(
        '/search',
        'GET',
        {"q":"happy birthday","type":"page","limit":"50","fields":"category,name,picture{url},fan_count,link,description"},
        function(response) {
            var html="";
            var fanpages=response.data;
            console.log(response)
            for(i=0;i<fanpages.length;i++){
                
               html+= '<li>'+
                        '<div class="row">'+
                            '<div class="col-lg-5 col-sm-4 col-md-5 text-center mb-4">'+
                                '<img class="rounded-circle img-fluid d-block mx-auto" src="'+fanpages[i].picture.data.url+'" alt="">'+
                            '</div>'+
                            '<div class="col-lg-7 col-sm-8 col-md-7 text-center mb-4">'+
                                '<div class="row"><h3>'+fanpages[i].name+'</h3></div>'+
                                '<div class="row"><small>'+fanpages[i].category+'</small></div>'+
                            '</div>'+
                        '</div>'+
                    '</li>'
            }
           $('#fanpages-feed').html(html);

           $('#fanpages-feed li').on('click',function(){
                view_deatils(fanpages[$(this).index()]);
                $('#fanpages-feed li').removeClass("active");
                $(this).addClass("active");
            });
        }
    );
}

function view_deatils(fanpage){
    ///<i class="glyphicon glyphicon-info-sign"></i>Page Information
    $('#panel-heading').html('<img class="rounded-circle img-fluid d-block mx-auto" src="'+fanpage.picture.data.url+'" alt="" style="width: 18px; border-radius: 50%;margin-right: 10px;"><font color="red">'+fanpage.name+'</font>  Information');
    $('#fanpage-url').html(fanpage.link);
    $('#fans').html(fanpage.fan_count);
    $('#fansByfour').html( Math.round(fanpage.fan_count/4));
    $('#description').html(fanpage.description);
}

function previous(){
    if(pageination.previous){
        FB.api(
            pageination.previous,
            'GET',
            function(response) {
               if(!response.error){
                    fanpages=response.data;
                    pageination=response.paging;
                    view_page_list(); 
               }else{
                   console.log(response);
               }
            }
        );
    }
    
}
function next(){
    
    if(pageination.next){
        FB.api(
            pageination.next,
            'GET',
            function(response) {
               if(!response.error){
                fanpages=response.data;
                pageination=response.paging;
                view_page_list(); 
               }else{
                   console.log(response);
               }
            }
        );
    }
    
}
function search(){
    var keyword=$('#keyword').val();
    if(keyword){
        FB.api(
            '/search',
            'GET',
            {"q":keyword,"type":"page","limit":"20","fields":"category,name,picture{url},fan_count,link,description"},
            function(response) {
                console.log(response)
               if(!response.error){
                fanpages=response.data;
                pageination=response.paging;
                view_page_list(); 
               }else{
                   console.log(response);
               }
            }
        );
    }
}

function view_page_list(){
    var html="";
    for(i=0;i<fanpages.length;i++){
        
       html+= '<li>'+
                '<div class="row">'+
                    '<div class="col-lg-5 col-sm-4 col-md-5 text-center mb-4">'+
                        '<img class="rounded-circle img-fluid d-block mx-auto" src="'+fanpages[i].picture.data.url+'" alt="">'+
                    '</div>'+
                    '<div class="col-lg-7 col-sm-8 col-md-7 text-center mb-4">'+
                        '<div class="row"><h3>'+fanpages[i].name+'</h3></div>'+
                        '<div class="row"><small>'+fanpages[i].category+'</small></div>'+
                    '</div>'+
                '</div>'+
            '</li>'
    }
   $('#fanpages-feed').html(html);

   $('#fanpages-feed li').on('click',function(){
        view_deatils(fanpages[$(this).index()]);
        $('#fanpages-feed li').removeClass("active");
        $(this).addClass("active");
    });
}