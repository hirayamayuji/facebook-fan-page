
var myService = angular.module('myService', ['ngCookies']);

app.factory("User", ['$http', '$location', '$q', function($http, $location, $q) {
	
	var user = {};
	
	user.getPersonDetail = function() {
			
			return	$http.get("/dashboard").then(function(resJson) {
				
				if (!resJson.data.status){
					return $q.reject();
				}else{
					return resJson.data;
				}
			}).catch(function(err) {
				
				return $q.reject(err);
				
			});
		return true;
	};
	
	user.accountsByUser = function(data) {
		
		return	$http.post("/accountsByUser",{},{params:data}).then(function(resJson) {
			
			if (!resJson.data.status){
				return $q.reject();
			}else{
				return resJson.data;
			}
		}).catch(function(err) {
			
			return $q.reject(err);
			
		});
	return true;
	};

	user.checHaskOwnersList = function(data){
		return $http.post('/checHaskOwnersList',{},{params:data}).then(function(resJson){
			if(!resJson.data.status){
				return $q.reject();
			}else{
				return resJson.data;
			}
		}).catch(function(err){
			return $q.reject(err);
		})
	}
	user.getjqxDropDownListed = function(data){
		return $http.post("/getjqxDropDownListed",{},{params:data}).then(function(resJson){
			return resJson.data;
		}).catch(function(err){
			return $q.reject();
		});
	}
	user.getUsers=function(){
		return $http.get("/getUsers").then(function(resJson){
			return resJson.data;
		}).catch(function(err){
			return $q.reject();
		})
	}
	user.userSearchUserOnly = function(data){
		return $http.post("/userSearchUserOnly",
				{}, //added blank object as request body
				{params:data}
			).then(function(resJson){
			return resJson.data;
		}).catch(function(err){
			return $q.reject();
		});
	}
	user.searchOwenerSelected = function(data){
		return $http.post("/searchOwenerSelected",
						{},
						{params:data}
		).then(function(resJson){
			return resJson.data;
		}).catch(function(err){
			return $q.reject;
		})
	}
	user.checkUser = function(data){
		return $http.post("/checkUser",{},{params:data}).then(function(resJson){
			if(resJson.status){
				return resJson.data;
			}else{
				return $q.reject;
			}
		})
	}
	return user;
}]);