let movies;

    $.get('http://localhost:3000/posts', data => {
        movies = data
    }).then(() => movieList ())


    const movieList  = () => {
        $('#userInput').empty();
        movies.forEach( movie => {
            $('#userInput').append(
                `<div id="movie${movie.id}" class="info-box"> 
               Movie: ${movie.movie}, Director: ${movie.director}, Id: ${movie.id}, Review: ${movie.review}</div>`
            )

            $(`#movie${movie.id}`).click(() => rmv(movie.id))
        })
    };

    const rmv = (id) => {
        $.ajax({
            url: `http://localhost:3000/posts/${id}`,

            type: 'DELETE',

            success: function() {
                movieList ()
            }
        })
    }

    
    $('#collection').submit((x) =>{
        x.preventDefault();
        const filmInfo = {
            movie: $('#movie').val(),

            director: $('#director').val(),

            review: $('#review').val()
        };
        $.post('http://localhost:3000/posts', 
                filmInfo,
                (data) => { console.log(data)
                });

        $('#collection').reset();
        movieList ();
    });





    $('#updateCollection').submit((x) => {
        x.preventDefault();
        const filmInfo = {
            movie: $('#updateMovie').val(),

            director: $('#updateDirector').val(),

            review: $('#updateReview').val(),
            
            id: $('#updateId').val()
        }




        $.ajax({
            url: `http://localhost:3000/posts/${filmInfo.id}`,

            type: 'PUT',

            contentType: 'application/json',

            data: JSON.stringify(filmInfo)
        }).then(() => movieList ());

        $('#collection').reset();
    })

