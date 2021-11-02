# Mobile Legends API

Mobile Legends Unofficial Rest API build with Express and MongoDB database.

## Get a Token

You can't access this API without `token`, so you need to register an account to get your own token.

You need some input to be sent to `http://localhost:3000/register`.

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe76@gmail.com",
  "password": "itsjohndoe"
}
```

**Note**: Don't forget to change your HTTP Request to `POST`, and URL to `http://localhost:3000/register` before sending the user form.

After that, server will response with this

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe76@gmail.com",
  "password": "[encrypted password]",
  "_id": "[random id]",
  "__v": 0,
  "token": "[generated token]"
}
```

The token is only valid for 2 hours, after which the token will expire. To get tokens again, you have to Login.

You need to send Email and Password to `http://localhost:3000/login`. And the server will respond with this.

```json
{
  "_id": "[random id]",
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe76@gmail.com",
  "password": "[encrypted password]",
  "__v": 0,
  "token": "[new generated token]"
}
```

Well you got a new token :).

## Documentation

There is bunch of routes and methods, see all of them below.

- ### Get All Items

```
http://localhost:3000/api/items
```

**Note**: `localhost:3000` is your local address and port `3000` is the default.

If there are no items in the database yet, the result received is an empty array.

But if you have `POST` items to the database (we will discuss later), then the results received will be like below.

```json
[{
    "_id": "[random id]",
    "id_name": "warrior_boots",
    "name": "Warrior Boots", // name of the item
    "attributes": {
        "movement_speed": "40", // for example
        ...
    },
    "passive": "lorem ipsum dolor sit amet", // passive is not required, so you will see items without passive property
    "story": "lorem ipsum dolor sit amet", // not required, contains items story
    "image": "http://domain.com/image.png", // not required, contains image urls
    "category": "movement", // contains one of attack, magic, defense, movement, roaming, jungle.
    "price": "2500", // not required, contains item price.
    "_v": "[random]" // ignore this
}]
```

- ### Get Specific item by `id_name`

```
http://localhost:3000/api/items/get/:id_name
```

`:id_name` is parameter to get item based on `id_name` which is same as parameter.

**Note**: You will only get one item.

```json
{
    "_id": "394839483948394",
    "id_name": "warrior_boots", // parameter
    "name": "Warrior Boots",
    "attributes": {
        "movement_speed": "40",
        ...
    },
    "passive": "lorem ipsum",
    "story": "lorem ipsum dolor sit amet",
    "image": "http://domain.com/image.png",
    "category": "movement",
    "price": "2500",
    "_v": 0
}
```

- ### Get items by `category`

```
http://localhost:3000/api/items/category/:category
```

**Note**: Same as above, `:category` is parameter.

```json
[
  {
    "_id": "394839489384",
    "id_name": "warrior_boots",
    "name": "Warrior Boots",
    "attributes": {
      "movement_speed": "40",
      "physical_defense": "2"
    },
    "story": "lorem ipsum dolor sit amet",
    "image": "http://domain.com/image.png",
    "category": "movement", // parameter
    "price": "2500",
    "_v": 0
  },
  {
    "_id": "238438247824",
    "id_name": "rapid_boots",
    "name": "Rapid Boots",
    "attributes": {
      "movement_speed": "20",
      "mana_regen": "2"
    },
    "story": "lorem ipsum dolor sit amet",
    "image": "http://domain.com/image.png",
    "category": "movement", // parameter
    "price": "3000",
    "_v": 0
  }
]
```

- ### Post Items

```
http://localhost:3000/api/items/new
```

**Note**: Make sure you change the http request method to `POST`.

This route requires data in the form of json. This data can be created with [Postman](https://postman.com), or you can create it in the Frontend with the form. Below are the properties that were sent.

```json
{
  "id_name": "thunder_belt", // make sure it's the same as item name
  "name": "Thunder Belt",
  "attributes": {
    "physical_defense": "40"
  },
  "passive": "lorem ipsum dolor sit amet", // not required
  "story": "lorem ipsum dolor sit amet", // not required
  "image": "http://domain.com/image.png", // not required
  "category": "defense", // attack, magic, defense, movement, roaming, jungle
  "price": "3000" // not required
}
```

- ### Delete an item

```
http://localhost:3000/api/items/delete/:id_name
```

**Note**: Make sure you change the http request method to `DELETE`.

- ### Update an item

```
http://localhost:3000/api/items/update/:id_name
```

**Note**: Make sure you change the http request method to `PATCH`.

Requires json data in the form of property and item values ​​that you want to change.

#### Data before update :

```json
{
  "id_name": "thunder_belt",
  "name": "Thunder Belt",
  "attributes": {
    "physical_defense": "40"
  },
  "passive": "lorem ipsum dolor sit amet",
  "story": "lorem ipsum dolor sit amet",
  "image": "http://domain.com/image.png",
  "category": "defense",
  "price": "3000"
}
```

#### Json data that were sent :

Let's say we want to change `price`, so we pass data in the form of property `price` and the value we want to change to.

```json
{
  "price": "2500"
}
```

#### Data after update :

```json
{
  "id_name": "thunder_belt",
  "name": "Thunder Belt",
  "attributes": {
    "physical_defense": "40"
  },
  "passive": "lorem ipsum dolor sit amet",
  "story": "lorem ipsum dolor sit amet",
  "image": "http://domain.com/image.png",
  "category": "defense",
  "price": "2500" // it will change like this
}
```
