# backend-project-1

## Projekt 1 - Fuskeluring’s användartjänst
### Bakgrund
Fuskeluring AB är ett hemlighetsfullt bolag som arbetar med pseudokonton på sociala medier. De vill ha en webbtjänst som kan generera kontouppgifter för sina anställda att posera som på sociala medier. För att de anställda på Fuskeluring AB inte ska dra på sig för mycket uppmärksamhet och avslöja bolaget så vill de lägga en begränsning på hur många kontouppgifter som kan genereras per anställd (10st/dag). 

### Instruktioner
* Läs nog igenom hela projektbeskrivningen och lägg extra tid på att läsa specifikationen. För att komma igång 
* Problemanalys, vilka delproblem finns det?, anteckna dessa
* Skissa på datamodellen med ER-diagram
* Sätt upp utvecklingsmiljön (forka repo, initiera node-projekt, boilerplating, etc)
* Sätt upp databasen och ett seed-script
* Skissa på Models och Controllers, vilka behöver du?
* Specifikation
* Webbtjänsten ska ta emot och svara med JSON.

Det ska finnas 3st förskapade konton, det ska inte gå att skapa några nya genom webbtjänsten.
- email: stabbing.steve@fuskeluring.hack, password: grillkorv123
- email: murdering.mike@fuskeluring.hack, password: bananpaj1337
- email: crimes.johnsson@fuskeluring.hack, password: sötsursås42

Användarna ska kunna byta sina lösenord.

De skapade uppgifterna ska innehålla namn, adress, yrke, födelsedatum, hemort, en personlig egenskap (såsom Cat lover eller Ballon Enthusiast), och en bild. För samtliga dessa kan du använda Faker för att generera.

Att begränsa förfrågningar till 10st/dag till en webbtjänst kallas för throttling, det innebär att räkna förfrågningarna som kommer in och lagra denna räknare. Om räknaren är för stor så får man ett felmeddelande. Att nollställa räknaren går att lösa på flera olika sätt, fråga läraren för tips eller försök själv!

### Tekniker
* Node
* Express
* SQLite
* JWT
* Bcrypt
* JSON
* Projektstruktur enligt MVC
* Endpoints

| Method  | Path | Kommentar |
| ------------- | ------------- | ------------- |
| POST  | /login  | Loggar in användaren genom att skicka tillbaka en JWT  |
| GET  | /me  | Ger tillbaka användarinfo för den inloggade användaren  |
| PATCH  | /me  | Ändrar lösenordet  |
| GET  | /generate  | Genererar en ny användarprofil, max 10st /dag per användare  |

### Utmaning (Valfri)
Lägg till en endpoint som gör att de anställda kan skicka genererade användare till varandra med en länk med base64 encoded data. 
Inkludera även denna länk i svaret på GET /generate

| Method  | Path | Kommentar |
| ------------- | ------------- | ------------- |
| GET  | /user/:base64data  | Ger samma svar som GET /generate gjorde  |


### Bedömning
#### För godkänt
* Tydlig namngivning
* Kodstruktur enligt MVC
* Hashade lösenord
* Nästan fullt fungerande endpoints
* Hemligheter i miljövariabler

#### För väl godkänt
* Samma som för godkänt
* Fullt fungerande endpoints
* Inga konstiga svar från servern (Såsom javascript eller SQL-errors)
* Custom Error handling and messaging
* Buggfri och crashfri
