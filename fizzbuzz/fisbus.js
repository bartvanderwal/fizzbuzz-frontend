let synth = window.speechSynthesis

var inputForm = document.querySelector('#formulier')
var inputTxt = document.querySelector('.huidigeWaarde')

let url = new URLSearchParams(document.location.search)
inputTxt.value = url.get('say') || 'Hallo, Wereld'

function speak(input) {
  let dutchVoice = synth.getVoices().find(voice => voice.lang==='nl-NL')
  let utterThis = new SpeechSynthesisUtterance(input)
  utterThis.onend = function() {
    console.log('SpeechSynthesisUtterance.onend')
  }
  utterThis.onerror = function() {
      console.error('SpeechSynthesisUtterance.onerror')
  }
  utterThis.voice = dutchVoice
  if (synth.speaking) {
    console.error('speechSynthesis.speaking')
    return
  }
  if (input !== '') {
    synth.speak(utterThis)
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault()
  let spreektekst = inputTxt.value
  speak(spreektekst)
  let url = new URL(window.location);
  url.searchParams.set('say', spreektekst);
  window.history.replaceState({}, '', url);
  // url.set('say', spreektekst)
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var kleuren = [
    { htmlKleur: "crimson", naam: "karmozijnrood"},
    { htmlKleur: "indigo", naam: "indigo"},
]
var colors = kleuren.map(k => k.htmlKleur);


var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'nl-NL';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('#output');
var luisterStatus = document.querySelector('#luisterStatus');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
kleuren.forEach(function(kleur, index) {
  console.log(kleur, index);
  colorHTML += '<span style="background-color:' + kleur.htmlKleur + ';"> ' + kleur.naam + ' </span>';
});
hints.innerHTML = 'Klik en zeg een kleur ' + colorHTML + '.';

document.body.onclick = function() {
  recognition.start();
  luisterStatus.textContent = "Ik luister..."
  console.log('Klaar om een woord te horen');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var gehoordeWoord = event.results[0][0].transcript;
  diagnostic.textContent = 'Gehoorde woord: ' + gehoordeWoord + '.';

  if (kleurObject) {
    let kleur = kleurObject.htmlKleur;
    diagnostic.textContent += '(gevonden kleur in lijst: ' + kleur + '.';
    bg.style.backgroundColor = kleur;
    console.log('Vertrouwen: ' + event.results[0][0].confidence);
  } else {
    diagnostic.textContent = "Ik herkende die kleur niet.";
  }
}

recognition.onspeechend = function() {
  recognition.stop();
  luisterStatus.textContent = "Ik luister niet"
}

recognition.onnomatch = function() {
  diagnostic.textContent = "Ik herkende die kleur niet.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
