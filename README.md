# LocalQuery: Ask Questions, Get Local Answers

## Introduction

Welcome to LocalQuery, where you can get your local questions answered by people near you! Inspired by the story of Amine, who had just arrived in a new city, LocalQuery aims to help people find local information quickly and accurately. Users can post questions related to a location and receive answers from other users in the vicinity.

## Technologies Used

- **Backend**: Ruby On Rails, MongoDB
- **Frontend**: Bootstrap, Angular

## Features

### Core Features

1. **User Authentication**: Users can sign up and sign in using their email and password.
2. **Post a Question**: Users can post questions with attributes like title, content, and location.
3. **Answer Questions**: Any registered user can answer a question.
4. **List Questions by Distance**: Users can see a list of questions sorted by how close they are to their current location.
5. **Like a Question**: Users can like questions, allowing them to keep track of their favorite ones.
6. **List of Liked Questions**: Users can view a list of questions they have liked.
7. **Remove a Question from Favorites**: Users can unlike a question to remove it from their list of favorites.
8. **View Questions on a Map**: Users have the option to view questions on a Google Map, with markers indicating the location of each question.

## Installation

### Prerequisites

- Ruby On Rails
- MongoDB
- Angular CLI
- Bootstrap

### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/ymsoufiane/NearbyQA
    ```

2. **Navigate to project directory**

    ```bash
    cd backend
    ```

3. **Install Backend Dependencies**

    ```bash
    bundle install
    ```

4. **Install Frontend Dependencies**

    ```bash
    cd frontend
    npm install
    ```

5. **Start the Backend Server**

    ```bash
    rails server
    ```

6. **Start the Frontend Server**

    ```bash
    ng serve
    ```

## Usage

1. Open your browser and navigate to `http://localhost:4200`
2. Sign up or sign in to your account.
3. Explore local questions or post one of your own!


