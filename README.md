Generate random points
===

A small script to generate n number of random lng/lat pairs for testing.


## Usage

```sh
git clone https://github.com/mhkeller/gen-points.git && cd gen-points
npm install
npm start
```

Outputs a file `points.csv`.

Note: It write out each point as its processed in case you want to test intermittently or you run out of memory and the script dies.
