/////////////////////////////////////////////////////////////////////////////
function update() {

  /////////////////////////////////////////////////////////////////////////////
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  // Player overlap with enemies
  game.physics.arcade.overlap(player, Spikes, enemyKill, null, this);

  /////////////////////////////////////////////////////////////////////////////
  //  Reset the players velocity (movement)
  /////////////////////////////////////////////////////////////////////////////

  if (cursors.left.isDown) {
    //  Move to the left
    player.body.velocity.x = -250 * enemySpeedCount;

    player.animations.play('left');
    // player.angle = 180;
    player.angle = 90;


  } else if (cursors.right.isDown) {
    //  Move to the right
    player.body.velocity.x = 250 * enemySpeedCount;

    player.animations.play('right');
    // player.angle = 0;
    player.angle = 270;

  } else if (cursors.up.isDown) {
    //  Move up.
    player.body.velocity.y = -250 * enemySpeedCount;

    player.animations.play('up');
    player.angle = 180;

    // player.angle = 270;
  } else if (cursors.down.isDown) {
    //  Move down
    player.body.velocity.y = 250 * enemySpeedCount;

    player.animations.play('down');
    // player.angle = 90;
    player.angle = 0;

  } else {
    //  Stand still
    player.animations.stop();
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    player.frame = 4;
  }

  // Shows lives initially
  livesText.text = 'Lives: ' + lives;


  /////////////////////////////////////////////////////////////////////////////
  // 												    	Death
  /////////////////////////////////////////////////////////////////////////////
  //     Allows bug to kill player
}

function enemyKill(player, Spike) {
  if (lives !== 0) {
    //Kills player
    player.kill();

    if (player.kill()) {
      Spikes.forEach(function(Spike) {
        Spike.visible = false;
        Spike.kill();

      }, this);
    }
    dieEvent();
    this.game.paused = true;
    //Resets the player to initial position on death
    player.reset(300, 300);

    // reduces a life
    lives -= 1;
    livesText.text = 'Lives: ' + lives;

    // If The Player is killed the stars wipe
    if (player.kill()) {
      stars.forEach(function(star) {
        star.kill();
      }, this);
    }

    // Stars are now respawned randomly
    generateElementCollect(stars, "star", 1);
  } else

  //////////////////////////////////////////////////////////////////////////////		       			Terms for game over function
  ////////////////////////////////////////////////////////////////////////////

  if (lives === 0) {
    enemySpeedCount = 1;
    gameoverEvent();
    this.game.paused = true;
    player.kill();
    Spikes.forEach(function(Spike) {
      Spike.visible = false;
      Spike.kill();
    }, this);

    player.reset(300, 300);

    // Resets the score
    game.Scorer.resetScore();
    scoreText.text = 'Score: ' + game.Scorer.getScore();

    stars.forEach(function(star) {
      star.kill();
    }, this);

    enemyMultiplierCount = 1;

    generateElementCollect(stars, "star", 1);
    lives = 3;
    livesText.text = 'lives: ' + lives;

  }


  // Respawns the player (now visible again)
  player.revive();

  cursors.right.isDown = false;
  cursors.left.isDown = false;
  cursors.up.isDown = false;
  cursors.down.isDown = false;
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
}

////////////////////////////////////////////////////////////////////////////
//										Collecting Stars to win
////////////////////////////////////////////////////////////////////////////

// used to speed up enemies etc
var enemySpeedCount = 1;
// used to add enemy spawn count
var testEnemyMultiplierCount = 1;
var enemyMultiplierCount = 1;

function collectStar(player, star) {

  // Removes the star from the screen
  star.kill();
  //  Add and update the score
  game.Scorer.updateScore();
  storeScore();
  scoreText.text = 'score: ' + game.Scorer.getScore();
  generateElementCollect(stars, "star", 1);

  // used to speed up enemies etc
  enemySpeedCount += 0.01;
  // used to add enemy spawn count
  testEnemyMultiplierCount += 1;

  // if 15 stars collected spawn an extra enemy
  if (testEnemyMultiplierCount >= 25) {
    testEnemyMultiplierCount = 1;
    enemyMultiplierCount += 1;
  }


}

/////////////////////////////// START THE AJAX //////////////////////////

var storeScore = function(score) {
  // if (score <= score + 10) {
  $.ajax({
    url: "/highscores",
    method: "POST",
    dataType: "json",
    data: {
      highscore: {
        score: game.Scorer.getScore(),
        scoreMD5: md5(game.Scorer.getScore()),
        user_id: gon.user_id
      }
    },
    complete: function(jqXHR, textStatus) {
      console.log('Request complete', textStatus);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('Request error', textStatus, errorThrown);
    },
    success: function(data) {
      console.log('Request success');
      $('#highscore').html(data.score);
      console.log(data);
    }
  });
  // }
};
