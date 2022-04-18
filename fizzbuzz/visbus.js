let huidigeRonde = 1;
let aantalFouten = 0;
let isComputerAanDeBeurt = false;

let inputForm = document.querySelector('#formulier')
let naamVeld = document.getElementById('naam')
let huidigeRondeVeld = document.getElementById('huidigeRonde')
let aanDeBeurtVeld = document.getElementById('aanDeBeurt')
let aantalFoutenVeld = document.getElementById('aantalFouten')
let spreekVeld = document.getElementById('spreek')
let resetButton = document.getElementById('reset')

let synth = window.speechSynthesis

const spreek = (input, callbackOnEnd) => {
  if (!input || input !== '') {
    console.log('Error! Poging lege tekst uit te spreken')
  }
  console.log("Spreek: " + input)
  spreekVeld.textContent = input
  let inputUtterance = new SpeechSynthesisUtterance(input)
  let dutchVoice = synth.getVoices().find(voice => voice.lang==='nl-NL')
  inputUtterance.voice = dutchVoice
  inputUtterance.onend = function() {
    console.log('SpeechSynthesisUtterance.onend')
    if (callbackOnEnd) {
      callbackOnEnd()
    }
  }
  inputUtterance.onerror = function() {
      console.error('SpeechSynthesisUtterance.onerror')
  }
  if (synth.speaking) {
    console.error('speechSynthesis.speaking')
    return
  }
  synth.speak(inputUtterance)
}

const spreekEnLuister = tekst => {
  spreek(tekst, luister)
}

const updateSchermWaarden = () => {
  huidigeRondeVeld.textContent = huidigeRonde;
  aanDeBeurtVeld.textContent = isComputerAanDeBeurt ? 'Computer' : naamVeld.value
  aantalFoutenVeld.textContent = aantalFouten
}

function resetSpel() {
  huidigeRonde = 1;
  aantalFouten = 0;
  isComputerAanDeBeurt = false;
  naamVeld.disabled = false;
  
  // Zet naamveld initieel default op 'Speler 1' of evt. een uit de URL geladen waarde.
  let url = new URLSearchParams(document.location.search)
  naamVeld.value = url.get('naam') || 'Speler 1'
  updateSchermWaarden()
  let tekst = "Hallo. Tik je naam in en druk start om te spelen"
  spreek(tekst)
}

resetSpel()

resetButton.onclick = () => {
  spreek("Ik reset het spel", resetSpel)
}

// Bron: https://stackoverflow.com/questions/24281937/update-parameters-in-url-with-history-pushstate#answer-41505583
const setQueryStringParameter = (name, value) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, "", decodeURIComponent(`${window.location.pathname}?${params}`));
}

inputForm.onsubmit = event => {
  setQueryStringParameter('naam', naamVeld.value)

  event.preventDefault()
  let naam = naamVeld.value
  let tekst = "Hallo " + naam + ", we zijn in ronde " + huidigeRonde + ". Jij bent aan de beurt"
  spreekEnLuister(tekst)

  naamVeld.disabled = true;
}

// TODO: Dictionary vervangen door simpel array, want lijkt toch niet nodig, 
// want SpeechRecognition levert toch bv. gewoon '1' op i.p.v. 'een'.
let fizzBuzzWoorden = [
    // { waarde: "crimson", naam: "karmozijnrood"},
    // { waarde: "indigo", naam: "indigo"},
    // { waarde: "white", naam: "wit"},
    { waarde: "vis", naam: "fizz"},
    { waarde: "bus", naam: "buzz"},
    { waarde: "visbus", naam: "fizzbuzz"},
    { waarde: "1", naam: "een"},
    { waarde: "2", naam: "twee"},
    { waarde: "3", naam: "drie"},
    { waarde: "4", naam: "vier"},
    { waarde: "5", naam: "vijf"},
    { waarde: "6", naam: "zes"},
    { waarde: "7", naam: "zeven"},
    { waarde: "8", naam: "acht"},
    { waarde: "9", naam: "negen"},
    { waarde: "10", naam: "tien"},
    { waarde: "11", naam: "elf"},
    { waarde: "12", naam: "twaalf"},
    { waarde: "13", naam: "dertien"},
    { waarde: "14", naam: "veertien"},
    { waarde: "15", naam: "vijftien"},
    { waarde: "16", naam: "zestien"},
    { waarde: "17", naam: "zeventien"},
    { waarde: "18", naam: "achttien"},
    { waarde: "19", naam: "negentien"},
    { waarde: "20", naam: "twintig"}
  ]

