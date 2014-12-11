(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.$alert = $('.alert');

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    this.$el.on('click', 'div.cell', (function (event) {
      var $square = $(event.currentTarget);
      this.makeMove($square);
    }).bind(this));

    this.$el.find('button').on('click', (function (event) {
      window.location.reload();
    }));
  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.data("pos");
    var currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      this.$alert.addClass('alert-danger');
      this.$alert.html('Invalid Move!');

      setTimeout(function() {
        this.$alert.removeClass('alert-danger');
      }.bind(this), 2000);

      return;
    }

    $square.addClass("player-" + currentPlayer);

    if (this.game.isOver()) {
      this.$el.off('click');

      var winner = this.game.winner();
      if (winner) {
        this.$alert.addClass('alert-success');
        this.$alert.html(winner + ' is the winner!');
      } else {
        this.$alert.addClass('alert-info');
        this.$alert.html('Draw!');
      }
    }
  };

  View.prototype.setupBoard = function () {
    for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
      var $row = $('<div class="row"></div>');

      for (var colIdx = 0; colIdx < 3; colIdx++) {
        var $li = $('<div class="cell">');
        $li.data("pos", [rowIdx, colIdx]);

        $row.append($li);
      }

      this.$el.find(".board").append($row);
    }
  };
})();
