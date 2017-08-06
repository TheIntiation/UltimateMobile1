function ServicesUI() {
    var self = this;
   // alert("sfsa");


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

    var me = getUrlVars()["me"];
    var name2 = getUrlVars()["name2"];

    //alert(me);
    //alert(name2);
    /***********Global DATA MODELS**********/

    function LoginDTO(LoginDTO) {
        var self = this;
        self.UserName = LoginDTO.UserName;
        self.Password = LoginDTO.Password;
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
   
    /***********Global DATA MODELS**********/
     
    
    /***********Global Variables**********/
    self.UserID = ko.observable(0);       ///Login UserID
    self.UserName = ko.observable(0);     ///Login UserName
    self.UserFullName = ko.observable(0); ///Login UserFullName
    self.selectedProject = ko.observable(0);

    self.ProjectsList = ko.observableArray([]);

    /***********Global Variables**********/


    /***********Global Objects**********/
    var LoginDTO = new LoginDTO(new Object());
    /***********Global Objects**********/


    
   

    /***********Global Services**********/

    // 1. Service_Login_Validate(userName,password) //
    // 2. GetProjectsList() //

  


    self.Service_Login_Validate = function () {
            var username = $$("#txtUsername").val();
            var password = $$("#txtPassword").val();
            if (username == "" || username == null || username == undefined) {
                document.getElementById("msg").innerHTML = "Please Enter User Name";
                $('#txtUsername').focus().select();
                return;
            }
            if (password == "" || password == null || password == undefined) {
                document.getElementById("msg").innerHTML = "Please Enter Password";
                $('#txtPassword').focus().select();
                return;
            }

            LoginDTO.UserName = username;
            LoginDTO.Password = password;


            var Service_Login_Validate_URL = baseUrl + "api/UserManagement/LoginUserValidation";

            $.ajax({
                url: Service_Login_Validate_URL,
                type: "POST",
                data: JSON.stringify(LoginDTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data, textStatus, jqXHR) {
                   
                    if (data.IsSucess == true) {
                        self.UserID(data.DataValue.UserID);
                        self.UserName(data.DataValue.UserName);
                        self.UserFullName(data.DataValue.UserFullName);
                        window.location = "dashboard.html?UserID=" + data.DataValue.UserID + "&UserName=" + data.DataValue.UserName;
                    } else {
                        document.getElementById("msg").innerHTML = "UserName/Password is Wrong!";
                        $('#txtPassword').focus().select();
                        return;
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    document.getElementById("msg").innerHTML = "UserName/Password is Wrong!";
                    $('#txtPassword').focus().select();
                    return;
                }
            });


           
    }

    self.abc = function () {
        alert("abc");
    }
    self.GetProjectsList = function () {
        alert("GetProjectsList");
        var GetProjectsList_URL = baseUrl + "api/WorkFlow/GetProjectsList";
        $.ajax({
            url: GetProjectsList_URL,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: true,
            success: function (data, textStatus, jqXHR) {
                if (data.IsSucess == true) {
                    self.ProjectsList.removeAll();
                    ko.utils.arrayForEach(data.DataValue, function (record) {
                       alert("sfs");
                        self.ProjectsList.push(new ProjectDTO(record));
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // alert('Error: ' + errorThrown + "/" + textStatus);
            }
        });
    };
    /***********Global Services**********/
       



}