// check off items by clicking
$("ul").on("click", "li", function() {
 $(this).toggleClass("completed");
});

// click on x to delete list item
$("ul").on("click", ".remove", function(event) {
  event.stopPropagation();
  $(this).closest('li').fadeOut(500, function() {
    $(this).remove();
  });
});

$("input[type='text'").keypress(function(event) {
  if(event.which === 13){
    //grabbing new todo text from input
    var todoText = $(this).val();
    $(this).val("");
    //create a new li and add to ul
    $("ul").append("<li><span class='remove'><i class='fa fa-trash' aria-hidden='true'></i></span><span class='edit'><i class='fa fa-pencil' aria-hidden='true'></i></span> " + todoText +"</li>");
  }
});

$(".fa-plus").click(function() {
  $("input[type='text'").fadeToggle();
});

// sort items on the list with a click and drag
$(function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});

$("ul").on('click', '.edit', function(event){
    event.stopPropagation();
    var $this = $(this).closest('li');
    var todo = $this.text();
    var $input = $('<input>').val(todo);
    $this.html($input);

    $input.keypress(function(event) {
      if(event.which === 13){
        //grabbing new todo text from input
        var newTodo = $(this).val();
        $this.html("<span class='remove'><i class='fa fa-trash' aria-hidden='true'></i></span><span class='edit'><i class='fa fa-pencil' aria-hidden='true'></i></span> " + newTodo);
        //create a new li and add to ul
        ;
      }
    });

    $input.focus();
});
