// //
// var storeScore = function(score) {
//
// $.ajax({
//     url: "/highscores",
//     method: "POST",
//     dataType: "json",
//     data: {
//       highscore: {
//         score: score,
//         user_id: gon.user_id
//       }
//     },
//     complete: function(jqXHR, textStatus) {
//       console.log('Request complete', textStatus);
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//       console.error('Request error', textStatus, errorThrown);
//     },
//     success: function(data){
//       console.log('Request success');
//      $('#highscore').html(data.score);
//       console.log(data);
//     }
//   });
// };
