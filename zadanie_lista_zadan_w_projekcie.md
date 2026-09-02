# Zadanie: Lista zadan w projekcie

## Cel zadania

Zbuduj aplikacje **Lista zadan w projekcie**, ktora pozwala zarzadzac zadaniami w malym projekcie. Aplikacja ma dzialac jak proste narzedzie do planowania pracy: uzytkownik moze dodawac zadania, edytowac je, usuwac, filtrowac, sortowac i sprawdzac podsumowanie.

To zadanie jest podobne do listy wydatkow, ale troche bardziej rozbudowane. Wykorzystaj to, co juz umiesz: formularz, modal, tabele, walidacje, `localStorage`, Tailwind CSS i DaisyUI.

## Technologie

- HTML
- JavaScript
- Tailwind CSS
- DaisyUI
- `localStorage`

Mozesz uzyc Tailwinda i DaisyUI przez CDN, tak jak w poprzednim projekcie.

## Struktura projektu

Zadbaj o czytelna strukture plikow:

```text
lista-zadan-w-projekcie/
  index.html
  script.js
  README.md
```

Opcjonalnie, jesli dodasz wlasne style:

```text
lista-zadan-w-projekcie/
  index.html
  script.js
  style.css
  README.md
```

## Dane zadania

Kazde zadanie powinno miec:

- unikalne `id`,
- tytul,
- opis,
- priorytet: niski, sredni, wysoki,
- status: do zrobienia, w trakcie, zrobione,
- termin wykonania,
- osobe odpowiedzialna,
- liste uwag przypisanych do tego zadania.

Kazda uwaga powinna miec:

- unikalne `id`,
- tresc uwagi,
- date i godzine utworzenia dodawane automatycznie przez aplikacje.

## Uklad interfejsu

### 1. Gorny pasek aplikacji

Na samej gorze aplikacji zrob pasek z tytulem i przyciskami.

Po lewej stronie:

- nazwa aplikacji: **Lista zadan w projekcie**

Po prawej stronie:

- przycisk z ikona: **Dodaj nowe zadanie**,
- przycisk z ikona: **Wyczysc liste**,
- przycisk **Opcje** jako menu rozwijane.

Menu **Opcje** powinno zawierac:

- Sortuj od najnowszych,
- Sortuj od najstarszych,
- Sortuj po nazwie alfabetycznie.

Do ikon mozesz uzyc prostych ikon z DaisyUI, emoji albo biblioteki ikon, jesli ja dodasz. Najwazniejsze, zeby przyciski byly czytelne i wygladaly jak czesc aplikacji.

### 2. Panel filtrowania

Pod gornym paskiem dodaj panel filtrowania.

Panel ma miec opcje **zwin / rozwin**.

Wazne: stan panelu ma zapisywac sie w `localStorage`.

Przyklad:

- jesli uzytkownik zwinie panel filtrowania i odswiezy strone, panel nadal ma byc zwiniety,
- jesli uzytkownik rozwinie panel i odswiezy strone, panel nadal ma byc rozwiniety.

W panelu filtrowania dodaj:

- wyszukiwanie po tytule zadania,
- wyszukiwanie po osobie odpowiedzialnej,
- filtrowanie po statusie,
- filtrowanie po priorytecie.

### 3. Tabela z danymi

Pod panelem filtrowania pokaz tabele z zadaniami.

Tabela powinna zawierac kolumny:

- tytul,
- osoba odpowiedzialna,
- priorytet,
- status,
- termin,
- liczbe uwag,
- informacje, czy zadanie jest zalegle,
- akcje.

W kolumnie akcje dodaj:

- przycisk edycji,
- przycisk usuwania.

Edycja powinna otwierac ten sam modal, ktory sluzy do dodawania zadania, ale z wypelnionymi danymi.

W kolumnie z liczba uwag pokaz badge:

- jesli zadanie nie ma uwag, badge powinien byc szary i pokazywac `0`,
- jesli zadanie ma uwagi, badge powinien miec wyrazniejszy kolor i pokazywac liczbe uwag.

### 4. Podsumowanie na dole

Pod tabela dodaj podsumowanie wedlug statusow.

Pokaz:

