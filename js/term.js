---
---
var p = "<div style=\"clear:both\"></div>guest@zmbush.com $ "
var text = '<br /><br /><br />Type `help` for a list of commands.<br />' + p
var command = ""
var cursor = "_"
var accepting_input = true;
$(function(){
  $(document).keypress(function(e){
    if(accepting_input){
      switch(e.which){
        case 8:
          return false;
        case 13:
          text += command;
          text += '<br />';
          accepting_input = false;
          processCommand(command);
          $('#term').html(text + '...');
          return false;
        default:
          command += String.fromCharCode(e.which);
          $('#term').html(text + command + cursor);
          return false;
      }
    }
    return true;
  });
  $(document).keydown(function(e){
    if(accepting_input){
      if(e.which == 8){
        if(command.length > 0){
          command = command.substring(0, command.length - 1)
          $('#term').html(text + command + cursor);
        }
        return false;
      }
    }
    return true;
  });
  $('#term').html(text);
});

function processCommand(cin){
  switch(cin){
    case '':
      newPrompt();
      break;
    case 'linkedin':
      window.location = "http://www.linkedin.com/pub/zachary-bush/1a/a78/671";
      break;
    case 'github':
      window.location = "https://github.com/zipcodeman";
      break;
    case 'static':
      window.location = '/static/';
      break;
    case 'exit':
      window.location = 'http://www.google.com/';
      break;
    default:
      $.ajax({
        url: 'output/' + cin,
        dataType: "html",
        error: function(){
          displayOutput(cin + ": command not found");
        },
        success: function(output){
          displayOutput(output);
        }
      });
  }
}

function displayOutput(output){
  text += output;
  newPrompt()
}

function newPrompt(){
  text += "<br />"
  text += p;
  accepting_input = true;
  command = '';
  $('#term').html(text);
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
}
