angular.module('app.controllers', [])

.controller('ChecklistCtrl', function($scope,ionicTimePicker,ionicDatePicker, MainService, $ionicLoading, $ionicPopup, $timeout) {
    $scope.checklist = {
        siteLocation:null,
        operator:null,
        plantName:null,
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
        hazardAssessment:null,
        notifiable:null,
        ppe:null,
        firstAidKit:null,
        fireLocation:null,
        signage:null,
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
        other:null
    };
    
    $scope.blankChecklist = angular.copy($scope.checklist);
    
    
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
        console.log($scope.checklist.filename);
        var date = new Date();
        $scope.checklist.filename = "checklist" + date.UTC() + ".txt";
        fs.root.getFile($scope.checklist.filename, {create: true}, function(fileEntry) {
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
            $scope.checklist = angular.copy($scope.blankChecklist);
            $ionicLoading.hide();
            //connected to internet
            $ionicPopup.alert({
            title: 'Success',
            template: "Checklist submitted!"
            });             
        },function(){
            $scope.checklist = angular.copy($scope.blankChecklist);
            $ionicLoading.hide();
            //not connected to internet
            $ionicPopup.alert({
            title: 'Error',
            template: "You are not currently connected to the internet. Your checklist has been queued to sync when you have an internet connection."
            });              
        })
    }
    
    
    
    
    
    
    
    
    
})

.controller('HistoryCtrl', function($scope, MainService, $ionicPopup) {
  $scope.$on('$ionicView.enter', function(){
      $scope.checklists = MainService.getChecklists();
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
  
});
