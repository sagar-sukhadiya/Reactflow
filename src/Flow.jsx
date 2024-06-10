import { useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, { addEdge, MiniMap, applyNodeChanges, applyEdgeChanges } from 'reactflow';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#6ede87', color: 'white' },
  },
  {
    id: '2',
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#6865A5', color: 'white' },
  },
//   {
//     id: '3',
//     data:  { label: <div>Output</div> },
//     position: { x: 250, y: 250 },
//   },
//   {
//     id: '4',
//     type: 'output',
//     data: { label: 'Try' },
//     position: { x: 300, y: 350 },
//   },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
//   { id: 'e2-3', source: '2', target: '3' },
//   { id: 'e3-4', source: '3', target: '4' },

];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => {
      console.log('Node changes:', changes);
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes) => {
      console.log('Edge changes:', changes);
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const nodeColor = (node) => {
    switch (node.type) {
      case 'input':
        return '#000';
      case 'Default Node':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  };


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    panOnScroll
    selectionOnDrag
      fitView
    >
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
    </ReactFlow>
  );
}

export default Flow;
