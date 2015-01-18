var body = document.querySelector("body");
var button = document.querySelector("button");
var input = document.querySelector("input");

var movie_list = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "Pulp Fiction", "The Good, the Bad and the Ugly", "The Lord of the Rings: The Return of the King", "12 Angry Men", "Schindler's List", "Forrest Gump", "One Flew Over the Cuckoo's Nest", "Goodfellas", "Episode IV - A New Hope", "It's a Wonderful Life", "The Silence of the Lambs", "City Lights", "Casablanca"];

movie_list.forEach(function(title) {

  var safe_url = encodeURI(title);
  var url = "http://omdbapi.com/?t=" + safe_url;
  console.log(url);

  var xhr = new XMLHttpRequest(); //making an object from a constructor
  xhr.open("GET", url); //when I tell you to go get it, this is where I want you to go

  var ul = document.getElementById("movies");
  var li = document.createElement("li");
  var poster = document.createElement("img");

  xhr.addEventListener('load', function(e) {
    var d = xhr.responseText //comes in in JSON so you will have to parse it
    var parsed = JSON.parse(d);
    console.log(parsed);
    var imgUrl = '"' + parsed.Poster + '"';
    poster.setAttribute("style", "background:url(" + imgUrl + ")");
  });

  xhr.send();

  ul.appendChild(li);
  li.appendChild(poster);


});

// function get_movie(){
//
//   var text = input.value;
//   var safe_url = encodeURI(text);
//   var url = "http://omdbapi.com/?t=" + safe_url;
//
//   var xhr = new XMLHttpRequest(); //making an object from a constructor
//   xhr.open("GET", url); //when I tell you to go get it, this is where I want you to go
//
//   if (input.value.trim() != "") { //only load if search box has text
//
//     xhr.addEventListener('load', function(e) {
//       var d = xhr.responseText //comes in in JSON so you will have to parse it
//       var parsed = JSON.parse(d);
//       console.log(parsed);
//
//       var poster = document.querySelector("img");
//       poster.setAttribute("src", parsed.Poster)
//     });
//
//     xhr.send();
//   };
// };//end get_movie function
//
// button.addEventListener("click", function(){
//   get_movie();
// });
