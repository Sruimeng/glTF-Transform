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
    
    // 更新依赖项
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach(dep => {
        if (dep.startsWith('@gltf-transform/')) {
          const newDep = dep.replace('@gltf-transform/', '@sruimeng/gltf-');
          packageJson.dependencies[newDep] = '1.0.0';
          delete packageJson.dependencies[dep];
        }
      });
    }
    
    // 更新作者信息
    packageJson.author = 'Sruimeng';
    
    // 移除不必要的字段
    delete packageJson.funding;
    delete packageJson.gitHead;
    
    // 添加 publishConfig
    packageJson.publishConfig = {
      access: 'public'
    };
    
    // 写回文件
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Updated ${pkgName}`);
  } catch (error) {
    console.error(`Error updating ${pkgName}:`, error);
  }
}); 