import test from 'ava';
import { Document } from '@sruimeng/gltf-core';
import { meshopt } from '@sruimeng/gltf-functions';
import { createTorusKnotPrimitive, logger } from '@sruimeng/gltf-test-utils';
import { MeshoptEncoder } from 'meshoptimizer';

test('basic', async (t) => {
	const document = new Document().setLogger(logger);
	document.createMesh().addPrimitive(createTorusKnotPrimitive(document, { tubularSegments: 6 }));

	await document.transform(meshopt({ encoder: MeshoptEncoder }));

	t.true(hasMeshopt(document), 'adds extension');
});

test('noop', async (t) => {
	const document = new Document().setLogger(logger);
	await document.transform(meshopt({ encoder: MeshoptEncoder }));

	t.false(hasMeshopt(document), 'skips extension if no accessors found');
});

const hasMeshopt = (document: Document): boolean =>
	document
		.getRoot()
		.listExtensionsUsed()
		.some((ext) => ext.extensionName === 'EXT_meshopt_compression');
