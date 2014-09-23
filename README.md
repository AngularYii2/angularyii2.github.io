#DEMO
http://angularyii2.github.io/

# Fundamentals

## Entry Script

The entry script is the bootstrap JS script that handles user requests initially. Entry script called app.js and is at the root of the site.

### Configuration
Section `app.config([...])` have route for your web application. Is defined on the basis of Html5Mode.

**Links**
* [Angular $location](https://docs.angularjs.org/guide/$location)
* [About AJAX Indexing](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started)

## Rest service
Rest service defined on services AngularJS.

```js
app.service('rest', function ($http, $location, $routeParams) {

    return {

        url: undefined,

        models: function () { //GET All Yii2 models
            return $http.get(this.url + location.search);
        },

        model: function () { //GET One Yii2 models by id ($routeParams.id)
            return $http.get(this.url + "/" + $routeParams.id);
        },

        get: function () { //just GET request
            return $http.get(this.url);
        },

        postModel: function (model) {  //POST( contoroller/create ) Yii2 model
            return $http.post(this.url, model);
        },

        putModel: function (model) { //PUT( contoroller/id/update) Yii2 model
            return $http.put(this.url + "/" + $routeParams.id, model);
        },

        deleteModel: function () { //DELETE ( contoroller/id/delete) Yii2 model
            return $http.delete(this.baseUrl + this.path);
        }
    };
});
```

> **NOTE**: When creating your controller, be sure to set `url` rest server:

```js
app.controller('PostIndex', ['rest', function (rest) {
    rest.url = 'http://angular-yii2.tk/v1/posts';
}])
```

**Links**
* [Wiki Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer)
* [Angular REST and Custom Services](https://docs.angularjs.org/tutorial/step_11)

![BigImage](http://i.imgur.com/ldyKKkP.jpg)
