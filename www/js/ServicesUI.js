function ServicesUI() {
    var self = this;


    /***********Global DATA MODELS**********/

    function LoginDTO(LoginDTO) {
        var self = this;
        self.UserName = LoginDTO.UserName;
        self.Password = LoginDTO.Password;
    }

    /***********Global DATA MODELS**********/
     
    
    /***********Global Variables**********/
    self.UserID = ko.observable(0);       ///Login UserID
    self.UserName = ko.observable(0);     ///Login UserName
    self.UserFullName = ko.observable(0); ///Login UserFullName
    self.selectedProject = ko.observable(0);

    /***********Global Variables**********/


    /***********Global Objects**********/
    var LoginDTO = new LoginDTO(new Object());
    /***********Global Objects**********/

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
            self.LoadPreLoder();
            $.ajax({
                url: Service_Login_Validate_URL,
                type: "POST",
                data: JSON.stringify(LoginDTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (data, textStatus, jqXHR) {
                    self.UnLoadPreLoder();
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
                    self.UnLoadPreLoder();
                    document.getElementById("msg").innerHTML = "Please check your network connection!";
                    myApp.alert("Network error. Contact your PMWeb Admin!");
                    $('#txtPassword').focus().select();
                    return;
                }
            });

    }

    self.LoadPreLoder = function () {
        document.getElementById("Preloader").style.display = "block";
        document.getElementById("txtUsername").setAttribute("disabled", "disabled");
        document.getElementById("txtPassword").setAttribute("disabled", "disabled");
        document.getElementById("next").setAttribute("disabled", "disabled");
    }

    self.UnLoadPreLoder = function () {
        document.getElementById("Preloader").style.display = "none";
        document.getElementById("txtUsername").removeAttribute("disabled");
        document.getElementById("txtPassword").removeAttribute("disabled");
        document.getElementById("next").removeAttribute("disabled");
    }

}