# Zadanie uzupelniajace: dopracowanie Listy zadan w projekcie

## Cel zadania

Dopracuj istniejaca aplikacje **Lista zadan w projekcie**. Nie tworz projektu od zera. Celem jest poprawienie jakosci, wygody uzywania i kilku brakujacych elementow.

To zadanie ma pokazac, ze umiesz nie tylko napisac pierwsza wersje aplikacji, ale tez wrocic do kodu, znalezc problemy, poprawic je i rozwinac projekt bez psucia dzialajacych funkcji.

## Zakres obowiazkowy

### 1. Ikony w przyciskach na gorze

Dodaj ikony do przyciskow w prawym gornym rogu aplikacji:

- **Dodaj nowe zadanie**,
- **Wyczysc liste**,
- **Opcje**.

Ikony moga byc proste, ale powinny pasowac do akcji. Przycisk nadal ma byc czytelny, czyli ikona plus tekst.

### 2. Napraw sortowanie

Aktualnie sortowanie od najnowszych i od najstarszych nie dziala poprawnie albo nie jest wystarczajaco jasne.

Popraw sortowanie w menu **Opcje**:

- **Sortuj od najnowszych**,
- **Sortuj od najstarszych**,
- **Sortuj po nazwie alfabetycznie**.

Wazne: zdecyduj, co oznacza "najnowsze" i "najstarsze":

- albo data dodania zadania,
- albo termin wykonania.

Najlepsza opcja: dodaj do zadania pole `dataDodania`, zapisywane automatycznie przy tworzeniu zadania. Wtedy:

- najnowsze = zadania najpozniej dodane,
- najstarsze = zadania najwczesniej dodane.

Opisz ten wybor w `README.md`.

### 3. Filtrowanie po wielu statusach i priorytetach

Zamien zwykle pojedyncze listy wyboru statusu i priorytetu na rozwijane filtry z checkboxami.

Uzytkownik powinien moc zaznaczyc kilka statusow naraz, np.:

- do zrobienia,
- w trakcie.

Uzytkownik powinien tez moc zaznaczyc kilka priorytetow naraz, np.:

- sredni,
- wysoki.

Jesli nic nie jest zaznaczone, pokazuj wszystkie zadania z danej kategorii filtra.

Przyklad:

- zaznaczone statusy: `do zrobienia`, `w trakcie`,
- zaznaczony priorytet: `wysoki`,
- aplikacja pokazuje tylko zadania wysokiego priorytetu, ktore sa do zrobienia albo w trakcie.

### 4. Lepszy naglowek tabeli

Wiersz naglowka tabeli z nazwami kolumn powinien byc bardziej widoczny.

Popraw:

- wieksza czcionke,
- mocniejszy kolor,
- ewentualnie lekko wyroznione tlo.

Nie przesadzaj z ozdobami. Ma byc czytelnie i aplikacyjnie.

### 5. Przycisk "Klonuj" w modalu edycji zadania

W modalu edycji zadania dodaj po lewej stronie przycisk:

- **Klonuj**

Przycisk ma byc widoczny tylko podczas edycji istniejacego zadania. Nie musi byc widoczny przy dodawaniu nowego zadania.

Dzialanie:

- uzytkownik otwiera zadanie do edycji,
- klika **Klonuj**,
- aplikacja zapisuje kopie tego zadania jako nowy wpis na liscie,
- kopia ma dostac nowe `id`,
- po sklonowaniu okno edycji ma pozostac otwarte,
- uzytkownik powinien moc od razu zmienic dane sklonowanego zadania.

Wazne: po kliknieciu **Klonuj** formularz powinien przelaczyc sie na edycje nowo utworzonej kopii, a nie starego zadania.

Uwagi:

- mozna skopiowac uwagi razem z zadaniem,
- ale wtedy kazda uwaga w kopii powinna dostac nowe `id`,
- prostsza wersja: sklonowane zadanie ma pusta liste uwag.

Wybierz jedna wersje i opisz ja w `README.md`.

### 6. Opcja "Pokaz JSON"

W menu **Opcje** dodaj pozycje:

- **Pokaz JSON**

Po kliknieciu otworz modal, w ktorym bedzie widoczne pole `textarea` z JSON-em zapisywanym w `localStorage`.

