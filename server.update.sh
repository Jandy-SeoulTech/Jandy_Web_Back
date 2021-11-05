docker stop upgle
docker rm upgle

cd Jandy_Web_Back
git pull
npm install
npm run db:generate
npm run prod-db:push
npm run build
cd ..

cd Jandy_Web_Front
git pull
yarn install
yarn build
rm -rf front_build
cp -r build front_build
rm -rf ../Jandy_Web_Back/front_build
mv ./front_build ../Jandy_Web_Back
cd ..

cd Jandy_Web_Back
docker build -t upgle .
docker run -d -p 4000:4000 --name upgle upgle
docker image prune -f
