import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { readdirSync } from 'fs';

const packagesDir = join(process.cwd(), 'packages');

// 读取所有包目录
const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// 更新每个包的测试文件
packages.forEach(pkgName => {
  const testDir = join(packagesDir, pkgName, 'test');
  
  try {
    // 读取所有测试文件
    const testFiles = readdirSync(testDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.test.ts'))
      .map(dirent => dirent.name);
    
    testFiles.forEach(testFile => {
      const filePath = join(testDir, testFile);
      let content = readFileSync(filePath, 'utf8');
      
      // 替换包名引用
      content = content.replace(/@sruimeng\/gltf-core/g, '@sruimeng/gltf-core');
      content = content.replace(/@sruimeng\/gltf-extensions/g, '@sruimeng/gltf-extensions');
      content = content.replace(/@sruimeng\/gltf-functions/g, '@sruimeng/gltf-functions');
      content = content.replace(/@sruimeng\/gltf-test-utils/g, '@sruimeng/gltf-test-utils');
      
      // 写回文件
      writeFileSync(filePath, content);
      console.log(`Updated ${pkgName}/test/${testFile}`);
    });
  } catch (error) {
    console.error(`Error updating ${pkgName}:`, error);
  }
}); 