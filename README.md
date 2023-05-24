# MemoTest Frontend
### MemoTest Challenge for HeyTutor

This is the frontend application for the MemoTest challenge by HeyTutor. It is built with Next.js.

## Prerequisites

Before running the frontend application, make sure you have the following prerequisites installed on your system:

- Node.js (v18 or later)
- npm (Node Package Manager) or Yarn

## Development Server

To run the frontend application locally, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/Esteban-V/memotest-challenge-frontend.git
```

2. Navigate to the project directory:

```
cd memotest-challenge-frontend
```


3. Install the dependencies:

```
npm install
```
or
```
yarn install
```

4. Start the development server:

```
npm run dev
```
or

```
yarn dev
```
This will start the Next.js development server and compile the application.

5. Access the application in your web browser:

Open http://localhost:3000 to view the application.

The page will automatically reload if you make any changes to the source code.

6. To stop the development server, press `Ctrl + C` in the terminal.

## Docker
Alternatively, you can also run the frontend application using Docker Compose. The provided `docker-compose.yml` file simplifies the setup process.

1. Clone the repository to your local machine (if you haven't done so already).

```
git clone https://github.com/Esteban-V/memotest-challenge-frontend.git
```

2. Navigate to the project directory:

```
cd memotest-challenge-frontend
```

3. Start the Docker containers using Docker Compose:
```
docker-compose up -d
```

This command will download the necessary Docker images, build and start the containers.

4. Access the application in your web browser:

Open http://localhost:3000 to view the application.

5. The page will automatically reload if you make any changes to the source code.

To stop the Docker containers, use the following command:

```
docker-compose down
```
