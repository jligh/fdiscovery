#Fashion Discovery App (LookBook)

I chose to try creating this app using a MEAN stack, which I heard is what you guys use. I had never used Node.js with Express, so I figured this was a good way to learn a little more about it. I started with the official MEAN Yeoman generator to get started. I also used a few 3rd party libraries, such as a infinite scroll and masonry grid library to create the Pinterest-like layout.

Because of the Yeoman generator, there's probably quite a few extra things installed here that this particular app doesn't use. If this were a real app, I would also probably have included Sass, but for the purpose of this demo, I just went with regular CSS.

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - [Grunt Task Runner](http://gruntjs.com/), in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

* Install Node and Bower Dependencies for the app
```
npm install
bower install
```

## Seed Data
Run these commands to create seed data in mongodb

```
mongoimport --db fdiscovery-dev --collection looks --drop --file db/looks.json --host=127.0.0.1
mongoimport --db fdiscovery-dev --collection authors --drop --file db/authors.json --host=127.0.0.1
```

## Run the Grunt server
```
grunt
```

The app should default to http://localhost:3000