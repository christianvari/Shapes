# Shapes: VideoGame 3D using WebGL

Nel nostro progetto ci siamo proposti l'obiettivo di sviluppare un videogioco web in JavaScript.  

Il sito è online e raggiungibile al seguente indirizzo: https://shapes.altervista.org

Il sito viene visualizzato in maniera differente a seconda che vi si acceda da pc o da smartphone grazie ad uno script PHP che riconosce l'user-agent che effettua la richiesta. Per far ciò abbiamo utilizzato una libreria PHP di terze parti che contiene le stringhe dei vari user-agent.

### LogIn

All'entrata del sito ci si trova di fronte ad una pagina di login in cui bisogna inserire il Nickname del giocatore e la password.  

### Registrazione

Nel caso in cui un utente non fosse registrato può andare nella pagina di registrazione dove si troverà di fronte ad una form da compilare. In basso si trovano i classici bottoni di "reset" e "invio". 

Al click su quest'ultimo viene effettuata una POST verso il nostro script PHP che controlla se l'utente o la sua email sono già registrati e, in caso negativo, procede alla query SQL per inserire il nuovo giocatore nel database.

### Gioco

Il gioco, come si intuisce dal nome, si basa su forme geometriche elementari. Il giocatore, nelle vesti di un cubo bianco, deve schivare e saltare sopra gli ostacoli a forma di parallelepipedo che gli si scaraventano addosso.  

In basso a sinistra si trova la classifica dei migliori 10 giocatori di sempre aggiornata in tempo reale.

Sono presenti i bottoni "pausa", "volume/muto" e, in caso di fine partita appare anche il pulsante "info", per accedere ai crediti del gioco.

Comandi del gioco:
* freccia sinistra/A : vai a sinistra
* freccia destra/D : vai a destra
* freccia su/W/Spacebar : salto
* P : pausa

### Sviluppo del gioco

Per il rendering 3D abbiamo utilizzato la libreria Three.js che fa da wrapper a tutte le funzionalità di WebGL.  

Per poter gestire in modo fluido lo sviluppo di un progetto di dimensioni non esigue abbiamo usato i seguenti accorgimenti:
* il codice JavaScript è organizzato in moduli, in linea con il più recente standard JavaScript ECMAScript6;  
* abbiamo seguito un paradigma di programmazione orientato agli oggetti, utilizzando il costrutto "class" per creare classi di oggetti adatti ai nostri scopi.  

Per supportare anche la modalità di gioco da dispositivo mobile, nel caso di accesso da smartphone, viene inserita la gestione degli eventi di tipo "swipe" negli event handler del codice JavaScript. Questo è stato possibile con l'utilizzo della libreria hammer.js

La classifica dei migliori 10 punteggi di sempre viene aggiornata in tempo reale grazie ad AJAX che si occupa di fare richeste asincrone GET al server e attende la risposta dello script PHP che interroga il database, e la funzione window.setInteval(callback, timer) che invoca AJAX ogni 5 secondi.

Abbiamo utilizzato il Session Storage per salvare lo stato attuale della musica (volume o muto) in modo tale da poter ricordare quele è lo stato al prossimo caricamento della pagina, durante la stessa sessione di gioco.

Per gestire invece la sicurezza dei login abbiamo usato le sessioni del server PHP in modo tale da poter giocare solo se ci si è loggati.

### Applicazione Android

Abbiamo realizzato una WebApp per accedere al gioco da smartphone e tablet Android in modo molto più immediato.  

Per fare questo abbiamo sfruttato le API Android ( WebView ) per renderizzare il sito all'interno dell'App.

### Ottimizzazioni

A causa della grande quantità di calcoli che è necessario fare, è stato utile spostare parte della computazione sulla GPU.

Abbiamo usato rullup.js per compilare i nostri sorgenti JavaScript ed ottimizzare (...)

(Minimize...)

### Linguaggi Usati

* HTML
* CSS
* JavaScript (con l'aggiunta di JQuery e Ajax)
* PHP + SQL (per interfacciamento con Server e Database)
* Java + XML (per applicazone Android)

### Musica

La colonna sonora del gioco è stata composta appositamente dal nostro amico musicista e compositore di musica elettronica William Sebastiani.
 
