angular.module('app.controllers', [])

.controller('ChecklistCtrl', function($scope,ionicTimePicker,ionicDatePicker, MainService, $ionicLoading, $ionicPopup, $timeout, $rootScope) {
    $scope.checklist = {
        siteLocation:null,
        operator:null,
        operatorOther:null,
        plantName:null,
        plantOther:null,
        hub:null,
        date:null,
        weather:null,
        comments:null,
        engineOil:null,
        engineOilLitres:null,
        radiator:null,
        transOil:null,
        brakeOil:null,
        hydraulicOil:null,
        grease:null,
        wheels:null,
        quickHitch:null,
        airTanks:null,
        chains:null,
        hoses:null,
        lights:null,
        fire:null,
        safety:null,
        gauges:null,
        windows:null,
        brake:null,
        tidy:null,
        wof:null,
        wofComments:null,
        hazardAssessment:null,
        notifiable:null,
        ppe:null,
        firstAidKit:null,
        fireLocation:null,
        signage:null,
        consentRequired:null,
        publicAccess:null ,
        siteVisibility:null ,
        boredom:null ,
        ugServices:null ,
        ugServicesLocated:null ,
        trafficManagement:null ,
        overheadServices:null ,
        noise:null ,
        noisePpe:null ,
        slips:null ,
        slipsAware:null ,
        fuelSpill:null ,
        fuelSpillAware:null ,
        workingAlone:null ,
        workingAloneCheck:null ,
        proximity:null ,
        proximityAware:null ,
        steep:null ,
        steepAware:null ,
        trenches:null ,
        trenchesAware:null ,
        machinery:null ,
        machineryAware:null ,
        deepDrains:null ,
        deepDrainsAware:null ,
        water:null ,
        waterAware:null ,
        sunGlare:null ,
        sunGlareAware:null ,
        weatherAppropriate:null ,
        weatherAppropriateAware:null ,
        powerTools:null ,
        handTools:null ,
        plateCompactor:null ,
        pileDriver:null ,
        flailHead:null,
        flailHeadPpe:null,
        other:null,
        visitorName:null,
        visitorComments:null
    };
    
    $scope.blankChecklist = angular.copy($scope.checklist);
    
    $scope.operators = [
        {id:1, text:"Gary Van Nistelrooy", checked:false},
        {id:2, text:"Nathan Rankin", checked:false},
        {id:3, text:"Lee Watson", checked:false},
        {id:4, text:"Richard Harper", checked:false},
        {id:5, text:"Henry Cleary", checked:false},
        {id:6, text:"Carl Gibson", checked:false},
        {id:7, text:"Alan Gibson", checked:false},
        {id:8, text:"Other", checked:false},
    ];

    $scope.onOperatorChanged = function(value){
        var operatorText  = "";
        for (var index in value){
            var operator = value[index];
            operatorText = operatorText + operator.text;
            if (parseInt(index) !== (value.length - 1)){
                operatorText = operatorText + ", ";
            }
        }
        $scope.checklist.operator = operatorText;
    }
    
    
    $scope.plants = [
        {id:1, text:"ZX200", checked:false},
        {id:2, text:"ZX210", checked:false},
        {id:3, text:"ZX160", checked:false},
        {id:4, text:"ZX135", checked:false},
        {id:5, text:"JD750J", checked:false},
        {id:6, text:"A30C", checked:false},
        {id:7, text:"A30F", checked:false},
        {id:8, text:"ISUZU TIPPER", checked:false},
        {id:9, text:"SCANIA TIPPER", checked:false},
        {id:10, text:"KENWORTH TRANSPORTER", checked:false},
        {id:11, text:"Labour", checked:false},
        {id:12, text:"Other", checked:false},
        
    ];
    
    $scope.onPlantChanged = function(value){
        var plantText  = "";
        for (var index in value){
            var plant = value[index];
            plantText = plantText + plant.text;
            if (parseInt(index) !== (value.length - 1)){
                plantText = plantText + ", ";
            }
        }
        $scope.checklist.plantName = plantText;
    }    
    
    var timePickerObj1 = {
        callback: function (val) {      //Mandatory
          if (typeof (val) === 'undefined') {
          } else {
            var selectedTime = new Date(val * 1000);
            var ampm = selectedTime.getUTCHours() < 12 ? "am" : "pm";
            var min = selectedTime.getUTCMinutes() < 10 ? "0" + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes();
            $scope.checklist.hub = selectedTime.getUTCHours() + ":" + min + " " + ampm;
          }
        },
        inputTime: 50400,   //Optional
        format: 12,         //Optional
        step: 15,           //Optional
        setLabel: 'Set Time'    //Optional
    }; 
    
  
    
    var datePickerObj = {
      callback: function (val) {  //Mandatory
        var date = new Date(val)
        $scope.checklist.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      },
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
       $timeout(function(){cordova.plugins.Keyboard.close();},500);
      ionicDatePicker.openDatePicker(datePickerObj);
    };    
    
    
    $scope.openTimePicker1 = function(){
        $timeout(function(){cordova.plugins.Keyboard.close();},500);
        ionicTimePicker.openTimePicker(timePickerObj1);
    }
    
    $scope.errorHandler = function(e) {
      var msg = '';

      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'QUOTA_EXCEEDED_ERR';
          break;
        case FileError.NOT_FOUND_ERR:
          msg = 'NOT_FOUND_ERR';
          break;
        case FileError.SECURITY_ERR:
          msg = 'SECURITY_ERR';
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = 'INVALID_MODIFICATION_ERR';
          break;
        case FileError.INVALID_STATE_ERR:
          msg = 'INVALID_STATE_ERR';
          break;
        default:
          msg = 'Unknown Error';
          break;
      };
      console.log(msg);
    }
    

    $scope.onInitFs = function(fs) {
        //console.log(cordova.file.externalDataDirectory + 'log.txt');

        var date = (new Date).getTime();
        $scope.checklist.filename = "checklist" + date + ".txt";
        console.log($scope.checklist.filename);
        fs.root.getFile("checklist" + date + ".txt", {create: true}, function(fileEntry) {
            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                  console.log('Write completed.');
                };

                fileWriter.onerror = function(e) {
                  console.log('Write failed: ' + e.toString());
                };

                // Create a new Blob and write it to log.txt.
                var blob = new Blob([JSON.stringify($scope.checklist)], {type: 'text/plain'});

                fileWriter.write(blob);

            }, $scope.errorHandler);

        }, $scope.errorHandler);

    }

        


    $scope.submitChecklist = function(){
        if (!$scope.checklist.operator){
            $ionicPopup.alert({
            title: 'Error',
            template: "You must choose an operator."
            });   
            return;
        }
        $ionicLoading.show({
            template: 'Submitting checklist...'
        });      
        
        var date = new Date();
        var ampm = date.getUTCHours() < 12 ? "am" : "pm";
        var min = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
        $scope.checklist.submittedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        $scope.checklist.submittedAt =  date.getUTCHours() + ":" + min + " " + ampm;   
        //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
        window.webkitStorageInfo.requestQuota(window.PERSISTENT, 1024*1024, function(grantedBytes) {
          window.requestFileSystem(window.PERSISTENT, grantedBytes, $scope.onInitFs, $scope.errorHandler);
        }, function(e) {
          console.log('Error', e);
        });
        
    
        console.log($scope.checklist);
        

        
        
        MainService.submitChecklist($scope.checklist).then(function(){
            $scope.resetForm();            
            $ionicLoading.hide();
            //connected to internet
            $ionicPopup.alert({
            title: 'Success',
            template: "Checklist submitted!"
            });             
        },function(){
            $scope.resetForm();
            $ionicLoading.hide();
            //not connected to internet
            $ionicPopup.alert({
            title: 'Error',
            template: "You are not currently connected to the internet. Your checklist has been queued to sync when you have an internet connection."
            });              
        })
    }
    
    
    $scope.saveDraftChecklist = function(){
        var date = new Date();
        var ampm = date.getUTCHours() < 12 ? "am" : "pm";
        var min = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
        $scope.checklist.submittedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        $scope.checklist.submittedAt =  date.getUTCHours() + ":" + min + " " + ampm;          
        MainService.saveDraftChecklist($scope.checklist);
        $ionicPopup.alert({
        title: 'Success',
        subTitle: 'Draft saved',
        template: "To access and resume this checklist, go to the history tab"
        });  
        $scope.resetForm();        
        
    }
    
    $scope.resetForm = function(){
        $scope.checklist = angular.copy($scope.blankChecklist);
        for (var index in $scope.operators){
            $scope.operators[index].checked = false;
        }
        for (var index in $scope.plants){
            $scope.plants[index].checked = false;
        }    
        
        var operatorElements = document.querySelectorAll(".operators-select .list div");
        for (var index in operatorElements){
            if (parseInt(index) !== 0){
                operatorElements[index].outerHTML = "";
            }
        }        
        var plantElements = document.querySelectorAll(".plants-select .list div");
        for (var index in plantElements){
            if (parseInt(index) !== 0){
                plantElements[index].outerHTML = "";
            }
        }         
        document.querySelector(".operators-select .list div").innerHTML = "Select Operators";
        document.querySelector(".plants-select .list div").innerHTML = "Select Plants";          
    }
    
    $rootScope.$on("resumeDraft", function(event, data){
        console.log(data);
        $scope.checklist = angular.copy(data.checklist);
        MainService.removeDraftChecklist(data.id);
        for (var index in $scope.operators){
            if ($scope.checklist.operator && $scope.checklist.operator.indexOf($scope.operators[index].text) > -1){
                $scope.operators[index].checked = true;
            }  
        }
        for (var index in $scope.plants){
            if ($scope.checklist.plantName && $scope.checklist.plantName.indexOf($scope.plants[index].text) > -1){
                $scope.plants[index].checked = true;
            }  
        }  
        var operatorElements = document.querySelectorAll(".operators-select .list div");
        for (var index in operatorElements){
            if (parseInt(index) !== 0){
                operatorElements[index].outerHTML = "";
            }
        }        
        var plantElements = document.querySelectorAll(".plants-select .list div");
        for (var index in plantElements){
            if (parseInt(index) !== 0){
                plantElements[index].outerHTML = "";
            }
        } 
        
        document.querySelector(".operators-select .list div").innerHTML = $scope.checklist.operator  ? $scope.checklist.operator.split(",").join("<br>") : "Select Operators";
        document.querySelector(".plants-select .list div").innerHTML = $scope.checklist.plantName  ? $scope.checklist.plantName.split(",").join("<br>") : "Select Plants";      
    })
    
    
    
    
    
    
    
    
    
})

.controller('HistoryCtrl', function($scope, MainService, $ionicPopup) {
  $scope.$on('$ionicView.enter', function(){
      $scope.checklists = MainService.getChecklists();
      $scope.draftChecklists = MainService.getDraftChecklists();
  })
  
  $scope.doSync = function(){
        $ionicPopup.alert({
        title: 'Sync started',
        template: "Syncing will complete in the background."
        });       
      MainService.syncChecklists();
  }
})

.controller('HistoryDetailCtrl', function($scope, $stateParams, MainService) {
  $scope.checklist = MainService.getChecklist($stateParams.historyId);
  
})


.controller('HistoryDraftDetailCtrl', function($scope, $stateParams, MainService, $rootScope, $state,$ionicHistory) {
  $scope.checklist = MainService.getDraftChecklist($stateParams.historyId);
  $scope.resumeChecklist = function(){
      
      $rootScope.$broadcast("resumeDraft", {checklist:$scope.checklist, id:$stateParams.historyId});
      
      $ionicHistory.clearHistory();
      $state.go("tab.checklist");
  }
  
});
