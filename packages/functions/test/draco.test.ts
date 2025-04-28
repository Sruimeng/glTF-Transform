import test from 'ava';
import { Document } from '@sruimeng/gltf-core';
import { draco } from '@sruimeng/gltf-functions';
import { logger } from '@sruimeng/gltf-test-utils';

test('basic', async (t) => {
	const document = new Document().setLogger(logger);
	await document.transform(draco({ method: 'edgebreaker' }));
	await document.transform(draco({ method: 'sequential' }));
	const dracoExtension = document.getRoot().listExtensionsUsed()[0];
	t.is(dracoExtension.extensionName, 'KHR_draco_mesh_compression', 'adds extension');
});
