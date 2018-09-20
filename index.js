const fs = require('fs');
const { randomPoint } = require('@turf/random');

const outFile = 'points.csv';
const numPoints = 30000000;

const bbox = [-180, -90, 180, 90];

fs.writeFileSync(outFile, 'id,longitude,latitude\n', 'utf-8');

for (let i = 0; i < numPoints; i++) {
	const point = randomPoint(1, bbox);
	const coords = point.features[0].geometry.coordinates;
	const file = `id-${i},${coords[0]},${coords[1]}`;

	fs.appendFileSync(outFile, file + '\n', 'utf-8');
	if (i % 100000 === 0) {
		console.log('Processed', i, 'points');
	}
}
