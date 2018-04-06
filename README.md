# HomeSweHome

GitHub project page for [HomeSweHome](http://homeswehome.me).

Welcome all dog lovers! If you are looking to discover a new dog, shelter, or park, you have come to the right place! HomeSweHome is the best new site to find your new best friend! For any shelter in your area, you can find which little buddies are living there. In addition, you can see what parks are in the area for you and your friend to have a great time!

## Set Up

Ensure that you have Python3 and Node/NPM installed. Then run the following commands in the project root:

```bash
python3 setup.py install
cd react_app
npm install
npm run build
```

This will install all the Python and Node dependencies you need, as well as compile `bundle.js`

## Development

Ensure that you have already completed the "Set Up" step. Commands assume you start in the project root.

### Backend Development

Running this command will start the Flask development server:

```bash
./run.py
```

This makes it easier to debug as well as reloading any files that change in the directories.

### Frontend Development

If you make changes to the React files, you can recompile the `bundle.js` by running:

```bash
cd react_app
npm run build
```

If you don't want to have to do this every time you make a change to the file:

```bash
cd react_app
npm run watch
```

This will lauch a process that continually watches for changes on your React files and compiles
a new `bundle.js` on save. If you have the server on development mode, the file should be
updated automatically.

## Testing

Testing is split into 4 categories: 

### API Tests

```bash
# make sure you have newman installed
newman run Postman.json
```

Alternatively, you can load `Postman.json` into the Postman GUI.

### Backend Python Tests

To run:

```bash
python3 -m unittest server_tests
```

### Frontend GUI Tests

First download a Selenium driver for the browser of your choice.

```bash
cd frontend
# edit guitests.py to have the path to your Selenium driver
python3 guitests.py
```

### Frontend Code Tests

To run:

```bash
cd react_app
npm install
npm run build
npm run test
```

## Production

Ensure that you have already completed the "Set Up" step. Then run this in the project root:

```bash
./runprod.sh
```

This launches the Flask app in non-development mode, exposed on port 80. Depending on your
permissions, you might have to run this with `sudo`.
