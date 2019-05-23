## Introduction

This is a [Create React App](https://github.com/facebook/create-react-app) + Redux implementation of the specified technical challenge.

To run the project, cd to package.json location and run 

### `npm start`

This will run the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Design Considerations

Time constraints prevented web design principles being added to the project. I invite you to peruse the following websites for evidence of my capabilities in web design:

www.koalatransfers.com.au

www.alexgujas.com

www.clevetooth.com.au

I am happy to discuss my choices in each of these cases if desired.

## Broad Logic 

In /src/components/* the most important components for easily digesting my implementation are Home.js, UserProfile.js and Video.js - they are the components rendered by React-Router. The routing occurs in /src/containers/App.js - App.js - there is no state or markup in App.js, it is used entirely for routing.

Clicking on a video loaded in Home.js will load the dynamic ':/videoId' url, rendering the Video.js component. no props are passed from Home.js to Video.js because navigating directly to '/23', for example will result in an error if the props object doesn't contain expected values used in componentDidMount(). Using match.params.url (in this case the path of '/:postId' will produce a match.params.url === '/23') will result in no errors as all components rendered by React Router receive the match prop. A fetch api call dynamically generates data based on the url passed by router - if required note that React Router supports nested urls.

Components were written based on the behaviour of React's render tree - I did not want to redundantly re-render pages when lists updated, and also based on the principle of reusability - The Video.js and User.js pages reuse list components, propagated with data by custom api queries.

I used Redux rather than React's out-of-box state management for three reasons:

1. It makes the code more testable
2. It makes code more readable
3. The actions --> dispatch --> reducer --> state formalisation allows for easier scaling
4. Housing state above the component level prevents redundant data fetching on navigation (Going back to Home from Videos or Users, for example)

This app did not necessarily need Redux or even more than one url - however I wanted to evidence some capability on my part to scale an app.

## Potential Improvements

Other than the obvious design overhaul and some tightening of code (for example, you could add a check to the comment component so that if match.params.url is on the user page, the comment component won't render the link to user markup, etc.), I did consider the following:

This improvement is very much a potential in that it requires altering a lot of code and may represent a case of over-optimization. During my build I noticed each 'page' rendered by React Router behaved similarly - componentDidMount() called the fetch api method, which then rendered some markup. A higher order component might provide a lesser codebase to work from as the app scales, similarly a higher order function for the api call might reduce the codebase for actions. 

I am not massively familiar with higher order operations, and I am also aware that the relatively new React Hooks has the useEffect() method, which allows componentDidMount() like functionality in purely functional components and which can replicate much of what HOC do. 
