"use client";
import data from '../../Files/2.json';
import { useToast } from "@/components/ui/use-toast"
const File = ({ id, children }) => {
const isLeaf = !children || children.length === 0;
const findPathToLeaf = (node, targetId, path = []) => {
    // Check if the current node is the target leaf node
    if (node && node.id === targetId) {
      return [...path, node.id]; // Return the path including the current node
    }
  
    // Traverse the children nodes recursively
    if (node && node.children) {
      for (const child of node.children) {
        const newPath = findPathToLeaf(child, targetId, [...path, node.id]);
        if (newPath) {
          return newPath; // Return the path if found
        }
      }
    }
  
    // Return undefined if the target leaf node is not found
    return undefined;
  };
  const { toast } = useToast()
const handleClick=(id)=>{const targetId = id;
  
  const path = findPathToLeaf(data.tree, targetId);
  if (path) {
    const pathString = path.join("/");
    navigator.clipboard.writeText(pathString)
      .then(() => {
        toast({
          variant: "default",
          title: "Path copied to clipboard",
          description: pathString,
        })

      })
      .catch((error) => {
        console.error("Failed to copy path to clipboard:", error);
      });
  } else {
    console.log("Node not found");
  }
}
  
  return (
    <div>
      <div style={{ fontWeight: isLeaf ? 'bold' : 'normal', cursor: isLeaf ? 'pointer' : 'default' }} onClick={() => handleClick(id)}>{id}</div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', left: 25, borderLeft: '1px solid', paddingLeft: 15 }}
      >
        {(children ?? []).map((node, index) => <File key={index} {...node} />)}
      </div>
    </div>
  );
};


const App = () => (
  
  <div className='ml-15'>
    <File id={data.tree.id} children={data.tree.children} />
  </div>
  
);

export default App;
