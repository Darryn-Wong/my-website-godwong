// $(document).ready(function() {
//   $('.mdb-select').materialSelect();
// });
initLatest();
initFilterDropDown();

function initLatest() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=d7299e799dd5c0263703b9a328503591', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)  {
            var data = JSON.parse(xhr.responseText).results;
            for (i = 0; i < data.length; i++) {
                var str = '<li class="item"><div class="latest-box zoom" data-toggle="modal" data-target="#exampleModalCenter" data-id="' + data[i].id +'"><div class="latest-img"><img src="' + 'http://image.tmdb.org/t/p/w185' + data[i].poster_path + '"></div><div class="latest-b-text"><strong>' +  data[i].title+ '</strong>' + 
                '<div class="star-ratings"><div class="fill-ratings" style="width: ' + ((data[i].vote_average)*10).toString() + '%;"><span>★★★★★</span></div><div class="empty-ratings"><span>★★★★★</span></div></div>' + '<p>' + data[i].vote_average+'</p></div></div></li>';
                document.querySelector(".latest-append-start").insertAdjacentHTML('beforeend', str);
            }
            $(document).ready(function() {
                $('#autoWidth').lightSlider({
                    autoWidth:true,
                    loop:true,
                    onSliderLoad: function() {
                        $('#autoWidth').removeClass('cs-hidden');
                    }
                });  
              });
              // star rating
              $(document).ready(function() {
                var star_rating_width = $('.fill-ratings span').width();
                $('.star-ratings').width(star_rating_width);
              });
              $(document).ready(function() {
                $('#autoWidth2').lightSlider({
                    auto:true,
                    item:8,
                    loop:true,
                    slideMove:2,
                    autowidth:true,
                    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
                    speed:500,
                    pauseOnHover: true,
                    onSliderLoad: function() {
                        $('#autoWidth2').removeClass('cs-hidden');
                    },
                    responsive : [
                        {
                            breakpoint:1650,
                            settings: {
                                item:7,
                                slideMove:1,
                              }
                        },
                        {
                            breakpoint:1450,
                            settings: {
                                item:6,
                                slideMove:1,
                              }
                        },
                        {
                            breakpoint:1200,
                            settings: {
                                item:5,
                                slideMove:1,
                              }
                        },
                        {
                            breakpoint:1100,
                            settings: {
                                item:4,
                                slideMove:1,
                              }
                        },
                        {
                            breakpoint:900,
                            settings: {
                                item:3,
                                slideMove:1,
                                slideMargin:6,
                              }
                        },
                        {
                            breakpoint:680,
                            settings: {
                                item:2,
                                slideMove:1
                              }
                        }
                    ]
                });  
            });
        }
    };
  xhr.send();
}
$(document).on("click",".latest-box", function(){
  initdetail($(this).data('id'));
});
$(document).on("click", ".movies-box",function(){
  initdetail($(this).data('id'));
});
$(document).on("click", ".autocom-box li",function(){
  initdetail($(this).data('id'));
});
function initdetail(id) {
    document.getElementById("detail-image").src = '';
    document.getElementById("detail-overview").innerHTML = '';
    removeAllChildNodes(document.getElementById("detail-genre"));
    document.getElementsByClassName("loading")[0].classList.remove("hidden");
    document.getElementsByClassName("modal")[0].classList.add("hidden");
    document.getElementsByClassName("modal-bg2")[0].src = '';
    document.getElementById("detail-home-button").href ='';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.themoviedb.org/3/genre/movie/list?api_key=d7299e799dd5c0263703b9a328503591&language=en-US', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)  {
            // Parse JSON response
            var genres = JSON.parse(xhr.responseText).genres;
            var xhr1 = new XMLHttpRequest();
            xhr1.open('GET', 'https://api.themoviedb.org/3/movie/'+id+'?api_key=d7299e799dd5c0263703b9a328503591&language=en-US', true);
            xhr1.onreadystatechange = function() {
                if (xhr1.readyState === 4)  {
                    // Parse JSON response
                    var data = JSON.parse(xhr1.responseText);
                    // Use the object however you wish
                    console.log(data.tagline);
                    document.getElementById("detail-image").src = 'http://image.tmdb.org/t/p/original' + data.poster_path;
                    document.getElementById("detail-overview").innerHTML = data.overview;
                    data.genres.forEach(element => {
                      var str = '<button type = "button" class = "detail-genre-item btn btn-sm" disabled>' +element.name+ '</button>';
                      document.querySelector("#detail-genre").insertAdjacentHTML('beforeend', str);
                    });
                    document.getElementById("detail-home-button").href = data.homepage;
                    document.getElementsByClassName("modal-bg2")[0].src = 'http://image.tmdb.org/t/p/original' + data.backdrop_path;
                    document.getElementsByClassName("modal")[0].classList.remove("hidden");
                    document.getElementsByClassName("loading")[0].classList.add("hidden");
                }
            };
            xhr1.send();
        }
    };
  xhr.send();
}

