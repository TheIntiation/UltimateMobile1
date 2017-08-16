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
var RecordTypeId = getUrlVars()["RecordTypeId"];
var moduleId = getUrlVars()["RecordTypeId"];
var projectid = getUrlVars()["RecordTypeId"];
function WorkflowDetailsUI() {
    var bindingsApplied = false;
    var self = this;
    var htmlElements;

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
    self.CurrencySign = ko.observable('$');

    /***********Global DATA MODELS**********/


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

    $.fn.caps = function () {
        var me = $(this);
        me.change(function () {
            alert("sdfsd");
        });
    }
    // $('#foo').caps();
    /***********Global DATA MODELS**********/
    $('#myform').on('change', 'select', function (e) {
        var val = $(e.target).val();
        var text = $(e.target).find("option:selected").text();
        var name = $(e.target).attr('name');
        $('p').text("Changed: name=" + name + " to val=" + val + " and text=" + text);
    });
    /***********Global Variables**********/
    self.UserID = ko.observable(UserID);       ///Login UserID
    self.TotalWorkFlowPendingItems = ko.observable(0);
    self.UserName = ko.observable(UserName);     ///Login UserName
    self.UserFullName = ko.observable(0); ///Login UserFullName
    self.selectedProject = ko.observable(projectid);
    //self.selectedProject.subscribe(function (newValue) {
    //    alert("the new value is " + newValue);
    //});




    //self.selectedProject.subscribe(ItemClick);



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

    self.drawchartDelayedDocuments = function () {

        var GetProjectsList_URL = baseUrl + "api/WorkFlow/getdelayeddocumentsperproject?projectId=" + self.selectedProject();;

        var name = [];
        var chartdata = [];
        var final = [];


        $.ajax({
            url: GetProjectsList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        // alert(record.RecordName);
                        name.push(record.RecordName);
                        chartdata.push(record.CountVal);

                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            },
            complete: function (data) {
                for (var i = 0; i < name.length; i++) {
                    //  alert("down"+name[i]);
                    final.push({

                        name: name[i],
                        y: chartdata[i]
                    });
                }


                $('#containerDelayedDocuments').highcharts({

                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: "Percentage",
                        colorByPoint: true,
                        data: final
                    }]
                });

            }
        });

        ////////





        //////////////
    }
    self.drawchartRFIDocStatus = function () {

        var GetProjectsList_URL = baseUrl + "api/WorkFlow/getDocManagerRFI?projectId=" + self.selectedProject();

        var name = [];
        var chartdata = [];
        var final = [];
        var datas = [];


        $.ajax({
            url: GetProjectsList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        // alert(record.RecordName);
                        name.push(record.StatusName);
                        chartdata.push(record.CountVal);
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            },
            complete: function (data) {

                //                datas=[{
                //        name: 'Draft',
                //        data: [5]
                //    }, {
                //        name: 'Approved',
                //        data: [2]
                //    }, {
                //        name: 'Rejected',
                //        data: [3]
                //    }];
                for (var i = 0; i < name.length; i++) {
                    //    console.log('chart data : ' + chartdata[i]);
                    //          alert(name[i] + '' + chartdata[i]); 
                    //  alert('data '+  chartdata[i] ); 
                    datas.push({
                        name: name[i],
                        data: [chartdata[i]]
                    })
                }


                /*new code */

                $('#containerRFIStatus').highcharts({
                    chart: {
                        //        type: 'bar',
                        //        inverted: true
                        type: 'column',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['']
                    },
                    credits: {
                        enabled: false
                    },
                    series: datas
                    //series:  final

                });

                /*new code end*/






            }
        });

    }
    self.drawchartActiveDocuments = function () {

        var getactivedocumentsperproject_URL = baseUrl + "api/WorkFlow/getactivedocumentsperproject?projectId=" + self.selectedProject();

        var name = [];
        var chartdata = [];
        var final = [];


        $.ajax({
            url: getactivedocumentsperproject_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    //self.ProjectsList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        // alert(record.RecordName);
                        name.push(record.RecordName);
                        chartdata.push(record.CountVal);

                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            },
            complete: function (data) {
                for (var i = 0; i < name.length; i++) {
                    //  alert("down"+name[i]);
                    final.push({

                        name: name[i],
                        y: chartdata[i]
                    });
                }


                $('#containerActiveDocuments').highcharts({

                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: "Percentage",
                        colorByPoint: true,
                        data: final
                    }]
                });

            }
        });

        ////////





        //////////////
    }
    self.drawchartCOs = function () {

        var GetProjectsList_URL = baseUrl + "api/WorkFlow/getDocManagerCos?projectId=" + self.selectedProject();

        var name = [];
        var chartdata = [];
        var final = [];
        $.ajax({
            url: GetProjectsList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        // alert(record.RecordName);
                        name.push(record.StatusName);
                        chartdata.push(record.CountVal);

                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            },
            complete: function (data) {
                for (var i = 0; i < name.length; i++) {

                    //alert("Cos" + chartdata[i]);
                    final.push({

                        //  alert('Name  :'  + chartdata[i] 	);
                        name: name[i],
                        y: chartdata[i]
                    });
                }



                $('#containerCosStatus').highcharts({

                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: 'transparent'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        // '{series.name}: <b>{point.percentage:.1f}%</b>'
                        formatter: function () {

                            // return '{series.name}: <b>{point.percentage:.1f}%</b>'
                            return this.point.y;
                        }

                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: "Status",
                        colorByPoint: true,
                        data: final
                    }]
                });

            }
        });

        ////////





        //////////////
    }
    self.permissionChanged = function (l) {
        if (bindingsApplied == true) {

        }
    }
    var datac = [];
    var data_draft = [];
    var data_submit = [];
    var data_Returned = [];
    var data_Resubmitted = [];
    var data_Approved = [];
    var data_Rejected = [];
    var data_Withdrawn = [];
    var datas = [];
    self.TotalOutStanding = ko.observable(0);
    self.TotalOverDue = ko.observable(0);
    self.GetPunchList = function (projectid) {
        self.TotalOutStanding('Total Outstanding Punchlist Items: ' + 0);
        self.TotalOverDue('Total Overdue Punchlist Items: ' + 0);
        datac = [];
        data_draft = [];
        data_submit = [];
        data_Returned = [];
        data_Resubmitted = [];
        data_Approved = [];
        data_Rejected = [];
        data_Withdrawn = [];
        datas = [];
        //  alert(datac.length);

        var GetPunchList_URL = baseUrl + "api/WorkFlow/GetPunchListChart?projectid=" + self.selectedProject();
        var IsDraft = parseInt(0);
        var IsSubmitted = parseInt(0);
        var IsReturned = parseInt(0);
        var IsResubmitted = parseInt(0);
        var IsApproved = parseInt(0);
        var IsRejected = parseInt(0);
        var IsWithdrawn = parseInt(0);
        $.ajax({
            url: GetPunchList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.TotalOutStanding('Total Outstanding Punchlist Items: ' + record.TotalOutStanding);
                        self.TotalOverDue('Total Overdue Punchlist Items: ' + record.TotalOverDue);
                        datac.push(record.ToCoName);
                        data_draft.push(record.Draft);
                        data_submit.push(record.Submitted);
                        data_Returned.push(record.Returned);
                        data_Resubmitted.push(record.Resubmitted);
                        data_Approved.push(record.Approved);
                        data_Rejected.push(record.Rejected);
                        data_Withdrawn.push(record.Withdrawn);

                        if (record.Draft != '' && record.Draft != null) {
                            IsDraft = parseInt(1);
                        }
                        if (record.Submitted != '' && record.Submitted != null) {
                            IsSubmitted = parseInt(1);
                        }
                        if (record.Returned != '' && record.Returned != null) {
                            IsReturned = parseInt(1);
                        }
                        if (record.Resubmitted != '' && record.Resubmitted != null) {
                            IsResubmitted = parseInt(1);
                        }
                        if (record.Approved != '' && record.Approved != null) {
                            IsApproved = parseInt(1);
                        }
                        if (record.Rejected != '' && record.Rejected != null) {
                            IsRejected = parseInt(1);
                        }
                        if (record.Withdrawn != '' && record.Withdrawn != null) {
                            IsWithdrawn = parseInt(1);
                        }
                    });


                    if (IsWithdrawn == parseInt(1)) {
                        datas.push({
                            name: 'Withdrawn',
                            data: data_Withdrawn
                        });
                    }

                    if (IsRejected == parseInt(1)) {
                        datas.push({
                            name: 'Rejected',
                            data: data_Rejected
                        });
                    }

                    if (IsApproved == parseInt(1)) {
                        datas.push({
                            name: 'Approved',
                            data: data_Approved
                        });
                    }

                    if (IsResubmitted == parseInt(1)) {
                        datas.push({
                            name: 'Resubmitted',
                            data: data_Resubmitted
                        });
                    }

                    if (IsDraft == parseInt(1)) {
                        datas.push({
                            name: 'Draft',
                            data: data_draft
                        });
                    }
                    if (IsSubmitted == parseInt(1)) {
                        datas.push({
                            name: 'Submitted',
                            data: data_submit
                        });
                    }

                    if (IsReturned == 1) {
                        datas.push({
                            name: 'Returned',
                            data: data_Returned
                        });
                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {
                //self.drawchartActiveDocuments();
                self.DrawPunchListChart();
            }
        });
    };
    self.DrawPunchListChart = function () {

        Highcharts.chart('punchListChartContainer', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: datac
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: datas
        });
    };
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
        window.location = "\Scheduling_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + data.ProjectId;
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

    //////////////////////////////////////

    this.WorkflowInboxList = ko.observableArray([]);

    function WorkflowInboxsDTO(WorkflowDTO) {
        var self = this;
        self.RowID = WorkflowDTO.RowID;
        self.DocId = WorkflowDTO.DocumentId;
        self.RecordId = WorkflowDTO.RecordId
        self.EntityId = WorkflowDTO.EntityId;
        self.Project = WorkflowDTO.Project;
        self.projectId = WorkflowDTO.projectId;
        self.RecordType = WorkflowDTO.RecordType;
        self.Description = WorkflowDTO.Description;
        self.StepNumber = WorkflowDTO.StepNumber;
        self.NumberOfSteps = WorkflowDTO.NumberOfSteps;
        self.RecordNumber = WorkflowDTO.RecordNumber;
        self.DueDate = WorkflowDTO.DueDate;
        self.FinalStep = WorkflowDTO.FinalStep;
        self.User = UserID;
        self.Comment = 'Comments goes here..';
        self.VisualWorkFlow = WorkflowDTO.VisualWorkFlow;
        self.TotalAttachments = WorkflowDTO.TotalAttachments;
        self.WorkFlowAttachments = WorkflowDTO.WorkFlowAttachments;

    }

    function DataTransferModel(DataTransferModel) {
        var self = this;
        self.IsSucess = DataTransferModel.IsSucess;
        self.Message = DataTransferModel.Message;
        self.DataValue = DataTransferModel.DataValue;
    }
    self.openUrl=function(data){
        window.opener = null;
        window.close();
        alert(data.FullFileName);
        window.open(data.FullFileName,  'toolbar=no,menubar=no,location=no,status=no');
        
    }
    self.GetWorkflowByUserAndModule = function () {
        document.getElementById("Preloader").style.display = "block";
        var GetWorkflow_URL = baseUrl + "api/WorkFlow/getworkflowdetailsbymodule?username=" + UserName + "&moduleId=" + moduleId;
        $.ajax({
            url: GetWorkflow_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {

                    //  alert('username is : ' + UserName + ' moduleId : ' + moduleId);
                    self.WorkflowInboxList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        record.DueDate = self.frmtDate(record.DueDate);
                        if (record.StepNumber == record.NumberOfSteps) {
                            record.FinalStep = true;
                        }
                        else {
                            record.FinalStep = false;
                        }
                        self.WorkflowInboxList.push(new WorkflowInboxsDTO(record));

                    });

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {
                document.getElementById("Preloader").style.display = "none";
                //alert('hello');
                //  console.log('project list complete',self.stageGatesList());
                //self.selectedProject();
                //self.selectedProject = ko.observable();
            }
        });
    }

    self.downloadFile = function (data) {
        var dlnk = document.getElementById('dwnldLnk');
        dlnk.href = data.base64Data;
        dlnk.click();
        alert('toma');
    }


    self.RejectDoc = function (data, comm) {
        myApp.confirm('Are you sure, You want to Reject?', function () {
            var GetReject_URL = baseUrl + "api/WorkFlow/rejectforworkflow";
            //WorkflowInboxsDTO.User = UserID;
            //WorkflowInboxsDTO.DocId = data.DocumentId;
            var datas = {
                "User": UserID,
                "DocId": data.DocId,
                "EntId": data.EntityId,
                "RecId": data.RecordId,
                "RecTypeId": data.RecordTypeId,
                "ObjTypeId": "1",
                "ProjectId": data.projectId,
                "Comment": data.Comment
            };

            $.ajax({
                url: GetReject_URL,
                type: "POST",
                data: JSON.stringify(datas),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data, textStatus, jqXHR) {

                    if (data.IsSucess == true) {
                        // myApp.alert('Document was approved successfully');
                        myApp.alert('Document was Rejected successfully!!', 'Congrats!');
                        self.GetWorkflowByUserAndModule();
                        self.GetMenueList();
                        // alert('Document was approved successfully');
                        // window.location = "dashboard.html?UserID=" + data.DataValue.UserID + "&UserName=" + data.DataValue.UserName;
                        //window.location = "work_flow_inbox.html?UserID=" + UserID + "&UserName=" + UserName + "&RecordTypeId=" + moduleId;
                    } else {

                        myApp.alert('Can not Reject workflow doument!!');
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    myApp.alert('Can not Reject workflow doument!!');

                    return;
                }
            });
        });

    }
    self.FinalApproveDoc = function (data, comm) {
        myApp.confirm('Are you sure, You want to Approve?', function () {
            var GetFinalApprove_URL = baseUrl + "api/WorkFlow/finalApproveForWorkflow";
            //WorkflowInboxsDTO.User = UserID;
            //WorkflowInboxsDTO.DocId = data.DocumentId;
            var datas = {
                "User": UserID,
                "DocId": data.DocId,
                "EntId": data.EntityId,
                "RecId": data.RecordId,
                "RecTypeId": data.RecordTypeId,
                "ObjTypeId": "1",
                "ProjectId": data.projectId,
                "Comment": data.Comment
            };

            $.ajax({
                url: GetFinalApprove_URL,
                type: "POST",
                data: JSON.stringify(datas),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data, textStatus, jqXHR) {

                    if (data.IsSucess == true) {
                        // myApp.alert('Document was approved successfully');
                        myApp.alert('Congrats', 'Document was approved successfully!!');
                        self.GetWorkflowByUserAndModule();
                        self.GetMenueList();
                        // alert('Document was approved successfully');
                        // window.location = "dashboard.html?UserID=" + data.DataValue.UserID + "&UserName=" + data.DataValue.UserName;
                        //window.location = "work_flow_inbox.html?UserID=" + UserID + "&UserName=" + UserName + "&RecordTypeId=" + moduleId;
                    } else {

                        myApp.alert('Can not reject workflow doument!!');
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    myApp.alert('Can not reject workflow doument!!');

                    return;
                }
            });
        });

    }
    self.NormalApproveDoc = function (data, comm) {
        myApp.confirm('Are you sure, You want to Approve?', function () {
            var GetApprove_URL = baseUrl + "api/WorkFlow/approveforworkflow";
            //WorkflowInboxsDTO.User = UserID;
            //WorkflowInboxsDTO.DocId = data.DocumentId;
            var datas = {
                "User": UserID,
                "DocId": data.DocId,
                "EntId": data.EntityId,
                "RecId": data.RecordId,
                "RecTypeId": data.RecordTypeId,
                "ObjTypeId": "1",
                "ProjectId": data.projectId,
                "Comment": data.Comment
            };

            $.ajax({
                url: GetApprove_URL,
                type: "POST",
                data: JSON.stringify(datas),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data, textStatus, jqXHR) {

                    if (data.IsSucess == true) {
                        // myApp.alert('Document was approved successfully');
                        myApp.alert('Congrats', 'Document was approved successfully!!');
                        self.GetWorkflowByUserAndModule();
                        self.GetMenueList();
                        // alert('Document was approved successfully');
                        // window.location = "dashboard.html?UserID=" + data.DataValue.UserID + "&UserName=" + data.DataValue.UserName;
                        //window.location = "work_flow_inbox.html?UserID=" + UserID + "&UserName=" + UserName + "&RecordTypeId=" + moduleId;
                    } else {

                        myApp.alert('Can not approve workflow doument!!');
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    myApp.alert('Can not approve workflow doument!!');

                    return;
                }
            });
        });

    }
    self.ReturnDoc = function (data, comm) {
        myApp.confirm('Are you sure, You want to Return?', function () {
            var GetReturn_URL = baseUrl + "api/WorkFlow/returnforworkflow";
            //WorkflowInboxsDTO.User = UserID;
            //WorkflowInboxsDTO.DocId = data.DocumentId;
            var datas = {
                "User": UserID,
                "DocId": data.DocId,
                "EntId": data.EntityId,
                "RecId": data.RecordId,
                "RecTypeId": data.RecordTypeId,
                "ObjTypeId": "1",
                "ProjectId": data.projectId,
                "Comment": data.Comment
            };

            $.ajax({
                url: GetReturn_URL,
                type: "POST",
                data: JSON.stringify(datas),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data, textStatus, jqXHR) {

                    if (data.IsSucess == true) {
                        // myApp.alert('Document was approved successfully');
                        myApp.alert('Congrats', 'Document was Returned successfully!!');
                        self.GetWorkflowByUserAndModule();
                        self.GetMenueList();
                        // alert('Document was approved successfully');
                        // window.location = "dashboard.html?UserID=" + data.DataValue.UserID + "&UserName=" + data.DataValue.UserName;
                        //window.location = "work_flow_inbox.html?UserID=" + UserID + "&UserName=" + UserName + "&RecordTypeId=" + moduleId;
                    } else {

                        myApp.alert('Can not Return workflow doument!!');
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    myApp.alert('Can not Return workflow doument!!');

                    return;
                }
            });
        });

    }
    self.VisualWorkList = ko.observableArray([]);
    self.GetVisualWorkFlow = function (DocID) {
        var GetVisualWorkFlow_URL = baseUrl + "api/WorkFlow/GetDocumentStepsRoles?DocumentId=358";
        $.ajax({
            url: GetVisualWorkFlow_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {

                    //  alert('username is : ' + UserName + ' moduleId : ' + moduleId);
                    self.VisualWorkList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                        self.VisualWorkList.push({ name: "sss" });

                    });

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



    self.getRecordAttachmentById = function (data) {//id = guid
        var ext = data.Extention;
        var FullFileName = data.FullFileName;
        // var ext;
        var file;
        // alert("hjhj");
        var getRecordAttachmentById_URL = baseUrl + "api/WorkFlow/GetWorkflowAttachmentById?RecordTypeId=" + data.RecordTypeId + "&RecordId=" + data.RecordId + "&UserName=" + data.UserName + "&Id=" + data.Id;
        $.ajax({
            url: getRecordAttachmentById_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {

                //   alert(data);
                //                var docx = 'data:application/octet-stream;base64,' +
                //'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';

                file = 'data:application/' + ext + ';base64,' + data;

                // window.open("data:application/pdf;base64," + data);
                // document.location.href = "data:application/pdf;base64," + data;

                // alert('toma');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }, complete: function (data) {

                var dlnk = document.getElementById('dwnldLnk2');
                //alert(file);
                dlnk.href = file;
                dlnk.download = FullFileName;
                dlnk.click();
                dlnk.click();

                //alert('complete');
                //  console.log('project list complete',self.stageGatesList());
                //self.selectedProject();
                //self.selectedProject = ko.observable();
            }
        });
    }




    /////////////////////


    ///////////////////////////////



    ///////////////////////

    self.GetMenueList();
    self.GetWorkflowByUserAndModule();
    // self.clickme();




}
