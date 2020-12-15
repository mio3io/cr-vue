// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
    el: '#app',
    data: {
        todos: [],
        options: [
          { value: -1, label: 'すべて'},
          { value: 0, label: '作業中'},
          { value: 1, label: '完了'}
        ],
        current: -1
    },
    methods: {
      doAdd: function(event, value){
        var comment = this.$refs.comment
        if(!comment.value.length){
          return
        }

        this.todos.push({
          id: todoStorage.uid++,
          comment: comment.value,
          state: 0
        })
        comment.value = ''
      },
      doChangeState: function(item){
        item.state = item.state ? 0 : 1
      },
      doRemove: function(item){
        var index = this.todos.indexOf(item)
        this.todos.splice(index,1)
      }
    },
    watch: {
      todos: {
        handler: function(todos) {
          todoStorage.save(todos)
        }
      },
      deep: true
    },
    computed: {
      computedTodos: function() {
        // データ current が -1 ならすべて
        // それ以外なら current と state が一致するものだけに絞り込む
        return this.todos.filter(function(el) {
          return this.current < 0 ? true : this.current === el.state
        }, this)
      }
    },
    created() {
      this.todos = todoStorage.fetch()
    }
})