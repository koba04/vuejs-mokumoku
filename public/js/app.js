var socket = io();


var Login = Vue.extend({
  data: {
    id: "hoge",
    password: "foo",
  },
  methods: {
    login: function() {
      socket.emit("login", this.id, this.password);
    }
  }
});

var Chat = Vue.extend({
  data: {
    messages: [],
    message: ""
  },
  ready: function() {
    var that = this;
    socket.on("chat:message", function (message) {
      that.messages.push(message);
    });
  },
  methods: {
    say: function() {
      if (this.message) {
        socket.emit("chat:message", this.message);
      }
    }
  }

});

new Vue({
  el: "#main",
  data: {
    user: null,
    message: ""
  },
  ready: function() {
    var that = this;
    socket.on("login:success", function(user) {
      that.user = user;
      that.message = "";
    });
    socket.on("login:fail", function(message) {
      that.message = message
    });
  },
  components: {
    login: Login,
    chat: Chat
  }
});

