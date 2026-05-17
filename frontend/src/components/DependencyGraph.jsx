import React, { useMemo } from 'react'
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType,
  Handle,
  Position
} from 'reactflow'
import 'reactflow/dist/style.css'

const ServiceNode = ({ data }) => {
  return (
    <div style={{
      padding: '10px 20px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'center',
      minWidth: '120px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      position: 'relative'
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#7c5cff' }} />
      <div style={{ marginBottom: 4, opacity: 0.6, fontSize: '10px', textTransform: 'uppercase' }}>Service</div>
      {data.label}
      <Handle type="source" position={Position.Bottom} style={{ background: '#7c5cff' }} />
    </div>
  )
}

const nodeTypes = {
  service: ServiceNode
}

export default function DependencyGraph({ dependencies }) {
  const { nodes, edges } = useMemo(() => {
    if (!dependencies) return { nodes: [], edges: [] }

    const nodes = []
    const edges = []
    const processedNodes = new Set()

    // Simple layout logic (manual grid-ish)
    let x = 0
    let y = 0
    const stepX = 250
    const stepY = 150

    const addNode = (id, label, level) => {
      if (processedNodes.has(id)) return
      processedNodes.add(id)
      
      nodes.push({
        id,
        type: 'service',
        data: { label },
        position: { x: (nodes.length % 3) * stepX, y: Math.floor(nodes.length / 3) * stepY },
      })
    }

    Object.entries(dependencies).forEach(([source, targets]) => {
      addNode(source, source)
      targets.forEach(target => {
        addNode(target, target)
        edges.push({
          id: `e-${source}-${target}`,
          source,
          target,
          animated: true,
          style: { stroke: '#7c5cff', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#7c5cff',
          },
        })
      })
    })

    return { nodes, edges }
  }, [dependencies])

  return (
    <div className="card fade-in" style={{ padding: 24, height: 400, marginTop: 24 }}>
      <div className="sectionTitle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5">
          <path d="M12 2v8m0 4v8m-7-9h14" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" />
        </svg>
        <h2>Infrastructure Dependency Map</h2>
        <div className="badge" style={{ marginLeft: 'auto' }}>AI Mapping Active</div>
      </div>
      
      <div style={{ height: '320px', background: 'rgba(0,0,0,0.2)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          style={{ background: 'transparent' }}
        >
          <Background color="#333" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}
