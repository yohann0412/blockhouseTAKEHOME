## To Run Backend

1. Make sure you have Docker installed.
2. Navigate to the backend directory.
3. Build docker image
4. run the container

   ```bash
   cd blockhouse_api
   docker build -t django-server .
   docker run -d -p 8000:8000 --name django-server django-server
Open your browser and go to http://localhost:8000/api/[any of the endpoints] to see that it works.

## To Run Frontend

1. Navigate to frontend directory
2. Build docker image
3. run the container

   ```bash
   cd blockhouse-final-dashboard
   docker build -t nextjs-app .
   docker run -d -p 3001:3000 --name nextjs-app nextjs-app

Open your browser and go to http://localhost:3000/ and you will see the data appear as expected.


Libraries and tools used:
1. Typescript, recharts, tailwind
2. Django, logging library, testing library

I used gpt to help make the README.me and with minor refactoring of code for clarity/ brevity, but otherwise used the library/ language docs and stack overflow. used gpt for some error debugging with docker since docker compose was being difficult on  my pc, lol.

## Development Process
1. Backend Setup: I started by setting up the backend using Django. I created a simple API with endpoints using the Django REST framework.

2. Frontend Setup: I then set up the frontend using Next.js. I created a dashboard that displays the required charts, tested with dynamic data, and ensured mobile/screen responsiveness.

3. Containerization: I used Docker to containerize both the backend and frontend, allowing for easy deployment and testing of the application.

4. Charts and Styling: I used the Recharts library to create charts in the frontend and Tailwind CSS for styling.

5. Error Logging: I used Python's logging library in Django to log any errors that occur in the backend, which was helpful in preventing issues.

6. Backend Testing: I used Django's testing framework to ensure type safety, data integrity, and consistent data formatting.

## How did I plan/ think about it?

First off, obviously considered SSR but realized it was overkill for a situation like this. axious got the job done but there are certain considerations for production: 
-> may be unsafe and vulnerable to XSS 
-> rendered data could be untrusted
I sent an email yesterday but didn't receive a response so went ahead with this approach.

Backend was fairly straightforward. Just created the endpoints for all of them, stress tested with tests to ensure type safety and data went in a consistent format.

Implemented interfaces for all different kinds of data to ensure it was consistent throughout - chart, bar, line, even candlestick. Typescript helped immensely with ensuring type safety - I've run into errors in the past with dates being technically strings and also numbers - so it was quite easy this time round.

Docker compose is my go to to ensure I can run both files at once, however I decided to separate them as two separate docker files. The build time was a lot combined, and less than half the time when done as individual files. 

Considered state management w/ redux but with the manner I was handling data in the frontend it seemed safe enough for this purpose. With users/ authentication its obviously a lot more nuanced, but for this project, it sufficed not to.

Code design itself was modular and extensible. Created a components folder, ensured that I collected all components into a dashboard and rendered that in the main page to make it easier to analyse and fix errors. Code design of backend was once again straightforward