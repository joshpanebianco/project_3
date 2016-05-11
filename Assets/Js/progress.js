var todoCount = parseInt( localStorage.getItem("todoCount") );

if ( todoCount !== todoCount ) {
  localStorage.setItem("todoCount", 0);
  todoCount = 0;
}

var currentCount = todoCount;

var addTodoToLocalStorage = function ( content ) {
  currentCount += 1;

  localStorage.setItem("todoCount", currentCount);
  localStorage.setItem("todo_" + currentCount, content);
};

var addTodo = function ( content, todoNumber ) {
  var $li = $("<li></li>").attr("id", "todoItem");

  $li.data("todoNumber", todoNumber);
  var $removeSpan = $("<span></span>").addClass("remove");
  var $removeITag = $("<i></i>").addClass("fa")
                                .addClass("fa-trash")
                                .attr("aria-hidden", "true");
  var $editSpan = $("<span></span>").addClass("edit");
  var $editITag = $("<i></i>").addClass("fa")
                              .addClass("fa-pencil")
                              .attr("aria-hidden", "true");

  $removeSpan.append( $removeITag );
  $editSpan.append( $editITag );

  $li.append( $removeSpan ).append( $editSpan ).append( " " + content );
  $("ul#sortable").append( $li );
};

var drawExistingTodos = function () {
  var currentNumberOfTodos = parseInt( localStorage.getItem("todoCount") );

  for (var i = 0; i < currentNumberOfTodos; i += 1) {
    var todoNumber = "todo_" + (i + 1);
    var contentOfTodo = localStorage.getItem( todoNumber );
    if ( contentOfTodo !== null ) {
      addTodo( contentOfTodo, i + 1 );
    }
  }
}

drawExistingTodos();



// var todoItems = localStorage.getItem("todoList") || [];
//
// localStorage.setItem("todoList", todoItem.text)

// check off items by clicking
$("ul").on("click", "li", function() {
 $(this).toggleClass("completed");
});

// click on x to delete list item
$("ul").on("click", ".remove", function(event) {
  event.stopPropagation();

  // Access the todo number, we then need to go into the localStorage
  var todoNumber = parseInt( $(this).closest("li").data("todoNumber") );
  localStorage.removeItem( "todo_" + todoNumber );

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
    addTodo( todoText );
    addTodoToLocalStorage( todoText );
  }
});

$(".fa-plus").click(function() {
  $("input[type='text'").fadeToggle();
});

// sort items on the list with a click and drag
$(document).ready(function() {
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
        var newTodo = $(this).val();
        var $li = $(this).parents().find("li");
        var todoNumber = $li.data("todoNumber");

        localStorage.setItem( "todo_" + todoNumber, newTodo );

        $li.remove();
        //grabbing new todo text from input
        addTodo( newTodo );
        // $this.html("<span class='remove'><i class='fa fa-trash' aria-hidden='true'></i></span><span class='edit'><i class='fa fa-pencil' aria-hidden='true'></i></span> " + newTodo);
        //create a new li and add to ul
        ;
      }
    });

    $input.focus();
});

// localStorage.setItem("todoItem", todoItem.text );

// var value = localStorage.getItem("todoItem");
// console.log(value);
