# Slicer

## Getting started

First, make sure you have `nodejs` and `npm` installed on your local machine.
Then install the dependencies for this project:

```sh
npm install
```

## Development

Get the server up and running with `nodemon` using

```sh
npm run dev
```

and run tests with

```
npm test
```

## Usage

To start the server, run

```sh
npm start
# OR with a custom port
PORT=4567 npm start
```

All files are saved to the uploads folder. To clear that folder of anything not
created in the current month, run

```sh
npm run clear
# OR
bin/clear
```

## API

There are two endpoints.

* <a href="#post-">`POST /`</a> for posting the image to be cut
* <a href="#get-uploadspathtoimagejpg">`GET /uploads/{path/to/image.jpg}`</a> to download the images

---

#### `POST /`

The endpoint expects the `content-type: multipart/form-data` with the following:

---

**`image`**

A binary file:

```
foo.jpg
```

---

**`derivatives`**

A valid JSON object including dimensions for different derivatives:

```js
{
  "bar": [
    [5, 15], // Starting at top left,
    [25, 35] // Going to bottom right
  ],
  "baz": [
    [0, 0],
    [15, 15]
  ]
}
```

---

The API returns the following `json`:

```json
{
  "slices": [
    "http://localhost:1234/uploads/YYYY-MM-DD/foo-bar.jpg",
    "http://localhost:1234/uploads/YYYY-MM-DD/foo-baz.jpg"
  ]
}
```

Or if there's an error:

```json
{
  "error": "This went wrong"
}
```

---

#### `GET /uploads/{path/to/image.jpg}`

The links that are returned are valid GET requests:

```
http://localhost:1234/uploads/YYYY-MM-DD/foo-baz.jpg
```
