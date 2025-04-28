import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { readdirSync } from 'fs';

const packagesDir = join(process.cwd(), 'packages');

// 读取所有包目录
const packages = readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// 更新每个包的 package.json
packages.forEach(pkgName => {
  const packageJsonPath = join(packagesDir, pkgName, 'package.json');
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    
    // 更新包名
    if (packageJson.name && packageJson.name.startsWith('@gltf-transform/')) {
      packageJson.name = packageJson.name.replace('@gltf-transform/', '@sruimeng/');
    }
    
    // 更新版本
    packageJson.version = '1.0.0';
    
    // 更新仓库信息
    packageJson.repository = 'github:Sruimeng/glTF-Transform';
    
    // 写回文件
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Updated ${pkgName}`);
  } catch (error) {
    console.error(`Error updating ${pkgName}:`, error);
  }
}); 