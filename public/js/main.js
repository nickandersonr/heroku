/*-- Tells the page to 'listen' to the search button --*/
document.getElementById('search').addEventListener('click', search, false);

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
    results_parse.innerHTML = '<td colspan="4" class="no_results">There are no movies with names like that! <h1>¯\\_(ツ)_/¯</h1></td>'
    return ;
  } else {
    results_parse.innerHTML = ''
  }

  /*-- this creates the search table --*/
  for (i = 0; i < json_parse.Search.length; i++) {
    results_parse.innerHTML += 
        '<tr>' + 
            '<td><a class="btn_details" href="#", data-imdbid="' + json_parse.Search[i].imdbID + '">' + json_parse.Search[i].Title + '</a></td>' +
            '<td>' + json_parse.Search[i].Year + '</td>'
        '</tr>'
  }

  /*-- sets up link to get details --*/
  for (var i = 0, details_results = document.getElementsByClassName('btn_details'); i < details_results.length; i++) {
    details_results[i].addEventListener('click', detail_action, false);
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
  document.getElementsByClassName('panel-heading')[0].innerHTML = '&nbsp;&nbsp;<strong>' + json_parse.Title + '</strong>&nbsp;&nbsp;(' + json_parse.Released + ')'
  document.getElementsByClassName('panel-body')[0].innerHTML    = '<div class="detail_holder">' +
      '<div><strong>Genre:</strong>&nbsp;&nbsp;' + json_parse.Genre + '</div>' +
      '<div><strong>Starring:</strong>&nbsp;&nbsp;' + json_parse.Actors + '</div>' +
      '<div>' + json_parse.Plot + '</div>' +
    '</div>'
  
}




