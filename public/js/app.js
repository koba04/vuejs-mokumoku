var socket = io();

vm = new Vue({
  el: "#chat",
  data: {
    messages: [],
    input: ""
  },
  methods: {
    post: function(e) {
      socket.emit('chat message', this.input);
      e.preventDefault();
    }
  }
});

socket.on('chat message', function(msg){
  vm.messages.push(msg);
});


