## Introduction

This is a [Create React App](https://github.com/facebook/create-react-app) + Redux implementation of the specified technical challenge.

To run the project, cd to package.json location and run 

### `npm start`

This will run the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Design Considerations

The design is quite minimalist. I treated this project as a blog template, and for sites in which users primarily read text I find that flourishes can be distracting more than delightful for the user. For an example of this, please see my own [portfolio sight](http://www.alexgujas.com/), where the visually pleasant animated grains can be disorienting when reading on certain screens.

To keep some measure of visual interest I included an image of our "author", and replaced buttons with elegant .svgs. The one piece of animation is an animated Loading component. All visual flourishes were purposefully understated. 

A final note: the reason for the simple colour palette was that I wanted to implement a dark mode, something I had never done before in a website and was curious to work through. Ultimately I was successful, but the path taken was rather hacky so I have elected to place it in a separate [github repo](https://github.com/washboardalex/locify-tech-exercise-dark-mode). 

I am happy to discuss details of this implementation during the technical interview.

## Broad Logic 

In /src/components/* the most important components for easily digesting my implementation are Home.js and Post.js - they are the components rendered by React-Router, a dynamic routing package which renders routes as components*. The routing occurs in /src/containers/App.js - App.js - there is no state or markup in App.js, it is used entirely for routing.

The Home.js component renders post previews twenty at a time - a button in the form of a .svg (stack of books) calls the fetch method from onClick. The fetch api call indexes at the last unloaded postId to prevent fetching redundant data. Javascript's concat method then joins old and new state to form a new post preview list.

Clicking on a post will load the dynamic ':/postId' url, rendering the Post.js component. no props are passed from Home.js to Post.js because navigating directly to '/23', for example will result in an error if the props object doesn't contain expected values. Using match.url (in this case the path of '/:postId' will produce a match.url === '/23') will result in no errors as all components rendered by React Router receive this prop. A fetch api call dynamically generates data based on the match.url prop.

All other components are elements of these two "pages". 

A Note on Redux: This project might not have necessarily needed redux, which is typically used to scale applications. However, I decided to use it for three reasons:

1. Rob informed me during our chat that Redux state closely mirrors that used by Vue.js - as such I wanted to demonstrate familiarity
2. The apps we will be working on will be intended to scale
3. Ordinary React Classes reset state objects on page load - this creates redundant calls to apis. Because redux state hangs "above" the application, state is more persistent. If this was an actual blog I was maintaining, for example, I would probably still use redux state.

## Potential Improvements

Blogs are more or less a solved problem, so really adding improvements would be a matter of adding the usual UI elements - profiles of writers and commenters, liking comments, notifications, etc.

Other than this, I have noted that my NewComments component does not have any form validation styling - this was not added due to time constraints. Please see koalatransfers.com.au for an example of me implementing form validation. 

Dark Mode: I used a library utilising react hooks to generate a dark mode. Hooks doesn't play well with React Classes and I had utilised the componentDidMount class method in this build. I used the library to build fast, however the same functionality could be achieved with some pre-thought and care using base CSS-in-JS (or maybe something like emotion) coupled with redux. Redux would house the 'isDarkMode' piece of state for the app, and the CSS-in-JS would be used to dynamically generate styles. 

As I say, there was no time to implement this fully so I went for the rough build.

*If the URL matches that of a Route, it will be rendered by React-Router. Otherwise, the Route will render null. 