JSON powinien pokazywac aktualna liste zadan razem z uwagami.

Wymagania:

- `textarea` powinno byc tylko do odczytu albo przynajmniej nie powinno zapisywac zmian automatycznie,
- JSON powinien byc sformatowany czytelnie, np. z wcieciami,
- modal powinien miec przycisk zamkniecia.

To ma byc narzedzie podgladu danych, nie edytor danych.

## Moje dodatkowe propozycje

### 7. Bezpieczniejsze renderowanie tekstu

Sprawdz miejsca, w ktorych dane wpisane przez uzytkownika sa wstawiane do HTML-a.

Jesli uzywasz `innerHTML` do pokazania tytulu, osoby, opisu albo tresci uwagi, popraw to na bezpieczniejsze podejscie:

- tworz elementy przez `document.createElement`,
- tekst wpisuj przez `textContent`.

`innerHTML` zostaw tylko tam, gdzie wpisujesz staly HTML kontrolowany przez siebie, np. znacznik badge.

### 8. Komunikat po zapisaniu, usunieciu albo sklonowaniu

Dodaj krotki komunikat dla uzytkownika po waznej akcji:

- zadanie dodane,
- zadanie zapisane,
- zadanie sklonowane,
- zadanie usuniete,
- lista wyczyszczona.

Mozesz uzyc DaisyUI `toast` albo prostego alertu w aplikacji. Lepiej, zeby to nie byl zwykly `alert()`, tylko ladny komunikat widoczny przez chwile.

### 9. Licznik aktywnych filtrow

Przy panelu filtrowania pokaz mala informacje, ile filtrow jest aktywnych.

Przyklad:

- `Filtry aktywne: 0`,
- `Filtry aktywne: 3`.

Do aktywnych filtrow licz:

- wpisany tekst w szukaniu po tytule,
- wpisany tekst w szukaniu po osobie,
- zaznaczone statusy,
- zaznaczone priorytety.

### 10. README.md zamiast pustego README.txt

Zmien `README.txt` na `README.md` i uzupelnij opis projektu.

README powinno zawierac:

- nazwe aplikacji,
- opis funkcji,
- instrukcje uruchomienia,
- opis localStorage,
- opis uwag jako danych podrzednych,
- opis sortowania,
- opis klonowania zadania,
- informacje, czego sie nauczylas.

## Wymagania techniczne

- Nie usuwaj dzialajacych funkcji.
- Po kazdej wiekszej zmianie sprawdz recznie, czy aplikacja nadal dziala.
- Zachowaj zapis zadan i uwag w `localStorage`.
- Zachowaj zapis stanu panelu filtrowania w `localStorage`.
- Zadbaj o responsywnosc na telefonie.
- Przy wiekszych zmianach rob mniejsze commity.

## Proponowane commity

Zrob kilka commitow, np.:

- `dodano ikony w przyciskach`,
- `naprawiono sortowanie zadan`,
- `dodano wielokrotny wybor filtrow`,
- `dodano klonowanie zadania`,
- `dodano podglad json`,
- `poprawiono renderowanie tekstu`,
- `uzupelniono readme`.

## Kryteria zaliczenia

Zadanie jest skonczone, jesli:

- przyciski w gornym pasku maja ikony,
- sortowanie od najnowszych i najstarszych dziala zgodnie z opisem,
- status i priorytet da sie filtrowac po kilku zaznaczonych opcjach,
- naglowek tabeli jest bardziej czytelny,
- w modalu edycji dziala przycisk **Klonuj**,
- po klonowaniu formularz pozwala od razu edytowac nowo utworzona kopie,
- w menu **Opcje** dziala **Pokaz JSON**,
- JSON pokazuje aktualne dane z `localStorage`,
- tekst wpisany przez uzytkownika jest renderowany bezpiecznie,
- pojawia sie komunikat po waznych akcjach,
- widac licznik aktywnych filtrow,
- `README.md` jest uzupelnione,
- aplikacja nadal dobrze dziala na telefonie i komputerze.

## Wskazowka koncowa

To zadanie nie polega na dodaniu jak najwiekszej liczby bajerow. Chodzi o dopracowanie aplikacji: poprawic bledy, uporzadkowac zachowanie, dodac wygodne funkcje i pokazac, ze umiesz rozwijac istniejacy projekt krok po kroku.
