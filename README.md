# web-speech-api

A repository for demos illustrating features of the Web Speech API. See [Web_Speech_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for more details.

Op 17 april 2022 geforkt door Bart van der Wal, voor opzet van spraakgestuurde FizzBuzz game.

## FizzBuzz game

Het bekende drankspelletje, waarbij je de kring rond gaat en oplopende getallen zegt startend vanaf 1, maar als het getal deelbaar is door 3 zeg je Fizz en deelbaar door 5 zeg je Buzz, en als door beiden dan zeg je FizzBuzz. En deelbaar is geheel deelbaar, dus de 'integer divide' (`/`) met rest nul; oftewel de `%` operator:

```java
    x%3==0
```

En in JavaScript hetzelfde<sup>*</sup>:

```javascript
    x%3===0
```

<sup>*</sup>Al gebruiken we in JavaScript liever de `===` operator, want 'only the good parts' zoals Douglas 
Crougford voorstelde in zijn beroemde boek ['Javascript; The good parts'](https://www.bol.com/nl/nl/f/javascript/9200000022199048/).

Plaatjes
Bus: <https://www.eichertrucksandbuses.com/buses/school-bus/starline>
Vis: <https://poki.nl/g/fish-eat-fish>

Wie het woord fout zegt moet een drankje drinken. Waardoor je natuurlijk steeds meer fouten gaat maken.
## Speech color changer demo

[Run recognition demo live](https://mdn.github.io/web-speech-api/speech-color-changer/)

Tap the screen then say a colour — the grammar string contains a large number of HTML keywords to choose from, although we've removed most of the multiple word colors to remove ambiguity. We did keep goldenrod, cos, well.

This current works only on Chrome/Chrome Mobile. To get this code running successfully, you'll need to run the code through a web server (localhost will work.)

## Phrase matcher demo

Speak the phrase and then see if the recognition engine successfully recognises it — this is another demo that relies on speech recognition, written for a research team at the University of Nebraska at Kearney.

This current works only on Chrome/Chrome Mobile. To get this code running successfully, you'll need to run the code through a web server (localhost will work.)

[Run phrase matcher demo live](https://mdn.github.io/web-speech-api/phrase-matcher/)

## Speak easy synthesis demo

[Run synthesis demo live](https://mdn.github.io/web-speech-api/speak-easy-synthesis/)

Type words in the input then submit the form to hear it spoken. You can also select the different voices available on the system, and alter the rate and pitch.

This currently works in Chrome and Firefox.
