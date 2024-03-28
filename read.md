# Project 1 --Concentration (Memory Game)

## Idea

Players can exercise their memory through this funny game.
Players need to finish the game with the least attempts.

## User Stories

As a player, I can start the game, so I can play.
As a player, I can turn two cards each attempts to check the pictures, so I will know if I am right or wrong.
As a player, I need to match all the same cards with the least attempts, so I will finish the game.

## Control Flow

> > HTML

Page 1: Start Page
text: 'Concentration'
button: 'START' -> turn to page 2 -> eventlistener(click,change page)
background picture

Page 2: Game Page
4 x 6 boxes -> show pictures
text: 'Attempts: ?'
user click picture\*2 -> show 2 pictures -> eventlistener(click, showpicture) -> check two pictures if the same -> same: no action; different: hide picture(countdown ?seconds) -> attempt +1
user match all pictures -> turn to page 3 -> eventlistener(show all pictures, change page)

Page 3: End Page
text: 'You finished the game with X attempts!'
button: 'RESTART' -> turn to page 1 -> eventlistener(click, change page)

> > JS

Data:
pictures\*12
attempts(0,++)

Function:
attemptsCount
showPicture
pictureMatch
hidePicture
finishGame
gameResult

Eventlistener:
click start button -> change to page 2
click picture -> show picture -> (hide picture)
click restart button -> change to page 1

## Pseudo Code
