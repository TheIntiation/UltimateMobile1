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
function Document_Management_DashboardUI() {
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
                self.selectedProject(projectid);
                bindingsApplied = true;
                self.GetPunchList(self.selectedProject());
                self.drawchartActiveDocuments();
                self.drawchartDelayedDocuments();
                self.drawchartRFIDocStatus();
                self.drawchartCOs();
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
            self.GetPunchList(self.selectedProject());
            self.drawchartActiveDocuments();
            self.drawchartDelayedDocuments();
            self.drawchartRFIDocStatus();
            self.drawchartCOs();
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
    self.DrawPunchListChart=function(){
       
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

   

    
   
    self.GetProjectsList();
    
    

}
