# Artìa - Capstone Project
Progetto finale corso Epicode

## Sinossi
### Applicazione web per aste d’arte online
Il mio progetto finale del corso Epicode consiste nella creazione di un’applicazione web dedicata alle aste di opere d’arte online.  

![image](https://user-images.githubusercontent.com/80158378/230586740-35bbe695-21b6-457f-a6d0-b7079d4cfe4c.png)
  
Ho inserito le seguenti funzionalità:
<ul>
  <li>Homepage libera per tutti</li>
  <li>Login per gli utenti</li>
  <li>Possibilità per gli utenti di pubblicare le proprie opere, dopo conferma dell'admin</li>
  <li>Possibilità per gli utenti di fare le proprie offerte ad un'opera</li>
  <li>Possibilità di pagare il lotto vinto con Paypal Sandbox</li>
</ul>  
  
L'obiettivo principale del progetto è quello di fornire una piattaforma online per gli appassionati di arte intuitiva e facile da utilizzare, aumentare la visibilità degli artisti emergenti creando aste delle proprie opere d’arte e permettere agli utenti di partecipare a questo genere di eventi, spesso difficili da trovare nella propria zona, comodamente da casa propria.  
  
Per fare ciò ho utilizzato le seguenti tecnologie:
<ul>
  <li>Angular per la parte grafica</li>
  <li>Spring Boot per la parte back-end</li>
  <li>PostgreSQL come database</li>
</ul>
  
## Come avviare l'app
È necessario seguire i seguenti passaggi per avviare l'app:

<ul>
  <li>Clonare il progetto oppure scaricare lo zip, estrarlo ed aprire le cartelle</li>
  <li>Creare un database chiamato Capstone_Project</li>
</ul>
  
Nella parte BE
<ul>
  <li>Controllare se i dati del file application.properties sono tutti corretti per il collegamento al database</li>
  <li>Scommentare il metodo popolaDb nel file CapstoneProjectBeApplication</li>
  <li>Fare run</li>
  <li>Ricommentare il metodo e salvare</li>
  <li>Copiare e incollare sul browser questo link http://localhost:8080/auth/update_pw_utente (comparirà la scritta "Utenti aggiornati")</li>
</ul>
  
Nella parte FE
<ul>
  <li>installare i node_modules con il comando <code>npm i</code></li>
  <li>Avviare l'applicazione con il comando <code>ng serve -o</code></li>
</ul>

Adesso siete pronti per pubblicare le vostre opere in Artìa!
  
  
--------------------------------------------------------------------------------------------------------------------------------------
  
<small>Le immagini utilizzate sono di pubblico dominio (scaricate da Freepik o Unsplash). Altre immagini sono state gentilmente concesse in uso dall'artista Rebecca Lentini.</small>
