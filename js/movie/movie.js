initLatest();
function initLatest() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=d7299e799dd5c0263703b9a328503591', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)  {
            var data = JSON.parse(xhr.responseText).results;
            // Use the object however you wish
            for (i = 0; i < data.length; i++) {
                var str = '<li class="item"><div class="latest-box"><div class="latest-img"><img src="' + 'http://image.tmdb.org/t/p/w185' + data[i].poster_path + '"></div><div class="latest-b-text"><strong>' +  data[i].title+ '</strong><p>' + data[i].vote_average+'</p></div></div></li>';
                document.querySelector(".latest-append-start").insertAdjacentHTML('beforeend', str);
            }
        }
    };
    xhr.send();
}
// function initgenre() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://api.themoviedb.org/3/genre/movie/list?api_key=d7299e799dd5c0263703b9a328503591&language=en-US', true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4)  {
//             // Parse JSON response
//             var data = JSON.parse(xhr.responseText).genres;
//             var xhr1 = new XMLHttpRequest();
//             xhr1.open('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=d7299e799dd5c0263703b9a328503591', true);
//             xhr1.onreadystatechange = function() {
//                 if (xhr1.readyState === 4)  {
//                     // Parse JSON response
//                     var data1 = JSON.parse(xhr1.responseText).results;
//                     // Use the object however you wish
//                     for (i = 0; i < data.length; i++) {
//                         console.log(data1[0].genre_ids[0]);
//                         const find = (element) => element > data1[0].genre_ids[0];
//                         console.log(data.findIndex(data1[0].genre_ids[0]));
//                         var genreIndex = data.findIndex(data1[i].genre_ids[0]);
//                         var str = '<li class="item-d"><div class="latest-box"><div class="latest-b-img"><img src="' + 'http://image.tmdb.org/t/p/w185' + data1[i].poster_path + '"></div><div class="latest-b-text"><strong>' +  data1[i].title+ '</strong><p>' + data[genreIndex] +' Movie</p></div></div></li>';
//                         document.querySelector(".latest-append-start").insertAdjacentHTML('beforeend', str);
//                     }
//                 }
//             };
//             xhr1.send();
//         }
//     };
//     xhr.send();
// }
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
$(document).ready(function() {
    $('#autoWidth,#autoWidth2').lightSlider({
        autoWidth:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth,#autoWidth2').removeClass('cs-hidden');
        } 
    });  
  });