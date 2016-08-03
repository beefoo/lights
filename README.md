# Light Reminders

A lightweight web app to help you keep the lights of your friendships on. Also integrates with your physical lights via [Philips Hue](http://www2.meethue.com/en-us/) lights

## Requirements

To run:
* PHP 5.6+
* MySQL 5.1+

To develop UI:
* node.js

To integrate with your physical lights:
* [Philips Hue](http://www2.meethue.com/en-us/) bridge and lightbulb

## Installation

1. Clone codebase on to PHP and MySQL enabled-server
2. Configure your app:
  * Update `./api/application/config/database.php` with database credentials
  * Update `./api/application/config/config.php` with your `base_url`, e.g. `http://localhost/api/`
3. To setup database, in browser go to `http://localhost/api/migrate`
4. Visit `http://localhost/`, register a new user, add relationships and meetings

## Integration with your Philips Hue lights

1. [Follow the steps](http://www.developers.meethue.com/documentation/getting-started) to obtain your bridge's IP address and generate/obtain your username
2. Create a file at `./js/config.js` based on [./js/config.sample.js](js/config.sample.js)
3. Fill in your `hueEndpoint` and `hueUsername` based on step 1
4. Create a new entry in your config called `lights` that look like [this](src/js/config.js):

   ```
   var PROJECT_CONFIG = {
     ...
     lightLevelRange: [0, 9],
     lights: [
       {value: 'bedroom', label: 'Bedroom', hueLightId: '1', image: 'img/lights/bedroom/light{level}.jpg'},
       {value: 'corridor', label: 'Corridor', hueLightId: '2', image: 'img/lights/corridor/light{level}.jpg'},
       {value: 'dining', label: 'Dining', hueLightId: '3', image: 'img/lights/dining/light{level}.jpg'},
       {value: 'kitchen', label: 'Kitchen', hueLightId: '4', image: 'img/lights/kitchen/light{level}.jpg'},
       ...
     ],
     ...
   }
   ```
5. Update the list of lights that correlate to the lights in your home; you can customize the labels and images
6. In the app `http://localhost/`, update your relationships with the appropriate lights that you defined in the previous step
7. Now your physical lights should reflect the state of the virtual lights in the app

## Developing the UI

1. Install node modules `npm install`
2. Install gulp (if necessary) `npm install --global gulp-cli`
3. Run `gulp`
4. Changes to .js, .scss, and .ejs files will be watched and compiled
