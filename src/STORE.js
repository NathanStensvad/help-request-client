export default {
    "users": [
        {
            "id": 1,
            "name": "Alfred",
            "password": "password1"
        },
        {
            "id": 2,
            "name": "Brittany",
            "password": "password2"
        },
        {
            "id": 3,
            "name": "Charlie",
            "password": "password3"
        },
        {
            "id": 4,
            "name": "Delaine",
            "password": "password4"
        }
    ],
    "posts": [
        {
            "id": 1,
            "user_id": 1,
            "solved": true,
            "date_bumped": "2021-01-13T23:24:00.001Z",
            "date_created": "2021-01-12T23:24:00.001Z",
            "title": "RPG Game: Where you play as a basketball player in a postapocalyptic setting",
            "text": "I think there was a Charles Barkley or something. Michael Jackson was a boss you had to fight. Sorry, don't remember details",
        },
        {
            "id": 2,
            "user_id": 4,
            "solved": false,
            "date_bumped": "2021-01-13T23:24:00.001Z",
            "date_created": "2019-12-16T23:24:00.001Z",
            "title": "Gamecube game: RTS with goblins",
            "text": "You can control a big ogre to eat things. I think it was on Gamecube but I'm not sure.",
        },
    ],
    "replies": [
        {
            "id": 1,
            "post_id": 1,
            "user_id": 2,
            "solved": false,
            "text": "Is it My Little Pony?",
        },
        {
            "id": 2,
            "post_id": 1,
            "user_id": 3,
            "solved": true,
            "text": "Is it Charles Barkley Shut Up and Jam: Gaiden?"
        },
        {
            "id": 3,
            "post_id": 2,
            "user_id": 2,
            "solved": false,
            "text": "Is it My Little Pony?"
        },
        {
            "id": 4,
            "post_id": 2,
            "user_id:": 3,
            "solved": null,
            "text": "Is it Goblin Commander?"
        }
    ]
}