import test from 'ava';
import { Document, JSONDocument, NodeIO } from '@sruimeng/gltf-core';
import { KHRMeshQuantization } from '@sruimeng/gltf-extensions';
import { cloneDocument } from '@sruimeng/gltf-functions';

const WRITER_OPTIONS = { basename: 'extensionTest' };

test('basic', async (t) => {
	const doc = new Document();
	const quantizationExtension = doc.createExtension(KHRMeshQuantization);
	let jsonDoc: JSONDocument;

	jsonDoc = await new NodeIO().registerExtensions([KHRMeshQuantization]).writeJSON(doc, WRITER_OPTIONS);
	t.deepEqual(jsonDoc.json.extensionsUsed, [KHRMeshQuantization.EXTENSION_NAME], 'writes extensionsUsed');

	quantizationExtension.dispose();

	jsonDoc = await new NodeIO().writeJSON(doc, WRITER_OPTIONS);
	t.is(jsonDoc.json.extensionsUsed, undefined, 'clears extensionsUsed');
});

test('copy', (t) => {
	const doc = new Document();
	doc.createExtension(KHRMeshQuantization);

	t.is(cloneDocument(doc).getRoot().listExtensionsUsed().length, 1, 'copy KHRMeshQuantization');
});
