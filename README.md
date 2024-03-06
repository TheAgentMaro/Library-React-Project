# Library-React-Project

## Project Overview
This project SupWorld aims to develop a graphical interface for the town's library website. The frontend part of the project will be implemented using React.js, and the dataset/API will be sourced from Open Library https://openlibrary.org/developers/api.


## Features

### 1. Quick Search Functionality
- Allows users to search for books across the entire collection.
- Visible on all pages of the website.

### 2. Advanced Search Functionality
- Enables users to perform more specific queries.
- Parameters include title, author, ISBN, subject, place, person, and publisher.
- Implemented on a specific page.

### 3. Recent Changes Display
- Shows recent changes to documents in the library collection.
- Utilizes the RecentChanges API from Open Library.
- Displayed on the main page/index.

### 4. Specific Object Page
- Allows users to view detailed information about a specific book.
- Users can access this page through various search functionalities.

### 5. Wikipedia Integration
- Fetches additional information about books from Wikipedia.
- Displays a short description, book cover, and link to the Wikipedia page.

### 6. Testing
- Implements tests for core functionalities.
- Focuses on ensuring functionality and reliability.

### 7. UI/UX Design
- Emphasizes a user-friendly and intuitive interface.
- Implements responsive design for optimal viewing across devices.

## Information

### API Specification
- Utilizes the Open Library API for accessing book data.
- API documentation available at [Open Library Developers API](https://openlibrary.org/developers/api).

### Wikipedia Integration
- Utilizes Wikipedia APIs or other available methods for fetching additional book information.
- Integration details may vary based on the chosen API.

### Recent Changes API
- Utilizes the RecentChanges API from Open Library to display recent changes to documents in the collection.
- API documentation available at [Open Library RecentChanges API](https://openlibrary.org/dev/docs/api/recentchanges).

## Setup Instructions
1. Clone the repository to your local machine :
```bash
clone https://github.com/TheAgentMaro/Library-React-Project.git
```
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
```bash
npm install 
```
4. Start the development server using `npm run dev`.
```bash
npm run dev
```

## Running Tests
To run the tests locally, follow these steps:

1. Ensure that all dependencies are installed by running:
```bash
npm install 
```
2. Execute the test suite using the following command:
```bash
npm test 
```

## Contributing
- Fork the repository.
- Create a new branch for your feature (`git checkout -b feature/your-feature-name`).
- Commit your changes (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin feature/your-feature-name`).
- Create a new Pull Request.

## Authors
- [TheAgentMaro](https://github.com/TheAgentMaro)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
