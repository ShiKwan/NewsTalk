$(function () {
  let id = ''
  $('.hypNewNote').click(function () {
    console.log($(this).attr('data-id'))
    $('.divPreviousNotes').empty()
    id = $(this).attr('data-id')
    console.log(id)
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
                <button type="button" class="close btnDeleteNote" data-id='${value._id}' aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
          })
        }else {
          $('.divPreviousNotes').append('There is no note for this headline yet')
        }
      })
  })

  $('.btnSaveNote').click(function () {
    console.log('here')
    console.log('in btnSaveNote, id is ' + id)
    let objNewNote = {
      body: $('.txNotes').val().trim(),
      created: Date.now()
    }
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/headlines/' + id,
      data: objNewNote
    })
      .then(function (data) {
        console.log(data)
        $('.divPreviousNotes').empty()
      })
  })
$(document).on('click', '.btnDeleteNote', function(){

    console.log('delete note button clicked')
    console.log($(this).attr('data-id'))
    $.ajax({
      type: 'DELETE',
      dataType: 'json',
      url: '/note/' + $(this).attr('data-id')
    })
      .then(function (data) {
        console.log("done");
      })
  })
})
