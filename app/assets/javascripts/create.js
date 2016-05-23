var roundStarted = false;

function initialLoad() {

  // INTRO TEXT
  welcomeEvent();
  // GAME STARTS PAUSED
  this.game.paused = true;

  generateSpikes();
}

function create() {

  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);


  /////////////////////////////////////////////////////////////////////////////
  //												     PAUSE STATE
  /////////////////////////////////////////////////////////////////////////////

  key1 = game.input.keyboard.addKey(Phaser.Keyboard.P);
  key1.onDown.add(pauseGame, this);


  /////////////////////////////////////////////////////////////////////////////
  //												     PLAYER
  /////////////////////////////////////////////////////////////////////////////

  player = game.add.sprite(300, 300, 'player');
  player.scale.setTo(1, 1);

  player.anchor.setTo(0.5, 0.5);

  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  //  Player physics properties. Give the little guy a slight bounce.
  // player.body.bounce.y = 0.2;
  // player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  // player.animations.add('left', [0, 1, 2, 3], 10, true);
  // player.animations.add('right', [5, 6, 7, 8], 10, true);

  player.animations.add('left', [0, 1, ], 300, true);
  player.animations.add('right', [0, 1, ], 300, true);
  player.animations.add('up', [0, 1, ], 300, true);
  player.animations.add('down', [0, 1, ], 300, true);


  /////////////////////////////////////////////////////////////////////////////
  // 													    Points
  /////////////////////////////////////////////////////////////////////////////

  //  Finally some stars to collect
  stars = game.add.group();

  //  We will enable physics for any star that is created in this group
  stars.enableBody = true;
  generateElementCollect(stars, "star", 1);


  /////////////////////////////////////////////////////////////////////////////
  //															ENEMIES
  /////////////////////////////////////////////////////////////////////////////
  if (!roundStarted) {
    initialLoad();
    roundStarted = true;
  }

  game.time.events.loop(Phaser.Timer.SECOND * 3, generateSpikes, this);


  /////////////////////////////////////////////////////////////////////////////
  // 													  SCORE, LIVES & CONTROLS
  /////////////////////////////////////////////////////////////////////////////

  scoreText = game.add.text(30, 16, 'Score: ', {
    fontSize: '32px',
    fill: 'salmon'
  });
  scoreText.alpha = 0.7;

  livesText = game.add.text(470, 16, 'Lives: ', {
    fontSize: '32px',
    fill: 'salmon'
  });
  livesText.alpha = 0.7;


  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();
}
