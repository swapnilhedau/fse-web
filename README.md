# FseWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Push project to Github
> cd fse-web
> git init
> git add .
> git remote add origin https://github.com/swapnilhedau/fse-web.git
> git commit -m "first commit"
> git push -u origin master


## Install angular material
npm install --save @angular/material@7.3.7 @angular/cdk@7.3.7 @angular/animations@7.0.3


## Add Theme
add below theme import to styles.css
`@import '@angular/material/prebuilt-themes/deeppurple-amber.css';`

## Add Material icons
add below styles in index.html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

## --dry-run
use this flag to view what will be generated

## Changes to run tests without actually opening chrome browser
add below in package.json file under scripts
"test-headless": "ng test --watch=false --browsers=ChromeHeadless"

> ng test-headless


## create domain class
> ng g class /domain/user
> ng g class /domain/project
> ng g class /domain/task
> ng g class /domain/viewtask

## create component
> ng g c users
> ng g c projects
> ng g c tasks
> ng g c viewtasks

## create service 
> ng g service /service/user
> ng g service /service/project
> ng g service /service/task
> ng g service /service/viewtask



## Build docker image
> cd fse-web
> ng build --prod
> docker build -t fse-web:latest .

## Run image
> docker run --name fse-web -d -p 8080:80 fse-web:latest
> docker container ls

## check nginx container if app is deployed 
> docker container exec -it <container_id> /bin/sh
> cd /usr/share/nginx/local
> ls 
> less index.html

## Push local image to docker hub registry
> docker tag fse-web:latest swapnilhedau/fse-web:latest
> docker push swapnilhedau/fse-web:latest

# Code Factor Rating [![CodeFactor](https://www.codefactor.io/repository/github/swapnilhedau/fse-web/badge)](https://www.codefactor.io/repository/github/swapnilhedau/fse-web)

# CircleCI status [![CircleCI](https://circleci.com/gh/swapnilhedau/fse-web/tree/master.svg?style=svg)](https://circleci.com/gh/swapnilhedau/fse-web/tree/master) 