- liczbe wszystkich zadan,
- liczbe zadan ze statusem **do zrobienia**,
- liczbe zadan ze statusem **w trakcie**,
- liczbe zadan ze statusem **zrobione**,
- liczbe zadan zaleglych.

## Modal dodawania i edycji

Dodawanie nowego zadania ma odbywac sie przez modal.

W modalu powinien byc formularz z polami:

- tytul,
- opis,
- priorytet,
- status,
- termin wykonania,
- osoba odpowiedzialna.

Ten sam modal wykorzystaj do edycji zadania.

Przy dodawaniu modal moze miec tytul:

- **Dodaj nowe zadanie**

Przy edycji:

- **Edytuj zadanie**

## Modal szczegolow zadania i uwag

Dodaj drugi modal: **Szczegoly zadania**.

Ten modal powinien otwierac sie po kliknieciu zadania w tabeli albo po kliknieciu osobnego przycisku, np. **Szczegoly**.

W modalu pokaz:

- podstawowe dane zadania,
- tabele uwag przypisanych do tego zadania,
- formularz dodawania nowej uwagi,
- przyciski edycji i usuwania uwag.

Tabela uwag powinna zawierac:

- tresc uwagi,
- date i godzine dodania,
- akcje: edytuj, usun.

Dodawanie uwagi:

- uzytkownik wpisuje tylko tresc uwagi,
- aplikacja sama zapisuje date i godzine dodania,
- uwaga zapisuje sie wewnatrz konkretnego zadania.

Edycja uwagi:

- pozwala zmienic tresc uwagi,
- data utworzenia moze zostac taka sama.

Usuwanie uwagi:

- usuwa tylko jedna uwage z konkretnego zadania,
- nie usuwa calego zadania.

Wazne: uwagi sa danymi podrzednymi wobec zadania. To znaczy, ze kazde zadanie ma swoja osobna liste uwag.

Przykladowa struktura jednego zadania:

```js
{
  id: 123,
  tytul: "Przygotowac prezentacje",
  opis: "Prezentacja na spotkanie zespolu",
  priorytet: "wysoki",
  status: "w trakcie",
  termin: "2026-09-05",
  osoba: "Patrycja",
  uwagi: [
    {
      id: 456,
      tresc: "Dodac slajd z podsumowaniem",
      dataUtworzenia: "2026-08-25 18:30"
    }
  ]
}
```

## Organizacja kodu JS

Jesli kod zacznie byc dlugi, mozesz podzielic JavaScript na kilka plikow.

Proponowana struktura:

```text
lista-zadan-w-projekcie/
  index.html
  js/
    app.js
    zadania.js
    modal-zadania.js
    modal-uwag.js
  README.md
```

Nie musisz robic podzialu od razu. Jesli jednak dodasz obsluge uwag, dobrym pomyslem bedzie przeniesienie logiki modala uwag do osobnego pliku, np. `modal-uwag.js`.

## Walidacja

Dodaj walidacje formularza.

Nie pozwol zapisac zadania, jesli:

- tytul jest pusty,
- osoba odpowiedzialna jest pusta,
- priorytet nie zostal wybrany,
- status nie zostal wybrany,
- termin wykonania jest pusty.

Opis moze byc opcjonalny.

Dobrze, jesli walidacja bedzie zrobiona zarowno w HTML, np. `required`, jak i w JavaScript.

## LocalStorage

Aplikacja ma zapisywac w `localStorage`:

- liste zadan,
- stan panelu filtrowania: zwiniety albo rozwiniety.

Po odswiezeniu strony dane maja nadal byc widoczne.

Uwagi maja zapisywac sie razem z zadaniami. Po odswiezeniu strony zadanie nadal powinno miec swoje uwagi.

Jesli w `localStorage` sa uszkodzone dane albo nie ma tam tablicy, aplikacja powinna wystartowac z pusta lista zamiast sie zepsuc.

## Sortowanie

Sortowanie ma byc dostepne w menu **Opcje**.

Dodaj:

- sortowanie od najnowszych,
- sortowanie od najstarszych,
- sortowanie po nazwie alfabetycznie.

Mozesz przyjac, ze "najnowsze" i "najstarsze" oznaczaja sortowanie po terminie wykonania albo po dacie dodania zadania. Wybierz jedno podejscie i opisz je w `README.md`.

