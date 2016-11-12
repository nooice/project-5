!function(){
"use strict";
    
    $('form').submit(function (evt){
        evt.preventDefault();
        var counter = 0;
        var movieHTML = '';
        var movieName = $('#search').val();
        var movieYear = $('#year').val();
        var movieAPI = "http://www.omdbapi.com/?";
        var movieFormat = {
            s: movieName,
            y: movieYear,
            r: "json"
        };
        
        /*if title search field is empty display error*/
        if (movieName === ''){
            movieHTML = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>Please enter a movie title.</li>";
            $('#movies').html(movieHTML);
            return;
        }
        
        /*json function when data is returned from server*/
        function showMovies(data) {
            var movieError = '<i class="material-icons poster-placeholder">crop_original</i></div>';
            /*cycle through each item*/
            $.each(data.Search,function(i,movie) {
                movieHTML += '<li><div class="poster-wrap">';
                /*if movie src isnt provided, display error. else add the movie img src*/
                if(movie.Poster === "N/A"){
                    movieHTML += movieError;
                } else{
                    movieHTML += '<img class="movie-poster" src="' + movie.Poster + '"></div>';   
                }
                movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
                movieHTML += '<span class="movie-year">' + movie.Year + '</span></li>'; 
                counter++;
            });
            /*counter used to detect no results*/
            if (counter === 0){
                /*if no year was provided, only show the title. else show the movie title and year in the error*/
                if(movieYear === ''){
                    movieHTML = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match " + movieName + ".</li>";
                }else {
                    movieHTML = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>No movies found that match " + movieName + " in " + movieYear + "</li>";
                }
                
            }
            /*posting the items into the html*/
            $('#movies').html(movieHTML);
            /*checks for an img with permission errors and replaces it with the same img as a N/A*/
            $("img").error(function(){
                $(this).replaceWith(movieError);
            });
        }
        /*submit json*/
        $.getJSON(movieAPI, movieFormat, showMovies);
    });
    
    
}();