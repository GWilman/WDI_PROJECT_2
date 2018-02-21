![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-30 Project 2 - TRAX

Since my teenage years I have been involved in a number of Facebook/Whatsapp groups built around sharing songs with friends. For my second GA project, I set out to make an application that could replicate these groups and provide extra functionality. With TRAX, you can share music with your friends, chat and comment on each others posts, and build a custom playlist of all of your favourite tunes.

TRAX is a full-stack, RESTful Express app built using Node.js, MongoDB, JavaScript, EJS, SCSS and Bootstrap. It has been designed with mobile in mind and is fully responsive.

##### [Visit website](https://trax-share.herokuapp.com/).

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

---
<p align="center"><img src="https://i.imgur.com/Upa8d4d.png" width="700"></p>

###### Users create an account on TRAX, a painless process that allows them to view the wall, add new tracks and create their own playlist. Passwords are hashed with bcrypt.

###### Once logged in, the wall is the main focus of the app. It presents a timeline of all songs posted by all users. New tracks are added at the top via a simple box and, once posted, appear at the head of the timeline as the most recent track.


<p align="center"><img src="https://i.imgur.com/9kmamIT.jpg" width="700"></p>


###### The input box can handle any type of YouTube link, using RegEx to snip the video's ID from the URL before embedding the song on the wall, accompanied with a message.

<p align="center"><img src="https://i.imgur.com/ZcBPH1K.png" width="700"></p>

###### Users can chat in the dropdown comment section below and add songs to their personal playlist via the add to playlist link. If already added, users can remove songs from their playlist in the same way.

<p align="center"><img src="https://i.imgur.com/uKGeMPi.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/9duEGHh.jpg" width="700"></p>


###### The playlist page lists the user's favourite songs in a stripped back format with simple 'view details' or 'remove' options.

---

As my mission was to build my first RESTful app, I was very pleased with the way TRAX worked out and it is something that I would love to develop further in the future. My ideas for further expansion include:

- The ability to handle non-YouTube links. (SoundCloud, Spotify etc.)
- The implementation of AJAX (not yet learned at time of build) to negate the need for regular page loads.
- Allow users to be members of multiple groups and the ability to easily switch between the walls of each group. The personal playlist could be made up of songs from any group.
- Allow continuous, sequential play of songs from wall or playlist.
