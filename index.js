const fs = require('fs');
const { randomPoint } = require('@turf/random');

const outFile = 'points.csv';
const numPoints = 30000000;
const batch = 1000000;

const bbox = [-180, -90, 180, 90];

// Write headers if our file doesn't exist yet, aka we're running this for the first time
if (!fs.existsSync(outFile)) {
	fs.writeFileSync(outFile, 'id,longitude,latitude\n', 'utf-8');
}

let rowId = 0;
for (let i = 0; i < (numPoints / batch); i++) {
	const points = randomPoint(batch, bbox);
	const lines = points.features.map(feature => {
		const coords = feature.geometry.coordinates;
		const line = `id-${rowId++},${trimCoord(coords[0])},${trimCoord(coords[1])}`;
		if (rowId % 1000000 === 0) {
			console.log('Processed', i * batch, 'points');
		}
		return line;
	}).join('\n');

	fs.appendFileSync(outFile, lines + '\n', 'utf-8');
}

function trimCoord (coord) {
	return coord.toFixed(2);
}
