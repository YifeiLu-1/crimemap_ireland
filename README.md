# crime_map_ireland

This is the source code of https://crimemap-ireland.netlify.app/, a website which visualize crimes in Ireland.


## Run it locally
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/YifeiLu-1/crime_map_ireland
cd crimemap_ireland
npm i
npm run dev
```

Go to http://localhost:3000 to see your website

## Build and deploy
```sh
npm run generate
```

Upload the dist folder to Netlify

./public/_redirects file is important for Vue SPA routing