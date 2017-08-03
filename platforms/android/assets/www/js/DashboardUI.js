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

function DashboardUI() {
    var bindingsApplied = false;
    var self = this;
    var baseUrl = "http://localhost:6607/";
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
    self.CurrencySign = ko.observable('$');
    /***********Global DATA MODELS**********/
    var left = '<div class="left"> </div>';
    var right = '<div class="right"><span data-bind="text: record.GateDescrption">test right</span> </div>';
    var check = true;
    var htmlElements = "";
    var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    var colNumber = 0;
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

    function formatLargeNumber(number) {
        // alert(number);
        //i//f (typeof (number) === 'function') {
        var n = number().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //}
        // alert(number);
        return n;
    }
    self.frmtDate = function (date) {
        var d = new Date(date);
        var year = d.getFullYear();

        var month = (1 + d.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = d.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '-' + day + '-' + year;
    }
    ko.bindingHandlers.largeNumber = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            var interceptor = ko.computed({
                read: function () {
                    return '$' + numeral(ko.unwrap(value)).format('0,0');
                },
                write: function (newValue) {
                    value(numeral().unformat(newValue));
                    value.valueHasMutated();
                }
            }).extend({ notify: 'always' });
            if (element.tagName.toLowerCase() == 'input')
                ko.applyBindingsToNode(element, {
                    value: interceptor
                });
            else
                ko.applyBindingsToNode(element, {
                    text: interceptor
                });
        }
    }


    function LoginDTO(LoginDTO) {
        var self = this;
        self.UserName = LoginDTO.UserName;
        self.Password = LoginDTO.Password;
    }
    function ProgramDTO(ProgramDTO) {
        var self = this;
        self.Id = ProgramDTO.Id;
        self.Name = 'Program: ' + ProgramDTO.Name;
    }


    function MapDTO(MapDTO) {
        var self = this;
        self.GoogleAddress = MapDTO.GoogleAddress;
        self.longitude = MapDTO.longitude;
        self.latitude = MapDTO.latitude;
        self.projectid = MapDTO.projectid;
        self.ProjectNumber = MapDTO.ProjectNumber;
        self.ProjectName = MapDTO.ProjectName;
        self.OUTSTANDING_DOCUMENT = MapDTO.OUTSTANDING_DOCUMENT;
        self.OVERDUE_DOCUMENT = MapDTO.OVERDUE_DOCUMENT;

        var d = new Date(MapDTO.FinishDate);
        var year = d.getFullYear();

        var month = (1 + d.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = d.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        FinishDate = month + '-' + day + '-' + year;


        self.FinishDate = FinishDate;


        var d = new Date(MapDTO.BaselineFinishDate);
        var year = d.getFullYear();

        var month = (1 + d.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = d.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        BaselineFinishDate = month + '-' + day + '-' + year;


        self.BaselineFinishDate = BaselineFinishDate;
        var fm = MapDTO.ForecastsVariance;
        fm = fm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        fm = '$' + fm;
        self.ForecastsVariance = fm;

    }

    function MenueDTO(MenueDTO) {
        var self = this;
        self.RecordTypeId = MenueDTO.RecordTypeId;
        self.RecordType = MenueDTO.RecordType;
        self.TotalPendingItems = MenueDTO.TotalPendingItems;
    }

    function ProjectDTO(ProjectDTO) {
        var self = this;
        self.Id = ProjectDTO.Id;
        self.ProjectName = ProjectDTO.ProjectName;
        self.ProjectNumber = ProjectDTO.ProjectNumber;
        self.ProgramId = ProjectDTO.ProgramId;
        self.IsActive = ProjectDTO.IsActive;
        self.IsInitiative = ProjectDTO.IsInitiative;
    }

    function DataTransferModel(DataTransferModel) {
        var self = this;
        self.IsSucess = DataTransferModel.IsSucess;
        self.Message = DataTransferModel.Message;
        self.DataValue = DataTransferModel.DataValue;
    }
    function ProgramProjectDTO(ProgramProjectDTO) {
        var self = this;
        self.ProjectId = ProgramProjectDTO.ProjectId;
        self.ProjectNumber = ProgramProjectDTO.ProjectNumber;
        self.ProjectName = ProgramProjectDTO.ProjectName;
    }


    /***********Global DATA MODELS**********/


    /***********Global Variables**********/
    self.UserID = ko.observable(UserID);       ///Login UserID
    self.TotalWorkFlowPendingItems = ko.observable(0);
    self.UserName = ko.observable(UserName);     ///Login UserName
    self.UserFullName = ko.observable(0); ///Login UserFullName
    self.selectedProject = ko.observable(0);

    self.WorkUnderContract = ko.observable(0);
    self.WorkinProgress = ko.observable(0);
    self.UnstartedContracts = ko.observable(0);
    self.ContractChanges = ko.observable(0);
    self.ProjectedCost = ko.observable(0);


    self.ProjectsList = ko.observableArray([]);
    self.MenueList = ko.observableArray([]);
    self.MapList = ko.observableArray([]);
    self.ProgramList = ko.observableArray([]);
    self.ProgramProjectList = ko.observableArray([]);

    /***********Global Variables**********/


    /***********Global Objects**********/
    var LoginDTO = new LoginDTO(new Object());
    /***********Global Objects**********/


    self.GetPortifolioSummryDashbaord = function () {
        var GetPortifolioSummryDashbaord_URL = baseUrl + "api/WorkFlow/GetPortifolioSummryDashbaord?programid=0";
        $.ajax({
            url: GetPortifolioSummryDashbaord_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.WorkUnderContract('$' + record.WorkUnderContract);
                        self.WorkinProgress('$' + record.WorkinProgress);
                        self.UnstartedContracts('$' + record.UnstartedContracts);
                        self.ContractChanges('$' + record.ContractChanges);
                        self.ProjectedCost('$' + record.ProjectedCost);
                    });

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }
        });
    };


    self.GetMenueList = function () {
        var GetMenueList_URL = baseUrl + "api/WorkFlow/getWorkflowmenu?userId=" + self.UserName();
        var TotalWorkFlowPendingItems = parseInt(0);
        $.ajax({
            url: GetMenueList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {

                if (data.IsSucess == true) {
                    self.MenueList.removeAll();

                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.MenueList.push(new MenueDTO(record));
                        TotalWorkFlowPendingItems = TotalWorkFlowPendingItems + parseInt(record.TotalPendingItems);
                    });
                    self.TotalWorkFlowPendingItems(TotalWorkFlowPendingItems);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }
        });
    };

    self.GetProjectsList = function () {
        var GetProjectsList_URL = baseUrl + "api/WorkFlow/GetALLUserProjects?UserId=" + self.UserID();
        $.ajax({
            url: GetProjectsList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    self.ProjectsList.removeAll();
                    self.ProjectsList.push(new ProjectDTO({ Id: 0, ProjectName: '[ALL PROJECT]', ProjectNumber: '[ALL PROJECT]', ProgramId: 0, IsActive: 0, IsInitiative: 0 }));
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.ProjectsList.push(new ProjectDTO(record));
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {
                self.selectedProject(0);
                bindingsApplied = true;
            }
        });
    };
    self.permissionChanged = function (l) {
        if (bindingsApplied == true) {
            self.GetStageGatesByProject();
        }
    };
    self.GetStageGatesByProject = function () {
        var GetStageGatesList_URL = baseUrl + "api/WorkFlow/getStageGatesSnap?projectId=" + self.selectedProject();
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
                        if (check == true) {
                            htmlElements += '<div class="left"><div class="inner">' + record.GateDescrption + '</div>'
                                + '<div  class="' + numbers[colNumber] + '">' + record.TotalActivities + '<br/> Total' + '</div>' + '<br/><div style="clear:both;"></div><div  class="' + numbers[colNumber] + 'Percentage">' + record.Percentage + '%'

                + '</div><center><div class="bottom">Percentage of Activities done</div></center>' + '</div>';

                            check = false;
                        }
                        else {
                            htmlElements += '<div class="right"><div class="inner">' + record.GateDescrption + '</div>'
                                + '<div  class="' + numbers[colNumber] + '">' + record.TotalActivities + '<br/> Total' + '</div>' + '<br/><div style="clear:both;"></div><div  class="' + numbers[colNumber] + 'Percentage">' + record.Percentage + '%'

                + '</div><center><div class="bottom">Percentage of Activities done</div></center>' + '</div>';

                            check = true;
                        }
                    });
                    var container = document.getElementById("cont");
                    container.innerHTML = htmlElements;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {

                //alert('hello');
                //  console.log('project list complete',self.stageGatesList());
                //self.selectedProject();
                //self.selectedProject = ko.observable();
            }
        });
    }

    self.getMapData = function () {
        var chk = parseInt(0);
        var GetPortifolioSummryDashbaord_URL = baseUrl + "api/WorkFlow/GetPortifolioSummryDashbaord?programid=-1";
        $.ajax({
            url: GetPortifolioSummryDashbaord_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    self.MapList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.MapList.push(new MapDTO(record));
                    });

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {
                self.GenrateMap();
            }
        });


    }

    self.GenrateMap = function () {

        var mapOptions = {
            center: new google.maps.LatLng(1, 1),
            zoom: 0,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(
            document.getElementById("map"),
            mapOptions
        );

        var infoWindow = new google.maps.InfoWindow({

        });
        ko.utils.arrayForEach(self.MapList(), function (record) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(record.longitude, record.latitude),
                map: map
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent('<strong>Project Number:&nbsp;</strong>' + record.ProjectNumber + '&nbsp;<br><strong>Project Name:&nbsp;</strong><a href=# onclick="open_dashboard(' + record.projectid + ',4,' + UserID + ' );" >' + record.ProjectName + '&nbsp;</a><br><strong>Projected Profit:&nbsp;</strong><a href=# onclick="open_dashboard(' + record.projectid + ',2,' + UserID + ' );" >' + record.ForecastsVariance + '&nbsp;</a><br><strong>Baseline Finish Date:&nbsp;</strong><a href=# onclick="open_dashboard(' + record.projectid + ',3,' + UserID + ' );" >' + record.BaselineFinishDate + '&nbsp;</a><br><strong>Current Finish Date:&nbsp;</strong><a href=# onclick="open_dashboard(' + record.projectid + ',3,' + UserID + ' );" >' + record.FinishDate + '&nbsp;</a><br><strong>Outstanding Doc.:&nbsp;</strong><a href=# onclick="open_dashboard(' + record.projectid + ',1,' + UserID + ' );" >' + record.OUTSTANDING_DOCUMENT + '&nbsp;</a><br><strong>Overdue Doc.:&nbsp;</strong><a href=# onclick="open_dashboard(' + record.projectid + ',1,' + UserID + ' );" >' + record.OVERDUE_DOCUMENT + '&nbsp;</a><br>');
                infoWindow.open(map, marker);
            });

        });

    }

    self.go_to_dashboard_ex = function (data) {
        window.location = "\Execitive_DashBoard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + data.ProjectId;
    }

    self.go_to_dashboard_google = function () {
        window.location = "\dashboard.html?UserID=" + UserID + "&UserName=" + UserName;
    }

    self.go_to_dashboard = function (data) {
        window.location = "\Document_Management_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + data.ProjectId;
    }
    self.go_to_dashboard_cost = function (data) {
        window.location = "\Cost_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + data.ProjectId;
    }
    self.go_to_dashboard_Scheduling = function (data) {
        window.location = "\Cost_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + data.ProjectId;
    }
    self.go_to_settings = function () {
        window.location = "\settings.html?UserID=" + UserID + "&UserName=" + UserName;
    }
    self.logout = function () {
        window.location = "\index.html";
    }
    self.go_to_help = function () {
        window.location = "\help.html?UserID=" + UserID + "&UserName=" + UserName;
    }
    self.go_to_subscribe = function () {
        window.location = "\subscribe.html?UserID=" + UserID + "&UserName=" + UserName;
    }
    self.go_to_work_flow_inbox = function (data) {
        window.location = "\work_flow_inbox.html?UserID=" + UserID + "&UserName=" + UserName + "&RecordTypeId=" + data.RecordTypeId;
    }
    /***********Global Services**********/

    self.GetProgramList = function () {
        var GetProgramList_URL = baseUrl + "api/WorkFlow/GetProgramsList?userid=" + self.UserID();
        $.ajax({
            url: GetProgramList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    self.ProgramList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.ProgramList.push({ Id: record.Id, Name: record.Name, ProjectList: record.ProjectList });
                    });

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {
                //alert("complete");
                // self.GenrateMap();
            }
        });


    }


    self.GetProgramList();
    self.GetProjectsList();
    self.GetMenueList();
    self.GetPortifolioSummryDashbaord();
    self.getMapData();

}