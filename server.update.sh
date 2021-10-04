cd Jandy_Web_Back
git fetch origin 
git checkout -t origin/dev dev
git reset --hard HEAD
git pull
cd ..

cd Jandy_Web_Front
git fetch origin
git checkout -t origin/main main
git reset --hard HEAD
git pull
yarn build
cd ..

cd Jandy_Web_Back
docker stop upgle
docker rm upgle
docker rmi upgle

docker build -t upgle .
docker run -d -p 4000:4000 --name upgle upgle
