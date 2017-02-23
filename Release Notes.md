###**PG09 T2 Web Apps 2 - Angry Pigs (Castles & UFOs)**
Submitted by: pg09jesse Jesse Carmack & pg09jaxon Jaxon Stevens
        Date: February 21st, 2017

A take on the Angry Birds formula.  Here the objective is to free your alien
friends from the dungeons of a Castle.  The player gets to build the castle in
the Editor mode and gets to knock it down in the Play mode.

See all our commits on Git: https://github.com/LemonaInc/Angry-Pigs

####**How to Use**
---------
Because Castles & UFO Editor interacts with a server, the game will not run if
you run the file from index.html.  Instead, our files can be found on the
Perforce depot in the following directory:

//VFS_Depot/Programming/PG09/Team/AngryPigs/SexyLetterJs/

####**Known Issues**
--------
- Lots of rendering problems on Firefox
- Loading an already existing level and then placing more objects in it doesn't work.

####**Changelog**
--------
Post submission updates:
- Main menu cleaned up/background fixed
- Added UI elements: Projectiles remaining/Aliens left to rescue.
- Objects now delete when they leave screen
- Win/Lose States work now (when all aliens are rescued/all projectiles used up)
- Backgrounds now change based on .json level data

####**To Add Still**
--------
[ ] Add tutorial text splash on game screen
[ ] Make it so you can fire by clicking anywhere on the screen
[ ] Add delay so you can't fire until ufo has finished it's animation.
[ ] In editor, bg selection should show images instead of urls.
[ ] Change UFO hover animation
[ ] Blinking aliens
[ ] When aliens reach top of screen, play gree glow animation/get pulled into UFO
[ ] More levels
[ ] Add credits