// modal
$('#exampleModalCenter').bind('hidden.bs.modal', function () {
  $("html").css("margin-right", "0px");
});
$('#exampleModalCenter').bind('show.bs.modal', function () {
  $("html").css("margin-right", "-15px");
});
//   $(".search-input").classList.remove("active");
$(document).click(function(event) { 
  var $target = $(event.target);
  if(!$target.closest('.search-input').length && 
  $('.search-input').is(":visible")) {
    $('.search-input')[0].classList.remove("active");
  }
  else if($target.closest('.search-input').length && 
  $('.search-input').is(":visible")) {
    $('.search-input')[0].classList.add("active");
  }
});
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function initFilterDropDown() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/genre/movie/list?api_key=d7299e799dd5c0263703b9a328503591&language=en-US', true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
          var data = JSON.parse(xhr.responseText).genres;
          document.getElementById("selected").innerHTML = data[0].name;
          getFilterSearch(data[0].id);
          for (i = 0; i < data.length; i++) {
            var str = '<a class="dropdown-item" data-dropup-auto="false" href="javascript:void(0);" data-genre-id="' + data[i].id + '">' + data[i].name + '</a>';
            document.querySelector(".filter-dropdown").insertAdjacentHTML('beforeend', str);
          }
          $('.dropdown-menu a').click(function(){
            console.log($(this).text());
            $('#selected').text($(this).text());
            getFilterSearch($(this).data('genre-id'));
          });
      }
  };
  xhr.send();
}

function getFilterSearch(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=d7299e799dd5c0263703b9a328503591&with_genres=' + id, true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
          var data = JSON.parse(xhr.responseText).results;
          removeAllChildNodes(document.getElementById("movies-list"));
          for (i = 0; i < data.length; i++) {
            var str = '<div class="movies-box " data-toggle="modal" data-target="#exampleModalCenter" data-id="' + data[i].id + '"><div class="movies-img"> <div class="release-date">'+ data[i].release_date+'</div><img src=http://image.tmdb.org/t/p/w185' + data[i].poster_path + '> </div><a href="javascript:void(0);">' + data[i].title + '</a></div>';
            document.querySelector("#movies-list").insertAdjacentHTML('beforeend', str);
          }
      }
  };
  xhr.send();
}
// offset anchor by -100 Y
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 100);
  }
}
$(document).on('click', 'a[href^="#"]', function(event) {
  window.setTimeout(function() {
    offsetAnchor();
  }, 0);
});

window.setTimeout(offsetAnchor, 0);


// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = "https://www.google.com/search?q=" + userData;
            linkTag.setAttribute("href", webLink);
            console.log(webLink);
            linkTag.click();
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=d7299e799dd5c0263703b9a328503591&language=en-US&query=' + userData + '&page=1&include_adult=false', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var data = JSON.parse(xhr.responseText).results;
                removeAllChildNodes(suggBox);
                if(userData.length >= 3) {
                  for(var i = 0; i < data.length; i++) {
                    if(data[i].poster_path == null) {
                      var str = '<li data-id="' + data[i].id + '" data-toggle="modal" data-target="#exampleModalCenter">'+ data[i].title +'</li>';
                      suggBox.insertAdjacentHTML('beforeend', str);
                    } else {
                      var str = '<li data-id="' + data[i].id + '" data-toggle="modal" data-target="#exampleModalCenter">'+ data[i].title + '<img src="http://image.tmdb.org/t/p/w185' + data[i].poster_path + '">'  +'</li>';
                      suggBox.insertAdjacentHTML('beforeend', str);
                    }
                  }
                } else {
                  for(var i = 0; i < data.length; i++) {
                    if(!data[i].title.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())) {
                      continue;
                    }
                    if(data[i].poster_path == null) {
                      var str = '<li data-id="' + data[i].id + '" data-toggle="modal" data-target="#exampleModalCenter">'+ data[i].title +'</li>';
                      suggBox.insertAdjacentHTML('beforeend', str);
                    } else {
                      var str = '<li data-id="' + data[i].id + '" data-toggle="modal" data-target="#exampleModalCenter">'+ data[i].title + '<img src="http://image.tmdb.org/t/p/w185' + data[i].poster_path + '">'  +'</li>';
                      suggBox.insertAdjacentHTML('beforeend', str);
                    }
                  }
                }
                searchWrapper.classList.add("active");
                let allList = suggBox.querySelectorAll("li");
            }
        };
        xhr.send();
    } else {
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = "https://www.google.com/search?q=" + selectData;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
