cd Jandy_Web_Back
git fetch origin
git pull
cd ..

cd Jandy_Web_Front
:<<'END'
git fetch origin
git pull
yarn install
yarn build
END
rm -rf front_build
cp -r build front_build
rm -rf ../Jandy_Web_Back/front_build
mv ./front_build ../Jandy_Web_Back
cd ..


cd Jandy_Web_Back
docker stop upgle
docker rm upgle
docker rmi upgle

docker build -t upgle .
docker run -d -p 4000:4000 --name upgle upgle

