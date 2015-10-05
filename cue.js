/*
 * Dit is een JavaScript-kladblok.
 *
 * Voer wat JavaScript in en klik met de rechtermuisknop of kies in het menu Uitvoeren:
 * 1. Uitvoeren om de geselecteerde tekst te evalueren (Cmd-R),
 * 2. Inspecteren om een Object Inspector op het resultaat te tonen (Cmd-I), of
 * 3. Weergeven om het resultaat in een opmerking na de selectie in te voeren. (Cmd-L)
 */
function main(){
  var description = document.getElementById('eow-description');
  var links = description.getElementsByTagName('a');
  var current_video = document.URL;
  var title = document.title.split('-');
  var artist = title[0].trim();

  var cue = {'performer': artist,      
             'title': title[1].replace(' ', ''),
             'file' : '',
             'tracks' : [],
            };

  for (i = 0; i < links.length ; i++) {
    if (links[i].href == current_video + '#') {
      var name, index;
      index = i + 1;
      if (links[i].nextSibling !== null && links[i].nextSibling.data){
        name = links[i].nextSibling.data;
      }else {
        console.log('previous');
        name = links[i].previousSibling.data;
      }
      name = name.trim().replace(/[\d*\"]/g,'').trim();
      var time = links[i].childNodes[0].data;
      cue.tracks.push({'index': index,
                       'title': name,
                       'performer': artist,
                       'time': time + ':00'})

    }
  }
  return cue;
}

function create_cue_text(cue){
  cue_text = 'PERFORMER "' + cue.performer + '" \n' +
             'TITLE "' + cue.title + '" \n' +
             'FILE "' + cue.file + '" \n';
  for (i=0; i<cue.tracks.length; i++){
    var track = cue.tracks[i];
    cue_text = cue_text.concat('\t TRACK ' + track.index + ' AUDIO \n');
    cue_text = cue_text.concat('\t\t TITLE "' + track.title + '"\n');
    cue_text = cue_text.concat('\t\t PERFORMER "' + track.performer +'"\n');
    cue_text = cue_text.concat('\t\t INDEX 01 ' + track.time + ':00 \n');
  }
  return cue_text;
}
var cue = main();
var cue_text = create_cue_text(cue);
console.log(cue_text);
var link = document.createElement('a');
link.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(cue_text);
link.innerHTML = 'Download the cue file here' ;
description.appendChild(link);
console.log(cue);

/*
Exception: TypeError: cue.TRACKS is undefined
main@Scratchpad/1:34:7
@Scratchpad/1:57:11
*/
/*
Exception: TypeError: cue.concat is not a function
create_cue_text@Scratchpad/1:50:16
@Scratchpad/1:58:16
*/