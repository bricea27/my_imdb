var body = document.querySelector("body");
var button = document.querySelector("button");
var input = document.querySelector("input");
var info = document.getElementById("info");
var logo = document.getElementById("logo");
var close_info = document.getElementById("close_info");

var movie_list = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "Pulp Fiction", "The Good, the Bad and the Ugly", "The Lord of the Rings: The Return of the King", "12 Angry Men", "Schindler's List", "Forrest Gump", "One Flew Over the Cuckoo's Nest", "Goodfellas", "Episode IV - A New Hope", "It's a Wonderful Life", "The Silence of the Lambs", "City Lights", "Casablanca", "Saving Private Ryan", "Raiders of the Lost Ark", "Rear Window", "Psycho", "Sunset Blvd.", "The Green Mile", "The Pianist", "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", "Gladiator", "Apocalypse Now", "North by Northwest", "Citizen Kane", "Vertigo", "Double Indemnity", "Braveheart", "To Kill a Mockingbird", "Lawrence of Arabia", "A Clockwork Orange", "Taxi Driver", "Singin' in the Rain", "Amadeus", "The Treasure of the Sierra Madre", "The Apartment", "The Third Man", "Some Like it Hot", "2001: A Space Odyssey", "Mr. Smith Goes to Washington", "Unforgiven", "On the Waterfront", "Raging Bull", "Chinatown", "The Bridge on the River Kwai", "Good Will Hunting", "It Happened One Night", "The Best Years of Our Lives", "Gone With the Wind", "The Maltese Falcon", "The Deer Hunter", "Fargo", "Network", "Butch Cassidy and the Sundance Kid", "The Grapes of Wrath", "Platoon", "Annie Hall", "Ben-Hur", "The Wizard of Oz", "Gandhi", "High Noon", "The Philadelphia Story", "Jaws", "Rocky", "The King's Speech", "A Streetcar Named Desire", "The Graduate", "All Quiet on the Western Front", "Patton", "The Exorcist", "Rain Man", "Doctor Zhivago", "Dances with Wolves", "The Sound of Music", "Midnight Cowboy", "The African Queen", "Stagecoach", "My Fair Lady", "E.T. the Extra-Terrestrial", "A Place in the Sun", "Mutiny on the Bounty", "The French Connection", "Rebel Without a Cause", "Yankee Doodle Dandy", "From Here to Eternity", "Nashville", "Wuthering Heights", "Shane", "Titanic", "Giant", "Close Encounters of the Third Kind", "West Side Story", "American Graffiti", "Terms of Endearment", "Tootsie", "An American in Paris", "Out of Africa"];

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

    li.onmouseenter = function(){
      li.innerHTML = '<h4 class="animated fadeIn">' + parsed.Title + '</h4>';
    };

    li.onmouseleave = function(){
      li.innerHTML = '<h4 class="animated fadeOut">' + parsed.Title + '</h4>';
    };

    li.addEventListener("click", function(){
      info.style.display="block";
      info.setAttribute("class", "animated fadeIn");

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

      var rating = document.getElementById("rating");
      rating.innerHTML = '<span>IMDb Rating: </span>' + parsed.imdbRating;

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
      info.setAttribute("class", "animated fadeIn");

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

      var rating = document.getElementById("rating");
      rating.innerHTML = '<span>IMDb Rating: </span>' + parsed.imdbRating;
    });

    xhr.send();
  };
};//end get_movie function

//get movie on search button click
button.addEventListener("click", function(){
  get_movie();
});

//get movie on press enter
input.addEventListener("keydown", function(event){
  if(event.keyCode === 13) {
    get_movie();
  }
});

function close_info_panel() {
  info.setAttribute("class", "animated fadeOut");
  setTimeout(function(){
    info.style.display="none";
  }, 1000);
};//end close_info_panel function

close_info.addEventListener("click", function(){
  close_info_panel();
});

logo.addEventListener("click", function(){
  close_info_panel();
});
