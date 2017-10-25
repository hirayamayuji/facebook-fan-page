var myController = angular.module('myController', []);


//home controller
myController.controller("homeCtrl",['$scope', '$location','User',function($scope, $location,User) {	
	
	init = function() {
		
		User.getPersonDetail().then(function(resJson) {
			
			$scope.personDetail=resJson;

		}).catch(function(err) {
			
				console.log(err);
		});;
	};
	
	init();
}]);

//accountsByUser Controller

myController.controller("accountsByUserCtrl",['$scope', '$location','User',function($scope, $location,User) {
	
	$scope.data = []
	$scope.inputedValue="";
	$scope.inputedUserID="";
	$scope.ownersID="allowners";
	$scope.inputedUserName="";
	$scope.errerMsg="";
	$scope.checked=false;
	$scope.inputedUserIDAndUserName = function(){

		if($scope.inputedValue){
			if($scope.inputedValue.search("-")!=-1){
				temp=$scope.inputedValue.split("-");
				$scope.inputedUserID=temp[0].trim();
				$scope.inputedUserName=temp[1].trim();
			}else{
				$scope.inputedUserID=$scope.inputedValue.trim();
				$scope.inputedUserName="";
			}
			var data={'userID':$scope.inputedUserID,'userName':$scope.inputedUserName};
			User.checkUser(data).then(function(resJson){
				if(resJson.data.uidAndName.length){
					temp=resJson.data.uidAndName[0].split(",");
					$scope.inputedUserID=temp[0];
					$scope.inputedUserName=temp[1];
					$scope.checHaskOwnersList();
				}else{
					$scope.createDataTreeTable($scope.data);
					$scope.destroyCheckBox();
					$scope.jqxDropDownDestory();
					$scope.errerMsg="No records found";
				}
			}).catch(function(err){
				console.log(err);
			});
		}
	};

	$scope.createDataTreeTable = function(userData){

		var dataResult=[];
		for(i=0;i<userData.length;i++){
			var temp=[];
			if(!userData[i].isUsed)
			for(j=i+1;j<userData.length;j++){
				if(userData[i].nuid===userData[j].nuid){
					for(l in userData[j]){
						if(userData[i][l]===userData[j][l]){
							userData[j][l]=null;
						}
					}
					temp.push(userData[j]);
					userData[j].isUsed=true;
				}
			}
			if(!userData[i].isUsed){
				
				temp=processTemp(temp);
				
				userData[i].children=temp;

				dataResult.push(userData[i]);
			}
		}

		function processTemp(temp){
			var returnValue=[];
			for(l=0;l<temp.length;l++){
				var paltformTemp=[];
				for(k=l+1;k<temp.length;k++){
					if(temp[l].platform===temp[k].platform){
						temp[k].platform=null;
						paltformTemp.push(temp[k]);
						temp[k].isUsedPlatfrom=true;
					}
				}
				if(!temp[l].isUsedPlatfrom){
					temp[l].children=paltformTemp;
					returnValue.push(temp[l]);
				}
			}
			return returnValue;
		}

		var source = {
			dataType: "json",dataFields: [
				{ name: 'asset_id', type: 'string' },
				{ name: 'asset_name', type: 'string' },
				{ name: 'change_INFO', type: 'string' },
				{ name: 'director_id', type: 'string' },
				{ name: 'director_name', type: 'string' },
				{ name: 'environment', type: 'string' },
				{ name: 'lastupdatedate', type: 'string' },
				{ name: 'managerID', type: 'string' },
				{ name: 'manager_name', type: 'string' },
				{ name: 'nuid', type: 'string' },
				{ name: 'nuidName', type: 'string' },
				{ name: 'operational_risk', type: 'string' },
				{ name: 'owner_id', type: 'string' },
				{ name: 'owner_name', type: 'string' },
				{ name: 'password_data_server', type: 'string' },
				{ name: 'password_expiry_date', type: 'date' },
				{ name: 'password_reset_date', type: 'date' },
				{ name: 'platform', type: 'string' },
				{ name: 'profile_type', type: 'string' },
				{ name: 'rownum', type: 'string' },
				{ name: 'shared_id', type: 'string' },
				{ name: 'shared_members', type: 'string' },
				{ name: 'children', type: 'array' }
			],
			hierarchy:{
				root: 'children'
			},
			id: 'rownum',
			localData: dataResult
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$scope.destroyDataTreeTable();
		$("#treeGrid").jqxTreeGrid(
			{
				width: "100%",
				source: dataAdapter,
				pageable: true,
				pagerMode: 'advanced',
				altRows: true,
				columnsResize: true,
				sortable: true,
				pageSize: 50,
				pageSizeOptions: ['10', '25', '50','100'] ,
				filterable: true,
            	filterMode: 'simple', 
				ready: function(){
					$("#treeGrid").jqxTreeGrid('expandRow', '2');
				},
				columns: [
					{ text: 'NuID', dataField: 'nuid', width: 110},
					{ text: 'NuidName', dataField: 'nuidName', width: 300 },
					{ text: 'Platform', dataField: 'platform', width: 90 },
					{ text: 'Password Data Server', dataField: 'password_data_server', width: 100},
					{ text: 'Password Reset Date', dataField: 'password_reset_date',cellsFormat: 'd',width: 90 },
					{ text: 'Password Expiry Date', dataField: 'password_expiry_date',cellsFormat: 'd', width:90},
					{ text: 'Change INFO', dataField: 'change_INFO', width: 160 },
					{ text: 'Shared Members', dataField: 'shared_members' }
				]
			}
		);
		/*$("#treeGrid-panel").slideDown();*/
		$('#treeGrid').on('rowSelect', function (event){$scope.rowSelected(args.row);});}
	
	
		$scope.destroyDataTreeTable = function(){
		$("#treeGrid").jqxTreeGrid('destroy');
		$("#treeGrid-panel").html("<div id='treeGrid'></div>");
		// $("#treeGrid-panel").slideUp();
	};
	
	$scope.checHaskOwnersList = function(){
		var data={'uid':$scope.inputedUserID}
		User.checHaskOwnersList(data).then(function(resJson){
			if(resJson.data.ownerCnt>0){
				$scope.createCheckBox(true);
			};
		}).catch(function(err){console.log(err);});
	}
	
	$scope.createCheckBox = function(checked){
		$("#jqxcheckbox-container").html("<div id='jqxcheckbox'></div>");
		$("#jqxcheckbox").jqxCheckBox({ width: 20, height: 16,checked:false});
		$("#jqxcheckbox").bind('change', function (event) {
			$scope.checked=event.args.checked;

			if($scope.checked){
				$scope.jqxDropDownListCreate();
			}else{
				$scope.jqxDropDownDestory();
			}
		});
		//$scope.jqxDropDownListCreate();
		$("#jqxcheckbox-panel").slideDown();
	}

	$scope.destroyCheckBox = function(){
		$("#jqxcheckbox-container").html("<div id='jqxcheckbox'></div>");
		$("#jqxcheckbox").jqxCheckBox('destroy');
		$("#jqxcheckbox-panel").slideUp();
	}

	//get list 

	$scope.jqxDropDownListCreate = function(){
		var data={'uid':$scope.inputedUserID}
		User.getjqxDropDownListed(data).then(function(resJson){
			var listed= new Array();
			var temp={"ownersName":"All","ownersID":"allowners"};
			listed.push(temp);
			for(var i=0;i<resJson.data.ownersName.length;i++){
				temp = {"ownersName":resJson.data.ownersName[i],"ownersID" :resJson.data.ownersID[i]};
				listed.push(temp);
			}
			var index=resJson.data.ownersID.indexOf($scope.ownersID);
			$("#jqxdropdownlist-container").html("<div id='jqxdropdownlist'></div>");
			$("#jqxdropdownlist").jqxDropDownList({
				 source:listed,
				 displayMember:"ownersName",
				 valueMember:"ownersID",
				 selectedIndex: index+1, width: '95%', height: '30px' 
			});
			$("#jqxdropdownlist-panel").slideDown();
			$('#jqxdropdownlist').bind('select', function (event) {
				var args = event.args;
				$scope.owenerDropDownSelected($('#jqxdropdownlist').jqxDropDownList('getItem', args.index));
			});
		}).catch(function(err){console.log(err);});
	}

	//DropDown List Destory

	$scope.jqxDropDownDestory = function(){
		$("#jqxdropdownlist-container").html("<div id='jqxdropdownlist'></div>");
		$("#jqxdropdownlist").jqxDropDownList("destroy" );
		$("#jqxdropdownlist-panel").slideUp();
	}

	$scope.owenerDropDownSelected = function(item){
		$scope.ownersID=item.value;
	}

	$scope.submit = function(){

		if($scope.checked){
			var data={'ownersID':$scope.ownersID,'managerID':$scope.inputedUserID};
			User.searchOwenerSelected(data).then(function(resJson){
				$scope.createDataTreeTable(resJson.data.dataTree);
			}).catch(function(err){console.log(err);});
		}else{
			var data={'uid':$scope.inputedUserID}
			
			User.accountsByUser(data).then(function(resJson) {
			
				$scope.createDataTreeTable(/*DataTreetableData*/resJson.data.dataprofile)
			
			}).catch(function(err) {console.log(err);});
		}
		
	}
	// When selet row
	$scope.rowSelected = function(row){console.log(row);}
	$scope.createDataTreeTable($scope.data);	
}]);

//accountsByUseTemp Controller

myController.controller("accountsByUseTempCtrl",['$scope', '$location',function($scope, $location) {


}]);

//SearchByNuIDTemp Controller

myController.controller("SearchByNuIDCtrl",['$scope', '$location',function($scope, $location) {


}]);