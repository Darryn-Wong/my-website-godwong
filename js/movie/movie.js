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
// $('.latest-box').on('click', function () {
//   addToCard();
//   alert($(this).data('id'));
// });
$(document).on("click",".latest-box", function(){
  document.getElementById("detail-image").src = '';
  document.getElementById("detail-overview").innerHTML = '';
  removeAllChildNodes(document.getElementById("detail-genre"));
  document.getElementsByClassName("loading")[0].classList.remove("hidden");
  document.getElementsByClassName("modal")[0].classList.add("hidden");
  document.getElementsByClassName("modal-bg2")[0].src = '';
  document.getElementById("detail-home-button").href ='';
  initdetail($(this).data('id')); // "12314"
  // $("#showtheaddedform").append($("#div1").html());
  document.getElementsByClassName("modal")[0].classList.remove("hidden");
  document.getElementsByClassName("loading")[0].classList.add("hidden");
});

$(document).on("click", ".movies-box",function(){
  document.getElementById("detail-image").src = '';
  document.getElementById("detail-overview").innerHTML = '';
  removeAllChildNodes(document.getElementById("detail-genre"));
  document.getElementsByClassName("loading")[0].classList.remove("hidden");
  document.getElementsByClassName("modal")[0].classList.add("hidden");
  document.getElementsByClassName("modal-bg2")[0].src = '';
  document.getElementById("detail-home-button").href ='';
  initdetail($(this).data('id')); // "12314"
  // $("#showtheaddedform").append($("#div1").html());
  document.getElementsByClassName("modal")[0].classList.remove("hidden");
  document.getElementsByClassName("loading")[0].classList.add("hidden");
});
function initdetail(id) {
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
                }
            };
            xhr1.send();
        }
    };
  xhr.send();
}
function getData(callback,url) {

    var xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function() {
  
      if (xhr.readyState === 4 && xhr.status === 200) {
        var jsonData = JSON.parse(xhr.responseText);
        // arr = jsonData.data.children;
  
        // let myJson = [];
        // for (let i = 0; i < arr.length; i++) {
        //   let newObject = {};
        //   newObject.title = arr[i].data.title;
        //   newObject.upvotes = arr[i].data.ups;
        //   newObject.score = arr[i].data.score;
        //   newObject.num_comments = arr[i].data.num_comments;
        //   newObject.created = arr[i].created_utc;
        //   myJson.push(newObject);
        // }
  
        // Invoke the callback now with your recieved JSON object
        callback(jsonData);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

//   (function($) {

// 	"use strict";

// 	var fullHeight = function() {

// 		$('.js-fullheight').css('height', $(window).height());
// 		$(window).resize(function(){
// 			$('.js-fullheight').css('height', $(window).height());
// 		});

// 	};
// 	fullHeight();
// 	carousel();

// })(jQuery);
//   $(document).ready(function() {


//   });

//   $("#myCarousel").carousel();
//   // Enable Carousel Indicators
// $(".item").click(function(){
//   $("#myCarousel").carousel(1);
// });

// // Enable Carousel Controls
// $(".left").click(function(){
//   $("#myCarousel").carousel("prev");
// });

// modal
$('#exampleModalCenter').bind('hidden.bs.modal', function () {
  $("html").css("margin-right", "0px");
});
$('#exampleModalCenter').bind('show.bs.modal', function () {
  $("html").css("margin-right", "-15px");
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
          // Use the object however you wish
          // <div class="overlay"> <div class="overlay-text">Hello World</div></div> <div data-toggle="modal" data-target="#exampleModalCenter" data-id="insdsa"> Launch demo modal </div>
          document.getElementById("selected").innerHTML = data[0].name;
          getFilterSearch(data[0].id);
          for (i = 0; i < data.length; i++) {
            var str = '<a class="dropdown-item" data-dropup-auto="false" href="javascript:void(0);" data-genre-id="' + data[i].id + '">' + data[i].name + '</a>';
            document.querySelector(".filter-dropdown").insertAdjacentHTML('beforeend', str);
          }
          // document.getElementById("dropdown-item").addEventListener("click", getFilterSearch($(this).data('genre-id')));
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
          // Use the object however you wish
          // <div class="overlay"> <div class="overlay-text">Hello World</div></div> <div data-toggle="modal" data-target="#exampleModalCenter" data-id="insdsa"> Launch demo modal </div>
          removeAllChildNodes(document.getElementById("movies-list"));
          for (i = 0; i < data.length; i++) {
            var str = '<div class="movies-box " data-toggle="modal" data-target="#exampleModalCenter" data-id="' + data[i].id + '"><div class="movies-img"> <div class="release-date">'+ data[i].release_date+'</div><img src=http://image.tmdb.org/t/p/w185' + data[i].poster_path + '> </div><a href="javascript:void(0);">' + data[i].title + '</a></div>';
            document.querySelector("#movies-list").insertAdjacentHTML('beforeend', str);
          }
          // document.getElementById("dropdown-item").addEventListener("click", getFilterSearch);
          // $('.dropdown-menu a').click(function(){
          //   console.log($(this).text());
          //   $('#selected').text($(this).text());
          // });
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