var body = document.querySelector("body");
var button = document.querySelector("button");
var input = document.querySelector("input");
var info = document.getElementById("info");

var movie_list = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "Pulp Fiction", "The Good, the Bad and the Ugly", "The Lord of the Rings: The Return of the King", "12 Angry Men", "Schindler's List", "Forrest Gump", "One Flew Over the Cuckoo's Nest", "Goodfellas", "Episode IV - A New Hope", "It's a Wonderful Life", "The Silence of the Lambs", "City Lights", "Casablanca", ""];

movie_list.forEach(function(title) {

  var safe_url = encodeURI(title);
  var url = "http://omdbapi.com/?t=" + safe_url;
  console.log(url);

  var xhr = new XMLHttpRequest(); //making an object from a constructor
  xhr.open("GET", url); //when I tell you to go get it, this is where I want you to go

  var ul = document.getElementById("movies");
  var li = document.createElement("li");

  xhr.addEventListener('load', function(e) {
    var d = xhr.responseText //comes in in JSON so you will have to parse it
    var parsed = JSON.parse(d);
    console.log(parsed);
    var imgUrl = '"' + parsed.Poster + '"';
    li.setAttribute('style', 'background:url(' + imgUrl + ') no-repeat');

    li.addEventListener("click", function(){
      info.style.display="block";

      var movie_title = document.getElementById("movie_title");
      movie_title.innerHTML = parsed.Title;

      var year = document.getElementById("year");
      year.innerHTML = '(' + parsed.Year + ')';

      var plot = document.getElementById("plot");
      plot.innerHTML = parsed.Plot;

      var directors = document.getElementById("directors");
      directors.innerHTML = '<span>Director(s): </span>' + parsed.Director;

      var writers = document.getElementById("writers");
      writers.innerHTML = '<span>Writer(s): </span>' + parsed.Writer;

      var actors = document.getElementById("actors");
      actors.innerHTML = '<span>Actors: </span>' + parsed.Actors;

      var info_poster = document.getElementById("info_poster");
      info_poster.setAttribute('style', 'background:url(' + imgUrl + ') no-repeat');
    });//end li event listener

  });//end xhr event listener

  xhr.send();

  ul.appendChild(li);

});


function get_movie(){

  var text = input.value;
  var safe_url = encodeURI(text);
  var url = "http://omdbapi.com/?t=" + safe_url;

  var xhr = new XMLHttpRequest(); //making an object from a constructor
  xhr.open("GET", url); //when I tell you to go get it, this is where I want you to go

  if (input.value.trim() != "") { //only load if search box has text

    xhr.addEventListener('load', function(e) {
      var d = xhr.responseText //comes in in JSON so you will have to parse it
      var parsed = JSON.parse(d);
      var imgUrl = '"' + parsed.Poster + '"';

      info.style.display="block";

      var movie_title = document.getElementById("movie_title");
      movie_title.innerHTML = parsed.Title;

      var year = document.getElementById("year");
      year.innerHTML = '(' + parsed.Year + ')';

      var plot = document.getElementById("plot");
      plot.innerHTML = parsed.Plot;

      var directors = document.getElementById("directors");
      directors.innerHTML = '<span>Director(s): </span>' + parsed.Director;

      var writers = document.getElementById("writers");
      writers.innerHTML = '<span>Writer(s): </span>' + parsed.Writer;

      var actors = document.getElementById("actors");
      actors.innerHTML = '<span>Actors: </span>' + parsed.Actors;

      var info_poster = document.getElementById("info_poster");
      info_poster.setAttribute('style', 'background:url(' + imgUrl + ') no-repeat');
    });

    xhr.send();
  };
};//end get_movie function

button.addEventListener("click", function(){
  get_movie();
});

var close_info = document.getElementById("info");
close_info.addEventListener("click", function(){
  info.style.display="none";
});
