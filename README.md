# React + TypeScript + Vite + Python + MongoDB

This project is docker ready. I ran in docker desktop as I am using Windows machine.

Just fork the repository and run the below commands

1. docker-compose build --no-cache
2. docker-compose up

After this run "docker-compose exec backend python app/seed.py" to populate data in MongoDB

All the necessary dependencies will be downloaded automatically.

Frontend can be accessed at http://localhost:5173/

Backend can be accessed at http://localhost:8000/movies
