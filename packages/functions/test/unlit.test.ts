import test from 'ava';
import { Document } from '@sruimeng/gltf-core';
import { unlit } from '@sruimeng/gltf-functions';

test('basic', async (t) => {
	const document = new Document();
	document.createMaterial();
	await document.transform(unlit());
	const unlitExtension = document.getRoot().listExtensionsUsed()[0];
	t.is(unlitExtension.extensionName, 'KHR_materials_unlit', 'adds extension');
});
