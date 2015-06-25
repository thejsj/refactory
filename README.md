# refactory

Backend-in-a-box that automatically create factories save your data persistently and listen in realtime to changes in your data. Refactory will create all the necessary tables, http routes, client javascript files, and creates listeners for changes in your models in order to push them to the client.

## Setup

1. [Install RethinkDB](http://rethinkdb.com/install)

2. Install through npm

```
npm install refactory
```

## Examples

**Simple Example**

Listen to changes in the `messages` table and the `users` table and create two factories for them.

### Server Side

There are two ways to use reFactory on your server: 1. Through a simple CLI, or 2. A Node.js application

#### CLI

The CLI is the quickest way to get up an running with refactory. It will automatically start serving static files from where the command is currently running.

**1. Start refactory**

```
refactory --models=messages,users --port 8000
```

**2. [Setup refactory in your client code](#client-side)**

#### Module

**1. Require `refactory`, `express` and `http`**

In your Node.js App, require refactory and add it as a middleware to express:

```javascript
var express = require('express');
var http = require('http');
var refactory = require('refactory');
```

**2. Instantiate express app and httpServer**

Create an http server and pass it the express app

```javascript
var app = express();
var httpServer = http.createServer(app);
```
**3. Add refactory as a middleware to express.**

This is where all your http routes will be created. You must all pass the httpServer, so that the socket connection can listen in the same port as your http traffic. Apart from passing the httpServer, you must also pass a list of models that you will you use in the front-end.

```javascript
app
  .use('/refactory', refactory({
    models: ['message', 'user'],
    httpServer: httpServer
  }))
  .use(express.static(__dirname + '/../client'));

httpServer.listen(3000);
```

**4. [Setup refactory in your client code](#client-side)**

### Client Side

**1. Include script in your html**

```html
<html>
    <!-- Include a reference to the client-side javascript file -->
    <script src="/refactory/client.js"></script>
</html>
```

**2. Create a factory for your model**

```javascript
angular.module('rethinkDBWorkshop.services', [])
  .factory('messageFactory', ['refactoryFactory', function (refactoryFactory) {
      return refactoryFactory({
          model: 'message'
      });
  }])
  .factory('userFactory', ['refactoryFactory', function (refactoryFactory) {
      return refactoryFactory({
          model: 'user'
      });
  }])
  .controller('MainController', ['messageFactory', function (messageFactory) {

    // Get the initial state of messages (might be an empty array)
    var messages = messageFactory();

    messages.forEach(function (row) {
      console.log(row);
    });

    // Get all documents
    messageFactory.get().then(function (messages) {
      console.log(messages);
    });

    // The collection of messages will be saved to the database, and then
    // added to the collection in the client
    messageFactory.insert({
      'name': 'jorge',
      'age': 99
    });

    // update document in database
    messageFactory.update({
      id: "bf91cf63-55a7-47bd-8c68-a2396738b34f"
      text: 'hello world!'
    });

    // Delete document in database
    messageFactory.delete({
      id: "bf91cf63-55a7-47bd-8c68-a2396738b34f"
    });

  }]);
```

### CLI Options

| Option Name  | Type   | Default   | Help                                                         |
|--------------|--------|-----------|--------------------------------------------------------------|
| `models`     | array  |           | Comma separated list of models you wish to make available    |
| `port`       | number | 3000      | Port number in which refactory should listen for traffic     |
| `public_dir` | string | ./        | Directory from which to server static assets                 |
| `route`      | string | refactory | Route from which to server will server refactory http routes |
| `db_host`    | string | localhost | Host for RethinkDB                                           |
| `db_port`    | number | 28015     | Port for RethinkDB                                           |
| `db_name`    | string | refactory | Name of database in RethinkDB                                |

### Module Options

| Option Name  | Type   | Default   | Help                                                         |
|--------------|--------|-----------|--------------------------------------------------------------|
| `models`     | array  |           | Comma separated list of models you wish to make available    |
| `httpServer` | object |           | Instance of httpServer (`http` module)                       |
| `db_host`    | string | localhost | Host for RethinkDB                                           |
| `db_port`    | number | 28015     | Port for RethinkDB                                           |
| `db_name`    | string | refactory | Name of database in RethinkDB                                |

