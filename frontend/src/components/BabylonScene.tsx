import { useRef, useEffect } from 'react'
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core'
import { useBabylonEngine } from '../core/useBabylonEngine'

const BabylonScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const { engine, scene } = useBabylonEngine(canvasRef)

  useEffect(() => {
    if (scene && engine && canvasRef.current) {
      // 기존 카메라 제거
      scene.activeCamera?.dispose()

      // 새 카메라 생성
      const camera = new ArcRotateCamera(
        'camera', 
        -Math.PI/2, 
        Math.PI/2.5, 
        10, 
        Vector3.Zero(), 
        scene
      )
      camera.attachControl(canvasRef.current, true)
      scene.activeCamera = camera  // 명시적 활성 카메라 설정
      
      new HemisphericLight('light', new Vector3(1, 1, 0), scene)
      
      const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene)
      sphere.position.y = 1
      
      MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
    }
  }, [scene, engine])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

export default BabylonScene 