
var count = 0;
var reqCount = 0;
var nextPageToken = "";
var tiles = "";
var flag = false;
var searchItem = "";

function getSearchResult() {
    $.ajax({
        url: getURL(),

        dataType: "JSON",

        success: function (jsonObj) {
            var obj= [];
            nextPageToken = jsonObj["nextPageToken"];
            for (var i = 0; i < jsonObj["items"].length; i++) {
                var item = jsonObj["items"][i];
                obj[i] = {
                  "data" : [
                      {
                        "title" : item["snippet"]["title"],
                        "description" : item["snippet"]["description"],
                        "url" : item["snippet"]["thumbnails"]["medium"]["url"],
                        "vId" : item["id"]["videoId"]
                      },
                  ]
                };
            }
            createDiv(obj);
        },

        error: function () {
          alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
};

function getURL() {
  searchItem = $("#searchText").val();
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&key=AIzaSyAnEACJbtf6_RPaQ2s1V3NnZkq-Ac9PhvI&q=" + searchItem;
  if(nextPageToken) {
      url = url + "&pageToken=" + nextPageToken;
  }
  return url;
};

function createDiv(obj) {
    var template = $("#template").html();
    Mustache.parse(template);
    for (var i = 0; i < obj.length; i++) {
      var tile = Mustache.render(template, obj[i]);
      tiles = tiles.concat(tile);
    }
      $("#tile").html(tiles);
};

function playVideo(id, title) {
    var url = "http://www.youtube.com/embed/" + id;
        $("#video-modal").modal("show");
        $("#video-frame").attr("src", url);
        $("#video-title").html(title);
        $("#video-modal").on("hidden.bs.modal", function () {
            $("#video-frame").attr("src", " ");
        });
};

function changeColor(id) {
  var icon = $("#" + id);
    if (count == 0) {
      icon.css("color", "#f33b4c");
      count++;
    } else {
      icon.css("color", "#0f0c0c");
      count--;
    }
};

function getSearchParam() {
    var tileContainer = $("#tile");
    tileContainer.html("");
    tiles = "";
    getSearchResult();
};

window.onscroll = function() {
    if($(".tile")[0]) {
        if(window.scrollY >= document.body.clientHeight - window.innerHeight - $(".tile")[0].offsetHeight) {
            getSearchResult();
        }
    }
};
