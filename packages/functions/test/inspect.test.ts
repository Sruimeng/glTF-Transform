import path, { dirname } from 'path';
import test from 'ava';
import { NodeIO } from '@sruimeng/gltf-core';
import { inspect } from '@sruimeng/gltf-functions';
import { logger } from '@sruimeng/gltf-test-utils';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('basic', async (t) => {
	const io = new NodeIO();
	const doc = await io.read(path.join(__dirname, 'in/TwoCubes.glb'));
	doc.setLogger(logger);

	doc.createAnimation('TestAnim');
	doc.createTexture('TestTex').setImage(new Uint8Array(10)).setMimeType('image/fake');

	const report = inspect(doc);

	t.truthy(report, 'report');
	t.is(report.scenes.properties.length, 1, 'report.scenes');
	t.is(report.meshes.properties.length, 2, 'report.meshes');
	t.is(report.materials.properties.length, 2, 'report.materials');
	t.is(report.animations.properties.length, 1, 'report.animations');
	t.is(report.textures.properties.length, 1, 'report.textures');
});
