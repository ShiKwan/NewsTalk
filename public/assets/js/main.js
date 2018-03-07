$(function () {
  if (sessionStorage.getItem('alert')) {
    if (sessionStorage.getItem('danger')) {
      $('.divAlert').addClass('alert-danger').removeClass('alert-success').show()
    }else {
      $('.divAlert').addClass('alert-success').removeClass('alert-danger').show()
    }

    $('.divAlert').html(sessionStorage.getItem('alert'))
    sessionStorage.clear()
  }

  function getNotes (id) {
    $('.divPreviousNotes').empty()
    $.ajax({
      type: 'GET',
      url: '/headline/' + id
    })
      .then(function (data) {
        console.log(data[0])
        console.log('note:')
        console.log(data[0].note[0])
        if (data[0].note.length > 0) {
          $.each(data[0].note, function (index, value) {
            $('.divPreviousNotes').append(`
            <div>
                ${index+1}. ${value.body}
                <button type="button" class="close btnDeleteNote" data-id='${value._id}' data-dismiss='modal' aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
          })
        }else {
          $('.divPreviousNotes').append('There is no note for this headline yet')
        }
      })
  }
  let id = ''
  $('.hypNewNote').click(function () {
    console.log($(this).attr('data-id'))

    id = $(this).attr('data-id')
    console.log(id)
    getNotes(id)
  })

  $('.btnSaveNote').click(function () {
    console.log('here')
    console.log('in btnSaveNote, id is ' + id)
    if ($('.txNotes ').val()) {
      let objNewNote = {
        body: $('.txNotes').val().trim()
      }
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/headlines/' + id,
        data: objNewNote
      })
        .then(function (data) {
          console.log(data)
          getNotes(id)
          $('.txNotes').empty()
          sessionStorage.setItem('alert', 'Note added successfully!')
          $('.divAlertNote').empty().removeClass('alert-danger').hide()
          $('.txNotes ').empty()
          location.reload()
        })
    }else {
      $('.divAlertNote').addClass('alert-danger').show()
      $('.divAlertNote').html('Note cannot be empty!')
    }
  })
  $(document).on('click', '.btnDeleteNote', function () {
    console.log('delete note button clicked')
    console.log($(this).attr('data-id'))
    $.ajax({
      type: 'DELETE',
      url: '/note/' + $(this).attr('data-id')
    })
      .then(function (data) {
        console.log('note deleleted')
        console.log(data)
        getNotes(id)
        sessionStorage.setItem('alert', 'Note deleted successfully!')
        location.reload()
      })
  })

  $('.hypLikeNote').click(function () {
      
    sessionStorage.setItem('alert', 'Note saved successfully!')
  })

  $('.hypScrape').click(function () {
    sessionStorage.setItem('alert', 'Headlines scraped successfully!')
  })
})