let fizzBuzzWaarden = fizzBuzzWoorden.map(k => k.waarde)
let grammar = '#JSGF V1.0; grammar fizbuzz; public <fizzbuzzvalues> = ' + fizzBuzzWaarden.join(' | ') + ';'

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition()
let speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = false
recognition.lang = 'nl-NL'
recognition.interimResults = false
recognition.maxAlternatives = 1

let diagnostic = document.getElementById('output')
let luisterStatus = document.getElementById('luisterStatus')
let hints = document.getElementById('hints')

const wisselBeurt = () => {
  huidigeRonde++
  isComputerAanDeBeurt = !isComputerAanDeBeurt
}

const isIllegal = fizzBuzzValue => {
  const intWaarde = parseInt(fizzBuzzValue) 
  // Als het geen integer is, dan zal het wel 'Fizz' of 'Buzz' zijn en (soms) goed
  if (isNaN(intWaarde)) {
    return false;
  }
  // Als het wel een integer is, dan is een woord dat je NIET mag noemen als deze deelbaar door 3 of door 5 is 
  // (want dan moet je Fizz, Buzz of FizzBuzz lopen).
  return intWaarde%3===0 || intWaarde%5===0
}

const fizzbuzz = waarde => {
  if (waarde%15===0) {
    return "visbus"
  }
  if (waarde%3===0) {
    return "vis"
  }
  if (waarde%5===0) {
    return "bus"
  }
  return "" + waarde;
}

var woordenHTML=''
fizzBuzzWoorden.forEach(function(woord, index) {
  console.log(woord, index)
  const signaalKleur = isIllegal(woord.waarde) ? 'red' : 'green'
  woordenHTML += '<span style="background-color:' + signaalKleur + ';"> ' + woord.naam + ' </span>'
})
hints.innerHTML = 'Klik en zeg een fizzbuzz woord: ' + woordenHTML + '.'

const luister = () => {
  recognition.start()
  luisterStatus.textContent = "Ik luister..."
  console.log('Klaar om een woord te horen')
}

const aanheffen = ["Ei", "Oeps", "Whoopsie", "Humm", "Nee nee", "Fout!"]

// Bron: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript#answer-7228322
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

recognition.onresult = event => {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var gehoordeWoord = event.results[0][0].transcript
  diagnostic.textContent = 'Gehoorde woord: ' + gehoordeWoord
  let gevondenWoord = fizzBuzzWoorden.find(w => w.waarde.toLowerCase() === gehoordeWoord.toLowerCase());
  console.log('Vertrouwen: ' + event.results[0][0].confidence)
  if (!gevondenWoord) {
    diagnostic.textContent += " (geen FizzBuzz waarde bij gevonden)"
    spreekEnLuister("Wat zei je?")
  } else {
    let gevondenWaarde = gevondenWoord.waarde
    diagnostic.textContent += ' (gevonden bijbehorende fizzBuzz waarde: ' + gevondenWaarde + ')'

    // Controleren of gehoorde woord juiste FizzBuzz woord is en zo niet aantal fouten ophogen
    let correcteFizzBuzzWaarde = fizzbuzz(huidigeRonde)
    let gebruikersMelding
    if (gevondenWaarde===correcteFizzBuzzWaarde) {
      gebruikersMelding = "Heel goed!";
    } else {
      aantalFouten++
      const randomInt = randomIntFromInterval(0, 5)
      let randomAanhef = aanheffen[randomInt]
      let foutOfFouten = aantalFouten===1 ? "fout" : "fouten"
      gebruikersMelding = randomAanhef + ". Je hebt nu " + aantalFouten + " " + foutOfFouten + ". Het moest niet" + gevondenWaarde + ", maar " + correcteFizzBuzzWaarde + " zijn."
    }
    spreek(gebruikersMelding)
    setTimeout(() => {
      wisselBeurt()
      updateSchermWaarden()
      setTimeout(() => {
        // TODO Computer ook fouten laten maken (en die apart tellen).
        const huidigeFizzBuzz = fizzbuzz(huidigeRonde)
        console.log(huidigeFizzBuzz)
        spreekEnLuister("Dan zeg ik... " + huidigeFizzBuzz)
        wisselBeurt()
        updateSchermWaarden()
        spreekEnLuister('Jij bent!')
      }, 1000)
    }, 1000)
  }
}

recognition.onspeechend = function() {
  recognition.stop()
  luisterStatus.textContent = "Ik luister niet"
}

recognition.onnomatch = function() {
  diagnostic.textContent = "Ik herkende die kleur niet."
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Fout bij woordherkenning: ' + event.error
}
