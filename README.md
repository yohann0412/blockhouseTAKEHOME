To run backend:
make sure you have docker installed
cd blockhouse_api
docker build -t django-server .
docker run -d -p 8000:8000 --name django-server django-server
go to localhost:8000/api/any of the endpoints and you will see that it works.

To run frontend: 
cd blockhouse-final-dashboard
docker build -t nextjs-app .
docker run -d -p 3000:3000 --name nextjs-app nextjs-app

