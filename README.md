# Streamy

This project is a video streaming app created with React, Tailwind CSS, Redux Toolkit, React Router DOM, and the YouTube API. 
The goal of the project was to replicate the look and feel of the YouTube user interface while incorporating additional features to enhance the user experience.

## Additional Features

1. YouTube-Like UI
    -  The user interface is designed to closely resemble the YouTube platform, providing a familiar and intuitive experience for users.

2. Fully Responsive
    -  The application is fully responsive, ensuring compatibility with various devices and screen sizes.

3. Dark Mode
    -  Streamy comes with a built-in dark mode feature that allows users to switch between light and dark modes based on their preference.
    -  The dark mode feature enhances the user experience and reduces eye strain, especially when viewing videos at night.
      
4. Shimmer UI
    -  Shimmer effects are implemented to enhance the user experience, providing a polished and visually appealing loading experience.
     
5. Hamburger Menu
    -  Implemented a hamburger menu with a home icon, providing a seamless navigation experience. Clicking the home icon redirects users to the home page without triggering a full page reload, enhancing the overall responsiveness and user interface of the project

6. Search Box
    -  Utilizes a live API from YouTube for real-time search results.
    -  Implements debouncing to optimize search requests.
    -  Includes caching mechanisms for improved performance.

7. Video Cards
    -  Utilizes a live API from YouTube for real-time data for thumbnails, description, viewcount etc.
    -  Incorporated the YouTube embed functionality to seamlessly integrate and display videos within the project interface upon clicking on any video cards
   
8. Comments Section
    -  Implements a comments section with hard-coded comments due to YouTube API limitations on nested comments.
    -  Utilizes the concept of recursion to display nested comments.

9. Live Chat
    - Implements a real-time live chat feature.
  
## Technology Stack

- React: Building the user interface and managing the application state.
- Tailwind CSS: Styling the components with a utility-first CSS framework.
- Redux Toolkit: State management for caching, handling search suggestions, and managing comments.
- React Router DOM: Navigating between different pages within the application.
- YouTube API: Fetching video data, search suggestions, and chat comments.

## Chat Feature Implementation
- Utilizes Redux store for managing live chat data.
     - Creates a chatSlice.js to handle chat-related state and logic.
     - Adds chatSlice to the Redux store (e.g., store.js).
     - Enables the sending of custom messages within the live chat.

# Screenshots
 
## LightMode

![streamy](https://github.com/Madhavising/Streamy_App/assets/106488125/a8445498-a56d-4149-90f9-4cb576cdc7b6)

## DarkMode

![Screenshot (173)](https://github.com/Madhavising/Streamy_App/assets/106488125/58cce17f-ca4d-46f6-87c1-4b9507f9f34b)

## WatchPage

![Screenshot (174)](https://github.com/Madhavising/Streamy_App/assets/106488125/5b2051d7-549d-4f4f-8ba9-d89c9177f1a5)


