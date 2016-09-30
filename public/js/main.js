/*-- Tells the page to 'listen' to the search button and favorite button --*/
document.getElementById('search').addEventListener('click', search, false);
document.getElementById('reload_favorites').addEventListener('click', reload_favorites, false);

/*-- Here we request the API, and tie it to our search field  --*/
function search() {
    
  var xhr = new XMLHttpRequest();
  var uri = encodeURI('http://www.omdbapi.com/?S='+ document.getElementById('search_value').value + '&y=&plot=short&r=json')

  xhr.open('GET', uri, true);
    
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var json_parse = JSON.parse(xhr.response)
      search_works(json_parse)
    }
  }

  xhr.send(null);
    
}

/*-- If search_works works, then this function fires:  --*/
function search_works(json_parse) {
  results_parse = document.getElementById('results_container').getElementsByTagName('tbody')[0]
  
  /*-- If there were no results, let the user know --*/
  if (json_parse.Search === undefined) {
    results_parse.innerHTML = '<td colspan="4" class="no_results">There are no movies with a name like that! <h1>¯\\_(ツ)_/¯</h1></td>'
    return ;
  } else {
    results_parse.innerHTML = ''
  }

  /*-- this creates the search table --*/
  for (i = 0; i < json_parse.Search.length; i++) {
    results_parse.innerHTML += 
        '<tr>' + 
            '<td><span class="btn_favorite" data-name="' + json_parse.Search[i].Title + '" data-oid="' + json_parse.Search[i].imdbID + '" aria-hidden="true"><svg height="25" width="23" class="star rating" data-rating="2"><polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/></svg></span></td>' +
            '<td><a class="btn_details" href="#", data-imdbid="' + json_parse.Search[i].imdbID + '">' + json_parse.Search[i].Title + '</a></td>' +
            '<td>' + json_parse.Search[i].Year + '</td>' +
        '</tr>'
  }

  /*-- sets up link to get details --*/
  for (var i = 0, details_results = document.getElementsByClassName('btn_details'); i < details_results.length; i++) {
    details_results[i].addEventListener('click', detail_action, false);
  }
    
  /*-- and then favorites --*/
  for (var i = 0, details_results = document.getElementsByClassName('btn_favorite'); i < details_results.length; i++) {
    details_results[i].addEventListener('click', btn_favorite, false);
  }
    
    
  /*-- Just for fun, an animation for the favorite buttons --*/
  document.getElementsByClassName("btn_favorite")[0].addEventListener('click', favorite_animate, false);
    
  /*-- Favorite Animation --*/
  function favorite_animate() {
     this.className = "btn_favorite starred";
  }
    
}

/*-- get details from OMDB API --*/ 
function detail_action() {
    
  var xhr = new XMLHttpRequest();
  var uri = encodeURI('http://www.omdbapi.com/?i='+ this.attributes['data-imdbid'].value + '&y=&plot=long&r=json')

  xhr.open('GET', uri, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      detail_result(JSON.parse(xhr.response))
    }
  }

  xhr.send(null);
    
}

/*-- When we have a detail result, this displays it in HTML --*/
function detail_result(json_parse) {

 document.getElementsByClassName('panel')[0].className = "panel panel-default show"
 document.getElementsByClassName('panel-heading')[0].innerHTML = '<strong>' + json_parse.Title + '</strong><br/>(' + json_parse.Released + ')'
 document.getElementsByClassName('panel-body')[0].innerHTML    = '<div class="detail_holder">' +
     '<div><strong>Genre:</strong>&nbsp;&nbsp;' + json_parse.Genre + '</div>' +
     '<div><strong>Starring:</strong>&nbsp;&nbsp;' + json_parse.Actors + '</div>' +
     '<div>' + json_parse.Plot + '</div>' +
   '</div>'
 
 
 
}

/*-- function for handling how a movie becomes a 'favorite' --*/
function btn_favorite() {
  var xhr = new XMLHttpRequest();
  var uri = encodeURI('/favorites')

  xhr.open('POST', uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function() {
      
    if (xhr.readyState == 4) {
      var json_parse = JSON.parse(xhr.response)
      reload_favorites_works(json_parse)
    }
      
  }

  xhr.send(JSON.stringify({
    name: this.attributes['data-name'].value,
    oid: this.attributes['data-oid'].value
  }));

}




/*-- Reload list of favorites with new additions --*/
function reload_favorites() {
  var xhr = new XMLHttpRequest();
  var uri = encodeURI('/favorites')

  xhr.open('GET', uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      reload_favorites_works(JSON.parse(xhr.response))
    }
  }
  xhr.send(null);
}

/*-- Parse our favorites into a list --*/
function reload_favorites_works(json_parse) {
  results_parse = document.getElementById('favorites').getElementsByClassName('list-group')[0]
  if (json_parse === undefined || json_parse.length == 0) {
    results_parse.innerHTML = '<div class="text-center">You don\'t seem to like very much <h1>ಠ︵ಠ</h1></div>'
  } else {
    for (i = 0, results_parse.innerHTML = ''; i < json_parse.length; i++) {
      results_parse.innerHTML += '<li class="list-group-item"><a class="detail" href="#", data-imdbid="' + json_parse[i].oid + '">' + json_parse[i].name + '</a></li>' +
        '<li></li>'
    }
  }

  /*-- Go ahead and bring up the favorites list when adding new favorites, if its not already up --*/
  document.getElementById('favorites').className = "table-responsive show"

  /*-- Adding in a listener so that we can display details on favorited movies too --*/
  for (var i = 0, details_results = document.getElementsByClassName('detail'); i < details_results.length; i++) {
    details_results[i].addEventListener('click', detail_action, false);
  }
}


