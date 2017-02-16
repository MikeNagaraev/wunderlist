export default function($scope, todosService) {
  this.scope = $scope;
  this.scope.todos = todosService.todos;
  this.scope.$watch('todos', function(newVal, oldVal) {
    this.scope.todos = newVal;
  }.bind(this), true);
  this.addTodo = function() {
    todosService.create({
      title: this.title,
      priority: this.priority
    })
    this.title = '';
    this.priority = '';
  }.bind(this);

  this.removeTodo = function(todo) {
    todosService.remove(todo);
  }.bind(this)
}