## Dwa nowe elementy w porownaniu z poprzednim projektem

### 1. Badge dla statusow i priorytetow

Status i priorytet w tabeli nie powinny byc zwyklym tekstem.

Pokaz je jako kolorowe etykiety, np. DaisyUI `badge`:

- niski priorytet: spokojny kolor,
- sredni priorytet: ostrzegawczy kolor,
- wysoki priorytet: mocny kolor,
- zrobione: zielony kolor,
- w trakcie: informacyjny kolor,
- do zrobienia: neutralny kolor.

### 2. Wykrywanie zadan zaleglych

Jesli termin wykonania jest w przeszlosci, a status nie jest **zrobione**, zadanie powinno byc oznaczone jako zalegle.

Mozesz pokazac to na jeden z dwoch sposobow:

- dodatkowy badge **Zalegle** w tabeli,
- albo delikatne wyroznienie calego wiersza.

Zadanie ze statusem **zrobione** nie powinno byc oznaczane jako zalegle, nawet jesli termin jest juz w przeszlosci.

### 3. Uwagi jako dane podrzedne

Dodaj do zadan uwagi jako druga, podrzedna liste danych.

To jest najwazniejsze rozszerzenie aplikacyjne w tym projekcie: jedno zadanie moze miec wiele uwag.

Na glownej tabeli nie pokazuj calej listy uwag. Pokaz tylko badge z liczba uwag.

Sama lista uwag powinna byc widoczna dopiero w modalu szczegolow zadania.

## Responsywnosc

Aplikacja ma dobrze wygladac na komputerze i telefonie.

Wskazowki:

- gorny pasek na telefonie moze przechodzic w dwie linie,
- tabela moze miec poziome przewijanie,
- panel filtrowania na telefonie moze miec pola jedno pod drugim,
- przyciski nie powinny nachodzic na tekst.

## README

Dodaj plik `README.md`, w ktorym opiszesz:

- co robi aplikacja,
- jakie ma funkcje,
- jak ja uruchomic,
- jakich technologii uzyto,
- czego nauczylas sie przy tym projekcie,
- jaka dodatkowa funkcje dodalas sama.

README powinno byc napisane starannie, tak jak opis gotowego projektu.

## Commity

Tym razem zadbaj o historie commitow.

Zrob kilka mniejszych commitow, np.:

- utworzenie struktury projektu,
- dodanie layoutu,
- dodanie modala i formularza,
- dodanie zapisu do `localStorage`,
- dodanie tabeli i renderowania,
- dodanie filtrowania,
- dodanie sortowania,
- dodanie podsumowania,
- poprawki responsywnosci i README.

Commit powinien krotko mowic, co zostalo dodane albo poprawione.

## Kryteria zaliczenia

Projekt bedzie uznany za skonczony, jesli:

- da sie dodawac zadania przez modal,
- da sie edytowac zadania przez modal,
- da sie usuwac pojedyncze zadania,
- da sie otworzyc szczegoly zadania,
- da sie dodawac, edytowac i usuwac uwagi przypisane do zadania,
- uwagi zapisuja date i godzine dodania automatycznie,
- glowna tabela pokazuje badge z liczba uwag,
- da sie wyczyscic cala liste po potwierdzeniu,
- dane zapisuja sie w `localStorage`,
- stan panelu filtrowania zapisuje sie w `localStorage`,
- dziala filtrowanie,
- dziala sortowanie z menu **Opcje**,
- tabela pokazuje statusy i priorytety jako badge,
- zadania zalegle sa oznaczone,
- na dole widac podsumowanie wedlug statusow,
- aplikacja jest responsywna,
- repozytorium ma czytelna strukture,
- `README.md` opisuje projekt,
- historia commitow pokazuje etapy pracy.

## Dodatkowe wyzwanie dla chetnych

Jesli podstawowa wersja bedzie gotowa, dodaj jedna z funkcji:

- licznik procentowy postepu projektu,
- filtrowanie tylko zadan zaleglych,
- przycisk "Oznacz jako zrobione",
- eksport zadan do pliku `.json`,
- tryb ciemny zapisywany w `localStorage`.

Nie dodawaj wszystkiego naraz. Wybierz jedna rzecz i zrob ja dobrze.
