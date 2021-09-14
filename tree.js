const fsp = require('fs/promises');
const path = require('path');

async function createFileTree(rootFullPath) {
  const root = {
    relPath: '/',
    children: []
  };
  async function createFileTreeRecursive(tree, rootFullPath) {
    try {
      const files = await fsp.readdir(path.join(rootFullPath, tree.relPath), {
        encoding: 'utf8',
        withFileTypes: true
      });
      for (let file of files) {
        const branch = {
          relPath: path.join(tree.relPath, file.name),
          children: []
        };
        if (file.isDirectory()) {
          let branchChild = await createFileTreeRecursive(branch, rootFullPath);
          tree.children.push(branchChild);
        }
        else {
          tree.children.push(branch);
        }
      }
    }
    catch (err) {
      console.log(err);
    }
    return tree;
  }
  let tree = await createFileTreeRecursive(root, rootFullPath);
  return JSON.stringify(tree);
}

async function main() {
  testDir = '/'
  fileTree = await createFileTree(testDir);
  fsp.writeFile(path.join(__dirname, 'fileTreeJSON.json'), fileTree)
}

main();
