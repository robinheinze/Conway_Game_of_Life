var Cell = {
  initialize: function(cellId) {
    this.cellId = cellId;
    this.state = false;
  },

  create: function(cellId) {
    var cell = Object.create(Cell);
    cell.initialize(cellId);
    cell.setNeighbors(cellId);
    return cell;
  },

  setNeighbors: function(cellId) {
    this.neighbors = [cellId - 31, cellId - 30, cellId - 29,
                      cellId - 1, cellId + 1,
                      cellId + 31, cellId + 30, cellId + 29]
  },

  // findCellState: function(X, Y) {
  //   var searchResult;
  //   World.population.forEach(function(currentCell) {
  //     if (currentCell.coordinateString === X+","+Y) {
  //       searchResult = currentCell;
  //     }
  //   });
  //   return searchResult.state;
  // },

  // find: function(X, Y) {
  //   var searchResult;
  //   World.population.forEach(function(currentCell) {
  //     if (currentCell.coordinateString === X+","+Y) {
  //       searchResult = currentCell;
  //     }
  //   });
  //   return searchResult;
  // },

  liveNeighbors: function() {
    var counter = 0;
    for (var i = 0; i < this.neighbors.length; i++) {
      var currentNeighbor = World.population[this.neighbors[i]];
      if (currentNeighbor === undefined) {
        i++;
      } else if (currentNeighbor.state === true) {
        counter+=1;
      }
    }
    return counter;
  },

  setFutureState: function() {
    var numAlive = this.liveNeighbors();
    if (numAlive < 2 && this.state === true) {
      this.futureState = false;
    } else if ((numAlive === 2 || numAlive === 3) && this.state === true) {
      this.futureState = true;
    } else if (numAlive > 3 && this.state === true) {
      this.futureState = false;
    } else if (this.state === false && numAlive === 3) {
      this.futureState = true;
    } else {
      this.futureState = this.state;
    }
  },

  // if (liveCount < 2 && this.alive === true){
  //     this.future = false;
  //   } else if (this.alive === true && liveCount === 2){
  //     this.future = true;
  //   } else if (this.alive === true && liveCount === 3){
  //     this.future = true;
  //   } else if (liveCount > 3 && this.alive === true){
  //     this.future = false;
  //   } else if (this.alive === false && liveCount === 3){
  //     this.future = true;
  //   } else if ((this.cellId > 9700 || this.cellId < 301) && this.alive === true){
  //     this.future = false;
  //   }

  toggleState: function() {
    this.state = !this.state;
  },

  makeDeadorAlive: function() {
    this.state = this.futureState;
  }

}

var World = {
  population: [],
  populate: function() {
    for (var i = 0; i < 900; i++) {
      World.population.push(Cell.create(i));  
    }
  }
}


$(document).ready(function() {
  World.populate();

  $("img#gun").click(function() {
    var guns = [151, 152, 181, 182, 98, 99, 127, 156, 186, 216, 247, 278, 279, 190, 131, 162, 192, 222, 193, 106, 107, 136, 137, 166, 167, 78, 198, 50, 80, 200, 230, 118, 117, 148, 147, 251];
    guns.forEach(function(gun){
      World.population[gun].state = true;
      $("td#"+gun).toggleClass('black white');
    })
  })

  $("img#glider").click(function() {
    var gliders = [2,33,63,61,62];
    gliders.forEach(function(glider) {
      World.population[glider].state = true;
      $("td#"+glider).toggleClass('black white');
    });  
  });

  for(var i = 0; i < 30; i++) {
    $("table#world-table").append("<tr></tr>")
    for(var j = 0; j < 30; j++) {
      $("tr").last().append("<td id ='" + ((i*30)+j) + "' class = 'white'></td>")
    }
  }

  $('table#world-table td').click(function() {
    var cellId = $(this).attr("id");
    World.population[cellId].toggleState();
    $(this).toggleClass("black white");
  });

  $('button#run-button').click(function() {
    var interval = setInterval(function() {
      World.population.forEach(function(cell) {
        cell.setFutureState();
      });

      World.population.forEach(function(cell) {
        
        if (cell.futureState === true) {
          $("td#"+cell.cellId).addClass('black');
          $("td#"+cell.cellId).removeClass('white');
          cell.state = true;
        } else if (cell.futureState === false) {
          $("td#"+cell.cellId).removeClass('black');
          $("td#"+cell.cellId).addClass('white');
          cell.state = false;
        } 
        //cell.makeDeadorAlive();
      });

    }, 100);

    $("button#stop-button").click(function() {
        clearInterval(interval);
    });

  });





  


});
