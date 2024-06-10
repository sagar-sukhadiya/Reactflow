import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import TextUpdaterNode from './TextUpdaterNodes';
import './text-updater-nodes.css';

const initialNodes = [
  { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123, color: '' } },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const rfStyle = {
    backgroundColor: '#B8CEFF',
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleColorChange = (color) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode ? { ...node, data: { ...node.data, color } } : node
        )
      );
    }
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node.id);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        style={rfStyle}
        fitView
      />
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button onClick={() => handleColorChange('red')}>Red</button>
        <button onClick={() => handleColorChange('blue')}>Blue</button>
        <button onClick={() => handleColorChange('green')}>Green</button>
      </div>
    </div>
  );
}
