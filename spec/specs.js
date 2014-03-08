beforeEach(function() {
  World.population = [];
});

describe('Cell', function() {
  describe('initialize', function() {
    it('sets the coordinate string', function() {
      var testCell = Object.create(Cell);
      testCell.initialize(3,6);
      testCell.coordinateString.should.equal("3,6");
    });
  });

  describe('create', function() {
    it('creates a cell object', function() {
      var testCell = Cell.create();
      Cell.isPrototypeOf(testCell).should.equal(true);
    });
    it('initializes the cell object', function() {
      var testCell = Cell.create(3,6);
      testCell.coordinateString.should.equal("3,6");
    });
    it('sets the neighbor array of the cell object', function() {
      var testCell = Cell.create(3,6);
      testCell.neighbors.length.should.equal(8);
    });
  });

  describe('setNeighbors', function() {
    it('creates a neighbor array with 8 elements', function() {
      var testCell = Object.create(Cell);
      testCell.setNeighbors(3,6);
      testCell.neighbors.length.should.equal(8);
    });
    it('creates a neightbor array where the first element should be (x-1,y-1)', function() {
      var testCell = Object.create(Cell);
      testCell.setNeighbors(3,6);
      testCell.neighbors[0].should.eql([2,5]);
    });
  });

  describe('findCellState', function() {
    it('returns true if the indicated Cell is alive', function() {
      World.populate(30);
      var testCell = World.population[38];
      var testXcoor = testCell.Xcoordinate;
      var testYcoor = testCell.Ycoordinate;
      testCell.state = true;
      Cell.findCellState(testXcoor, testYcoor).should.equal(true);
    });
  });
  describe('find', function() {
    it('returns the cell object with the given coordinates', function() {
      World.populate(30);
      var testCell = World.population[38];
      var testXcoor = testCell.Xcoordinate;
      var testYcoor = testCell.Ycoordinate;
      Cell.find(testXcoor, testYcoor).coordinateString.should.equal(testXcoor+","+testYcoor);
    });
  });
  describe('liveNeighbors', function() {
    it('returns the number of live neighbors a cell has', function() {
      World.populate(30)
      var testCell = World.population[53];
      World.population[23].state = true;
      testCell.liveNeighbors().should.equal(1);
    });
  });
  describe('setfutureState', function() {
    it('returns true if a cell has 2 live neighbors', function() {
      World.populate(30)
      var testCell = World.population[53];
      World.population[23].state = true;
      World.population[24].state = true;
      World.population[54].state = true;
      testCell.setFutureState();
      testCell.futureState.should.equal(true);
      testCell.state.should.equal(false);
    });
  });
});

describe('World', function() {
  describe('populate', function() {
    it('creates a population array with 900 cells', function() {
      World.populate(30);
      World.population.length.should.equal(900)
    });
  });
  describe('iterate', function() {
    it('changes every cell in the population to its future state', function() {
      World.populate(30)
      var testCell = World.population[53];
      // World.population[23].state = true;
      // World.population[24].state = true;
      World.population[54].state = true;
      World.iterate();
      testCell.state.should.equal(true);
    });
  });
});
