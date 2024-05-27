## Onboarding Flow Widget

In this project, I've gone with a modular approach that really helps with both the clarity and scalability of our modules. The idea here is to split the application into smaller, standalone pieces that work independently but fit together perfectly. To boost this approach, I'm using Vite as our build and development tool. I chose Vite because it's versatile and efficient. It supports our modular setup by speeding up development cycles and making builds more efficient. This makes it easier to manage and improve the application on an ongoing basis.

## Getting Started

1. Clone the repository to your local machine.

2. Install dependencies by running `yarn` in the project directory.

## Run locally

To run the app locally you need to execute `yarn dev`. This will start the local server at http://localhost:3000 by default, where you can view and interact with your application.

## Test

A testing approach focuses on ensuring that the `Header` and `GroupedTasks` components render correctly and handle inputs as expected, using Jest as testing framework.
For running the tests `yarn test`

## Storybook

To interact with our components and explore their various states, you can run Storybook. This will allow you to see how components behave under different scenarios and how they handle various inputs.
For running storybook `yarn storybook`
