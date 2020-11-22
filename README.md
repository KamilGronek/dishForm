# Introduction

The application is a simple form based on the rest api,
with request and response using the post method.

The purpose of the application is to be able to complete the order via the form by sending an HTTP request using the POST method.

The main role of the form is functionality. Built on the simple, tidy looking bootstrap 4 interface.

## Live preview

[Link to appication](https://kamilgronek.github.io/dishForm/)

## Technologies

-React 17.0.1
-Node:6.13.4
-Bootstrap 4.5.3

## Construction:

The application has been divided into several components to separate the functional part - App.js from the visual part of the form - DishOrderForm.js and DishOrderTable - displays tables with the result of the last order under the form. DishOrderTableHeader.js - header for it.

## Validation:

In application, in the "No of slices:" input, instead of the type input number, was used type input text. Introduced this solution because I wanted to use the validation on the backend application side, capture the response message and then display it under the field.

## Run applications by create-react-app:

After downloading file to install node.modules environment, in terminal write the command:

```bash
npm install
```

To run the application, in terminal in the main path of the project write the command:

```bash
npm start
```
