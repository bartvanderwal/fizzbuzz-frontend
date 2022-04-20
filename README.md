## FizzBuzz front-end

Dit is de front-end voor FizzBuzz. Het bekende drankspelletje, waarbij je de kring rond gaat en oplopende getallen zegt startend vanaf 1.
Maar:

- als het getal deelbaar is door 3 zeg je Fizz
- en als het getal deelbaar dis oor 5 zeg je: 'Buzz'
- en als door beiden dan zeg je FizzBuzz.

Met 'deelbaar' bedoelen we hier 'is 'geheel deelbaar, dus de 'integer divide' (`/`) met rest nul; waarbij rest operator in de meeste talen de `%` is:

```java
    x%3==0
```

En in JavaScript hetzelfde<sup>*</sup>:

```javascript
    x%3===0
```

<sup>*</sup>Al gebruiken we in JavaScript liever de `===` operator, want 'only the good parts' zoals Douglas 
Crougford voorstelde in zijn beroemde boek ['Javascript; The good parts'](https://www.bol.com/nl/nl/f/javascript/9200000022199048/).

Voor wat 'view' logica werkt deze VisBus met een spraak interface, gebruikmakend van de nieuwe JavaScript SpeechRecognition en SpeechSynthesis API. Dit ook wegens samenwerken met Lectoraat CIM (Centrum voor ICT & Media, of eigenlijk meer nieuwe speciale lectoraat 'Digital Inclusiviness Design & Engineering)
Hieronder al wat art work.

Voor ook toegankelijkheid gebruik ik ook Engelse stem 'Xander'. Mogelijk als je Windows draait werkt Nederlandse stem niet. Tijdens realisatie bleek mijn computer (MacBook) ook het woord 'fizzbuzz' of zelfs 'visbus' niet goed te verstaan. Dus ging deze ronde telkens fout. De computer verstond telkens ['visbeurs'](https://nl.pinterest.com/pin/564849978240306867). Dit hoort ook bij Agile, en als het niet gaat zoals het moet, moet het maar (maarruh: refactor later, en zorg dat je code in ieder geval refactorbaar is, e.g. begrijpbaar/onderhoudbaar).

Hoewel de originele repo aangeeft, dat deze werkt op Chrome en Firefox, test ik deze juist op Safari op mijn macos.

## Attributie

Deze is afgeleid van de [originele `web-speech-api` repository](https://github.com/mdn/web-speech-api) met demos illustrating features of the Web Speech API. See [Web_Speech_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for more details.

Deze repo is geforkt op 17 april 2022 geforkt door Bart van der Wal, voor opzet van spraakgestuurde FizzBuzz game.

### Plaatjes

<img src="plaatjes/../fizzbuzz/visbus.png" alt="Vis bus" width="300" />
<img src="plaatjes/../fizzbuzz/favicon/android-chrome-192x192.png" alt="Vis bus" width="200" />

Bus: <https://www.eichertrucksandbuses.com/buses/school-bus/starline>
Vis: <https://poki.nl/g/fish-eat-fish>

Wie het woord fout zegt moet bijvoorbeeld een drankje drinken. Waardoor je natuurlijk steeds meer fouten gaat maken. Maar: Don't try this at home!

Start een server op localhost om de SpeechRecognition het te laten doen, met bijvoorbeeld npm package `http-server`(de `-c-1` parameter is om caching uit te zetten (maar je moet vaak nog steeds ctrl+F5 gebruiken)):

```bash
npx http-server -c-1 .
```

### TODO

- Computer ook fouten laten maken (geen bugs, maar in fizzbuzz woorden :)
- Netjes aankondigen en toelichten dat toestemming
- Fatsoenlijk scherm lay-out
- Naar Angular of React voor data binding
- Back-end server gebruiken
