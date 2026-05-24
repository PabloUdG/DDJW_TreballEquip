<h1> Treball en Equip/DDJW_TreballEquip/Pablo Vaquero, Nil Portas </h1>

--> [Introducció](#introducció).

--> [Descripció del disseny del joc](#descripció-del-disseny-del-joc).

--> [Descripció de les parts més revellants de la implementació](#descripció-de-les-parts-més-revellants-de-la-implementació).

--> [Conclusions i problemes trobats](#conclusions-i-problemes-trobats).

## Introducció
Aquest joc és un "Point & Click", basat en la saga de videojocs "Five Nights at Freddy's". Has de frenar el tren, mentres evites que el revisor entri per la porta. Per poder tancar la porta, tens la pantalla del centre per poder tancar-la. I, per poder frenar el tren, has de completar una sèrie de minijocs per poder frenar el tren.

## Descripció del disseny del joc
<div> Jugar --> Començar la partida </div>
<div> Opcions --> Pujar/Baixar el volum, modificar la pantalla. </div>
<div> Sortir --> Sortir de la partida. </div>
<div> Menu Pausa --> Tornar al menu principal/Continuar amb la partida. </div>

## Descripció de les parts més revellants de la implementació
<div> Menú Principal: Només conté els botons d'opcions, jugar i sortir. No conté gaire més </div>
<div> Escena de joc (TrainScene): Conté les principals mecàniques de joc (Frenar el tren + Evitar que el revisor entri a la cabina de control del tren. També conté l'implementació del menú de pausa. </div>
<div> Escena de pausa: Destacar els botons per continuar amb la partida i per tornar al menú principal. </div>

## Conclusions i problemes trobats
Els principals problesmes han sigut al inici, degut a la inexperiència que teniem amb el motor de jocs Phaser.
