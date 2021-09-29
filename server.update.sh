cd JANDY_WEB_BACK
git fetch origin 
git checkout -t origin/dev dev
git reset --hard HEAD
git pull
cd ..

cd JANDY_WEB_CLIENT
git fetch origin
git checkout -t origin/main main
git reset --hard HEAD
git pull
npm install -g yarn
yarn build
cd ..

cd JANDY_WEB_BACK
docker stop upgle
docker rm upgle
docker rmi upgle

docker build -t upgle .
docker run -d -p 4000:4000 --name upgle upgle
