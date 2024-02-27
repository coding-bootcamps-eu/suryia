# Suriya
## 

Das Suryia-Projekt ist eine umfassende Full-Stack-Webanwendung, die sich auf die Verwaltung und Umleitung von URLs spezialisiert und eine Reihe von Technologien und Frameworks für Frontend und Backend nutzt. 

### Backend

- Node.js und Express: Das Backend verwendet Node.js und das Express-Framework.

- MongoDB und Mongoose: MongoDB wird als Datenbank verwendet, mit Mongoose als ODM (Object Document Mapping), um den Umgang mit der Datenbank zu vereinfachen.

- Passport.js mit JWT: Für die Authentifizierung wird Passport.js verwendet, konfiguriert mit einer JWT-Strategie.

- Link-Router: Ein Express-Router verwaltet CRUD-Operationen (Erstellen, Lesen, Aktualisieren, Löschen) für Links. Diese Operationen sind durch JWT-basierte Authentifizierung gesichert.

- Link-Resolver: Der Link-Resolver ist eine Express-Router-Konfiguration, die eine Wildcard-Route verwendet.Der Resolver extrahiert den path aus der URL der Anfrage. Mit diesem Pfad sucht der Resolver in der MongoDB-Datenbank nach einem entsprechenden Link-Dokument. Durch den Link-Resolver kann das Backend nun nicht nur Links verwalten, sondern auch direkte Umleitungen basierend auf den in der Datenbank gespeicherten Pfaden durchführen.

### Frontend

- Vue.js und Quasar Framework: Das Frontend ist mit Vue.js erstellt, einem progressiven JavaScript-Framework, zusammen mit dem Quasar Framework für das UI-Design.

- Pinia: Pinia wird für das State-Management verwendet, wobei zwei Hauptstores definiert sind: einer für die Verwaltung der Links und ein weiterer für die Benutzersitzung.

Link zur Verwaltung: 
https://suryiademo.netlify.app

Logdaten:
julia1234567@test.com /password1234 (Falls der Login nicht beim erstenmal funktioniert, Seite neu Laden)

Link zum Resolver:
https://suryia-resolver.onrender.com ( Linkname aus der Linkliste entnehmen und in den Resolver eingebn)

## Requirements

- Node.js v18.17.1.

## API Documentation
To see detailed information on how to interact with the Suryia API, please visit [our API documentation page](https://documenter.getpostman.com/view/29432245/2s9Y5bPg9U).
