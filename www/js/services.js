angular.module('app.services', [])


.service('MainService', function ($http, $q, API_URL,$interval){
    var MainService = this;
    this.submitChecklist = function(checklist){
        MainService.saveChecklist(checklist);
        var deferred = $q.defer();  
        $http.post(API_URL, checklist)    
            .success(function(data) {
                if (data.result === "success"){
                    deferred.resolve(data);
                }
                else{
                    MainService.saveNotSubmittedChecklist(checklist);
                    deferred.reject(data);
                }
            })
            .error(function(data,status) {
                MainService.saveNotSubmittedChecklist(checklist);
                deferred.reject(data);
            });

        return deferred.promise;  
    }
    
   this.submitNsChecklist = function(checklist,index){
        var deferred = $q.defer();  
        $http.post(API_URL, checklist)    
            .success(function(data) {
                if (data.result === "success"){
                    MainService.removeNsChecklist(index)
                    deferred.resolve(data);
                }
                else{
                    deferred.reject(data);
                }
            })
            .error(function(data,status) {
                deferred.reject(data);
            });

        return deferred.promise;  
    }    
    
    this.removeNsChecklist = function(id){
        var checklists = MainService.getNotSubmittedChecklists();
        for (var index in checklists){
            if (index === id){
                checklists.splice(index, 1);
                break;
            }
        }
        this.saveNotSubmittedChecklists(checklists);
    }
    
    this.saveNotSubmittedChecklists = function(checklists){
        window.localStorage.nschecklists = JSON.stringify(checklists);
    }
    
    this.syncChecklists = function(){
        var checklists = MainService.getNotSubmittedChecklists();
        console.log(checklists);
        if (checklists){
            var toSubmit = checklists.length;
            var interval = $interval(function(){
                console.log(toSubmit);
                if (toSubmit < 1){
                    MainService.removeNotSubmittedChecklists();
                    $interval.cancel(interval);
                }
                else{
                    MainService.submitNsChecklist(checklists[toSubmit - 1], toSubmit - 1)
                    toSubmit = toSubmit - 1;
                }
                
            },1000)
        }        
    }

    
    this.saveChecklist = function(checklist){
        var checklists = MainService.getChecklists();
        if (checklists){
            checklists.push(checklist);
            window.localStorage.checklists = JSON.stringify(checklists);
        }
        else{
            window.localStorage.checklists = JSON.stringify([checklist]);
        }
    };

    this.getChecklists = function(){
        var data = window.localStorage.checklists ? JSON.parse(window.localStorage.checklists) : null;
        return data;
    }; 
    
    this.getChecklist = function(index){
        var data = window.localStorage.checklists ? JSON.parse(window.localStorage.checklists) : null;
        if (data){
            return data[index];
        }
        return data;
    }; 
    
    this.saveNotSubmittedChecklist = function(checklist){
        var checklists = MainService.getNotSubmittedChecklists();
        if (checklists){
            checklists.push(checklist);
            window.localStorage.nschecklists = JSON.stringify(checklists);
        }
        else{
            window.localStorage.nschecklists = JSON.stringify([checklist]);
        }
    };

    this.getNotSubmittedChecklists = function(){
        var data = window.localStorage.nschecklists ? JSON.parse(window.localStorage.nschecklists) : null;
        return data;
    };
    
    this.removeNotSubmittedChecklists = function(){
        window.localStorage.nschecklists = null;
    }    
   
    
});
