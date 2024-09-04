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

