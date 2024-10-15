
# DogApp

**DogApp** is a React Native application that showcases a list of dog breeds and their images, with functionalities such as filtering, sharing via social media, and state management using Redux. It also integrates third-party APIs like Dog CEO's Dog API for fetching the data.

## Features

- Browse and display dog breeds with images.
- Masonry-style image grid layout similar to Pinterest.
- Search and filter functionality to find specific dog breeds.
- Integration with external APIs like Dog CEO API.
- Share dog images via social media using `react-native-share`.
- Remote config to update app content without redeployment.
- State management using Redux.
- Unit tests implemented with Jest and React Native Testing Library.
- User authentication via DummyJSON API.

## Screenshots

<!-- Include screenshots of your app -->
<img src="screenshots/screenshot1.png" width="250"/> 
<img src="screenshots/screenshot2.png" width="250"/>

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x - v18.x recommended)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [CocoaPods](https://cocoapods.org/) (for iOS development)

## Installation

Follow the steps below to get the project up and running:

1. Clone the repository:

   ```bash
   git clone https://github.com/codenamerhu/DogApp.git
   cd DogApp
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install iOS dependencies (if you're developing for iOS):

   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App

### For iOS:

```bash
npx react-native run-ios
```

### For Android:

```bash
npx react-native run-android
```

Ensure that you have an emulator running or a physical device connected.

## APIs Used

- **Dog CEO API**: Fetches images and information about dog breeds.
  - [API Documentation](https://dog.ceo/dog-api/documentation/)

- **DummyJSON API**: Used for user authentication.
  - [Login API Documentation](https://dummyjson.com/docs/users#users-login)
  - Use the following credentials for login:
    - **Username/Email**: `emilys`
    - **Password**: `emilypass`

## Usage

The app has the following functionalities:

- Browse and scroll through a list of dog breeds.
- Filter and search for specific breeds.
- User authentication is implemented via the DummyJSON API, allowing login using the provided credentials.
- Share images directly to social media apps like WhatsApp via `react-native-share`.
- Remote config allows changing content without redeploying the app.

## Folder Structure

```plaintext
├── src
│   ├── components        # Reusable UI components
│   ├── containers        # Main container components
|   ├── presenters        # UI Componenets for containerrs/screens
│   ├── redux             # Redux slices and store setup
│   ├── api               # API calls and configuration
│   └── utils             # Utility functions
|       |__ Constants
├── ios                   # iOS-specific files
├── android               # Android-specific files
├── __tests__             # Unit tests for components and logic
├── __mocks__             # Mocks for testing libraries and assets
├── README.md             # Project documentation
├── babel.config.js       # Babel configuration
├── jest.config.js        # Jest configuration (if applicable)
└── package.json          # Project metadata and dependencies
```

## State Management

State is managed using **Redux**. The application leverages Redux Toolkit's slice functionality for managing the list of dog breeds and related states.

### Key Redux Files:

- **dogSlice.tsx**: Manages the state related to the dog breeds (fetching, storing, and filtering).
- **store.ts**: Configures the Redux store.

## Testing

This project uses **Jest** and **React Native Testing Library** for unit testing. It also integrates **SonarQube** for test result processing.

To run the test suite:

```bash
npm test
```

### Unit Tests:

- Tests are located in the `__tests__` folder.
- Mocks for `react-native-fast-image`, `react-native-share`, and other libraries are included in the `__mocks__` folder.

## Tech Stack

- **React Native**: For building the mobile application.
- **Redux**: State management.
- **Jest**: Testing framework.
- **React Native Testing Library**: For component testing.
- **react-native-share**: For sharing dog breed images.
- **@react-native-seoul/masonry-list**: Used for a Pinterest-like grid layout.
- **Dog CEO API**: For fetching dog images and breed data.
- **DummyJSON API**: For user authentication.

## Troubleshooting

### Common Issues:

1. **Metro Bundler not starting**:
   - Ensure that you’ve cleared the cache:
     ```bash
     npm start -- --reset-cache
     ```

2. **CocoaPods issues on iOS**:
   - Run the following commands to resolve iOS-related dependency issues:
     ```bash
     cd ios
     pod install
     cd ..
     ```

3. **Unable to share images**:
   - Ensure `react-native-share` is correctly linked and that permissions are granted on iOS and Android.

