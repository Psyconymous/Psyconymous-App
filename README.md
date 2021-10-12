# Psyconymous App

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript-150x33.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

<img src="https://img.shields.io/github/languages/code-size/Psyconymous/Psyconymous-App?style=for-the-badge">

Safe Place for people to vent their woes
Anonymous and Privacy Oriented

## How it works
In order for the app to function, we need at least 2 people using it at the same time

When the frontend loads, a socket is connected and then placed in a queue to be matched with the second client

Chatting can then be carried out between them
(no data is saved, a refresh will remove it)

However the session ID will be saved to make sure that the connection doesn't interrupted in case of accidental refreshes

## How to install the project

1) Clone The Repo
``` gh repo clone Psyconymous/Psyconymous-App ```
2) Install Dependencies
``` cd Psyconymous-App && npm install ```
3) Run the App in Dev environment using
``` npm run dev ```

## Tech Stack
Frontend
- VueJs
- TailwindCSS

Backend
- Express
- Socket.io
- MongoDB
