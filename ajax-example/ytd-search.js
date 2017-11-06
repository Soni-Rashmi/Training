var xhttp = new XMLHttpRequest();
var count = 0;
var reqCount = 0;
var nextPageToken = "";
var tiles = "";
var obj = [];
var flag = false;
var searchItem = "";

function getSearchResult() {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
            nextPageToken = jsonObj["nextPageToken"];
            for (var i = 0; i < jsonObj["items"].length; i++) {
                var item = jsonObj["items"][i];
                obj[i] = {
                    "title" : item["snippet"]["title"],
                    "description" : item["snippet"]["description"],
                    "url" : item["snippet"]["thumbnails"]["medium"]["url"],
                    "vId" : item["id"]["videoId"]
                };
                if(obj[i]["vId"] == undefined){
                    obj[i]["vId"] = item["id"]["playlistId"];
                }
            }
            createDiv();
        }
    };
    searchItem = document.getElementById("searchText").value;
    sendRequest(searchItem, nextPageToken);
};

function sendRequest(searchItem, nextPageToken) {
      var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&key=AIzaSyAnEACJbtf6_RPaQ2s1V3NnZkq-Ac9PhvI&q=" + searchItem;
      if(nextPageToken) {
          url = url + "&pageToken=" + nextPageToken;
      }
      xhttp.open("GET", url, true);
      xhttp.send();
};

function createDiv() {
  for (var i = 0; i < obj.length; i++) {
      var tile = '<div class="col-sm-4 col-md-4 col-lg-3"><div class="tile"><img src="' + obj[i]["url"] +'" alt="Alternate" class="img-responsive image-item" id="item-image" width="100%"> </img> \
      <div class="img-info"><p class="img-title caption">' + obj[i]["title"] +'</p>  <p class="img-description text-muted">' + obj[i]["description"] + '</p> </div>\
      <div class="button"><button type="button" class="btn-default watch-btn" id="'+ obj[i]["vId"] +'" onclick="playVideo(\''+ obj[i]["vId"] +'\', \'' + obj[i]["title"] +'\')"> Play</button>\
      <span id="'+ obj[i]["vId"] + 1 +'" class="glyphicon glyphicon-thumbs-up like-btn" onclick="changeColor(\'' + obj[i]["vId"] + 1 +'\')"></span></div></div> </div>';
       tiles = tiles.concat(tile);
  }
  document.getElementById("tile").innerHTML = tiles;
};

function playVideo(id, title) {
    var url = "http://www.youtube.com/embed/" + id;
        $("#video-modal").modal("show");
        $("#video-frame").attr("src", url);
        document.getElementById("video-title").innerHTML = title;
};

function changeColor(id) {
  var icon = document.getElementById(id);
    if (count == 0) {
      icon.style.color = "#f33b4c";
      count++;
    } else {
      icon.style.color = "#0f0c0c";
      count--;
    }
};

function getSearchParam() {
    var tileContainer = document.getElementById("tile");
    tileContainer.innerHTML = "";
    tiles = "";
    sendRequest(document.getElementById("searchText").value, nextPageToken);
};

window.onscroll = function() {
    if(window.scrollY >= document.body.clientHeight - window.innerHeight - document.getElementsByClassName("tile")[0].offsetHeight) {
        getSearchResult();
    }
};
