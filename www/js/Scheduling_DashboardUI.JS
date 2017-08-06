function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var UserID = getUrlVars()["UserID"];
var UserName = getUrlVars()["UserName"];
var projectid = getUrlVars()["projectid"];

function Scheduling_DashboardUI() {
var self = this;
var left='<div class="left"> </div>';            
var right='<div class="right"><span data-bind="text: record.GateDescrption">test right</span> </div>';     
var check=true;
var htmlElements = ""; 
var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine','ten'];
var colNumber=0;
//to do Make the project Id dynamic
this.stageGatesList = ko.observableArray([]);
    
function StageGatesDTO(StageGateDTO) {
        var self = this;
        self.Id = StageGateDTO.Id;
            self.GateId = StageGateDTO.GateId;
        self.ProjectName = StageGateDTO.ProjectName;
        self.CountActivitiesDone = StageGateDTO.CountActivitiesDone;
        self.TotalActivities = StageGateDTO.TotalActivities;
        self.Percentage = StageGateDTO.Percentage;
        self.GateDescrption = StageGateDTO.GateDescrption;
   
    }
    
function DataTransferModel(DataTransferModel) {
        var self = this;
        self.IsSucess = DataTransferModel.IsSucess;
        self.Message = DataTransferModel.Message;
        self.DataValue = DataTransferModel.DataValue;
    } 
    
self.GetStageGatesByProject =function ()  {
    var GetStageGatesList_URL = baseUrl + "api/WorkFlow/getStageGatesSnap?projectId=" + projectid ;
        $.ajax({
            url: GetStageGatesList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    self.stageGa

                    self.stageGatesList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {

                        self.stageGatesList.push(new StageGatesDTO(record));
                       // alert(record.GateDescrption);
                         // console.log( record);
                        colNumber++;
                        if (check == true) 
                        {
                        htmlElements += '<div class="left"><div class="inner">' + record.GateDescrption +  '</div>' 
                            + '<div  class="'+ numbers[colNumber] +'">'+  record.TotalActivities  + '<br/> Total' + '</div>'+ '<br/><div style="clear:both;"></div><div  class="'+ numbers[colNumber] +'Percentage">' + record.Percentage + '%'
                            
            +'</div><center><div class="bottom">Percentage of Activities done</div></center>'+ '</div>';
                 
                        check = false;
                        }
                        else{
                        htmlElements += '<div class="right"><div class="inner">' + record.GateDescrption +  '</div>' 
                            + '<div  class="'+ numbers[colNumber] +'">'+  record.TotalActivities  + '<br/> Total' + '</div>'+ '<br/><div style="clear:both;"></div><div  class="'+ numbers[colNumber] +'Percentage">' + record.Percentage + '%'
                            
            +'</div><center><div class="bottom">Percentage of Activities done</div></center>'+ '</div>';
                 
                        check = true; 
                        }
                    });
                    var container = document.getElementById("cont");
                    container.innerHTML = htmlElements;  
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            },complete: function (data) {
              
      //alert('hello');
   //  console.log('project list complete',self.stageGatesList());
        //self.selectedProject();
     //self.selectedProject = ko.observable();
    }
        });
 }

self.GetMenueList();
self.GetStageGatesByProject();             
        
    
}