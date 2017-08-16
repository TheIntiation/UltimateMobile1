var myApp = new Framework7({
    modalTitle: 'Ultimate PMWeb App',
    template7Pages: true,
    domCache: false,
    tapHold: true,
    swipePanelOnlyClose: true,
    swipeBackPage: false
});
var mySwiper = myApp.swiper('.swiper-container', {
    pagination: '.swiper-pagination'
});
var $$ = Dom7;
var RecordId=0;
var isAndroid = Framework7.prototype.device.android === true;
var isIos = Framework7.prototype.device.ios === true;

var baseUrl = "http://localhost:6607/";
//var baseUrl = "http://168.187.116.4:8080/";
function CopyRights(){
    document.getElementById("op").innerHTML ="© All Rights Reserved to <span style=color:#6C3483;font-weight: bold;>Ultimate Solutions</span> " + new Date().getFullYear();   
}

function open_dashboard(projectid, type, UserID) {
    if (type == 1) {
        window.location = "\Document_Management_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + projectid;
    }
    if (type == 2) {
        window.location = "\Cost_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + projectid;
    }
    if (type == 3) {
        window.location = "\Cost_Dashboard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + projectid;
    }
    if (type == 4) {
        window.location = "\Execitive_DashBoard.html?UserID=" + UserID + "&UserName=" + UserName + "&projectid=" + projectid;
    }
    
}
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}