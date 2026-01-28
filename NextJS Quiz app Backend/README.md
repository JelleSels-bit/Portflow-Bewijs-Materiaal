[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZQkUYFyq)

# Quiz beheer app for now:




### Login
Admin:
Email: Admin@mail.com <br>
Password: Admin@123! <br>

User:
Email: User@mail.com <br>
Password: User@123! <br>


### Disclaimer
Momenteel als je inlogd kom je op een profile page. Later kan deze uitgewerkt worden zodat het actuele data bevat.


### Wat kan een admin?

* Quizzes: aanmaken, verwijderen, aanpassen of in detail bekijken. <br>
* Vragen toevoegen aan een specifieke quiz. Deze kan hij ook kunnen aanpassen / deleten als dit nodig.
* Antwoorden toevoegen aan een specifieke vraag. Deze kan hij ook aanpassen / deleten waar nodig.
* Een thema koppelen / onkoppelen aan een vraag of een quiz.
* Crud operaties uitvoeren op Gebruikers van het platform
* Demo bekijken hoe de applicatie eruit ziet als hij volledig klaar is.

### Wat kan een gebruiker?
* Kan momenteel kiezen welke quiz hij wilt spelen / hier een lobby voor hosten
* Een al bestaande lobby joinen met een roomcode. 

#### lobby testen:
In de browser van de admin vul je volgende url in: <br>
http://localhost:3000/host/waitingRoom/a1d21b7a-979b-4a7f-bd28-ac9de2a5dfef

In een andere browser waar je als user ingelogd bent geef je volgende url in: <br>
http://localhost:3000/player/waitingRoom/a1d21b7a-979b-4a7f-bd28-ac9de2a5dfef

### Database:

Deze wordt gehost op supabase. <br>
ERD: <br>
![afbeelding ERD](./public/erd%20quizapp.png)



### Links:

[V0.dev link](https://v0.app/chat/multiplayer-quiz-app-rwEXjwVi95L?ref=G0SWXG) <br>
[Seed script](prisma\seedDev.ts)  <br>
[Keys](.env) <br>
[Supabase](https://supabase.com/dashboard/project/drfoyimwnueeowbvlaho/editor/20149?sort=activeFrom%3Aasc) <br>

### Unfinished:

In de toekomst wil ik de app nog uitbreiden zodat hij ook het spelen quiz / statistieken bekijken toelaat.






Met vriendelijke groeten Jelle Sels


