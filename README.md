# Convergame Engine
[![Code Climate](https://codeclimate.com/github/convergame/convergame-engine/badges/gpa.svg)](https://codeclimate.com/github/convergame/convergame-engine)

The Convergame engine is a HTML5 game engine combining web development concepts with game development. 

**Please note: THIS PROJECT IS EARLY IN ITS LIFE CYCLE. THE CODE CAN CHANGE DRASTICALLY AT ANY TIME. DO NOT USE THIS FOR COMMERCIAL GAMES UNTIL A STABLE RELEASE IS READY. USE AT YOUR OWN RISK!**

## Documentation

If you're looking to use the Convergame Engine for your next game project, please read our ongoing documentation efforts at: https://convergame.readme.io/docs

## Requirements & Installation
We support two different ways of obtaining the Convergame Engine as you could use the Engine in two different scenarios:

If you are a game developer looking to use the Convergame Engine for your new HTML5 Video Game then please install via [bower](http://bower.io/#getting-started):

`bower install convergame`

Or if you are wanting to add new features or bug fixes to the Convergame Engine then please fork the project, using the fork button at the top of this page.

### Installing Gulp
We use [Gulp](http://gulpjs.com/) to automate the build process of the engine. Before you begin, please ensure that you have [NodeJS, NPM](https://docs.npmjs.com/getting-started/installing-node) & [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) installed globally on your system. Then run the following command from the Convergame Engine directory:

`npm install` 

This will pull in the relevant Node packages, required by gulp. 

## Gulp Tasks

Here are a list of the current gulp tasks for the Convergame Engine:

`gulp` - The default task for error checking and minifying the Convergame Engine code ready to be used for your game. 
`gulp watch` - Checks for changes for the `convergame.js` file and any files within the `ConvergameComponents/` folder.
`gulp jshint` - Run jshint to see any errors/warnings in your JavaScript code. 
`gulp build` - Combine and minify JS files.
`gulp build-dev` - Similar to the command above, but do not minify. <sub><sup>*(Useful for debugging any Convergame Engine modifications!)*</sup></sub>

##Trello Board
The Trello board can be accessed [here](https://trello.com/b/IgbJJAg5). The Trello board is where you can keep track of the Convergame Engine maintainers progress.

# License
The Convergame Engine uses the [LGPLv3]() open source license. We have chosen this license due to the fact that if you publicly make modifications to the engine, (Such as releasing a game using the engine) then you have to share the source code to the version for the Convergame Engine you have made modifications to. The reason for this, is due to the fact that, this allows you and other game developers to benefit from bug fixes and new features. 

Please consider submitting new [pull requests](https://github.com/convergame/convergame-engine/pulls) of any features and bug requests you would like including in the mainline version of the Convergame Engine! 