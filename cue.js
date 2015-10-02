/*
 * Dit is een JavaScript-kladblok.
 *
 * Voer wat JavaScript in en klik met de rechtermuisknop of kies in het menu Uitvoeren:
 * 1. Uitvoeren om de geselecteerde tekst te evalueren (Cmd-R),
 * 2. Inspecteren om een Object Inspector op het resultaat te tonen (Cmd-I), of
 * 3. Weergeven om het resultaat in een opmerking na de selectie in te voeren. (Cmd-L)
 */

var description = document.getElementById('eow-description');
var links = description.getElementsByTagName('a');
var current_video = document.URL;
var title = document.title.split('-');
var artist = title[0].trim();
console.log(current_video);
var cue = 'PERFORMER ' + artist + '\n' +
           'TITLE ' + title[1].replace(' ', '') + '\n' +
           'FILE ' + '' + '\n';

for (i = 0; i < links.length ; i++) {
  if (links[i].href == current_video + '#') {
    var index = i + 1;
    var name = links[i].nextSibling.data;
    name = name.trim().replace(/\d*/,'').trim();
    var time = links[i].childNodes[0].data;
    cue = cue.concat('\t TRACK O' + index + ' AUDIO \n');
    cue = cue.concat('\t\t TITLE "' + name + '"\n');
    cue = cue.concat('\t\t PERFORMER "' + artist +'"\n');
    cue = cue.concat('\t\t INDEX 01 ' + time + ':00 \n');
  }
}
console.log(cue);