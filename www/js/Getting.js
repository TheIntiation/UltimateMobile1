function getitems(){
    //myApp.showPreloader("Waiting");
    var urlAjax = "http://services.uspmc.com/api/WorkFlow/GetPendingWorkFlowByUserID?UserID=admin";
    $.ajax({

        method: "Get",
        url: urlAjax,
        contentType: 'application/json',
      
        dataType: "json",
        success: function (data, status, xhr) {
            
            
            
            
            if(data.IsSucess==true){
                localStorage.setItem("value",JSON.stringify(data));
                
            }
            else {}
            myApp.hidePreloader("Waiting");
           if(data==null){
               myApp.alert("Erorr user name or password");
           }
            
       // myApp.hidePreloader("");
            console.log(data);
        }, error : function(data){
                    myApp.hidePreloader("Waiting");
           myApp.alert("network error");
        }
    
});
}

function appenditems(){
    
    debugger;
    var data=localStorage.getItem("value");
    data=JSON.parse(data);
    var array=null;
    
    var html= '';
    if(array==null || typeof(array)=="undfined" || array==[]){return;}
    array=data.DataValue;
    for(var i=0; i< 15; i++){
      html+=`<li id=`+array[i].RecordId+`>
      <a href="#" class="item-link item-content">
        <div class="item-media"><i style="color:#3D1949" class="icon f7-icons">info</i></div>
        <div class="item-inner">
          <div class="item-title">`+array[i].Project+`</div>
          <div class="item-after">`+array[i].RecordType+`</div>
        </div>
      </a>
    </li>
    <li>
`
    }
    $$("#items").append(html);
    
    var loading = false;
    var lastIndex = $$('.list-block li').length;
 
// Max items to load
var maxItems = array.length;
 
// Append items per load
var itemsPerLoad = 5;
 
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {
 debugger;
  // Exit, if loading in progress
  if (loading) return;
 
  // Set loading flag
  loading = true;
 
  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }
 
    // Generate new items HTML
    var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      html+=`<li>
    <div class="item-content">
        <div class="item-media">
            <i class="icon my-icon"></i>
        </div>
        <div class="item-inner">
            <div class="item-title">
                `+array[i].Project+`
            </div>
            <div  class="item-after">
               `+array[i].RecordType+`
            </div>
        </div>
    </div>
</li>`;
    }
 
    // Append new items
    $$('#items').append(html);
 
    // Update last loaded index
    lastIndex = $$('.list-block li').length;
  }, 1000);
});          
    
    
    
    
    
    
    
    
    
} 