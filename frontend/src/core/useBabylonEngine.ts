import { useEffect, useRef, useState } from 'react'
import { Engine, Scene, ArcRotateCamera, Vector3, WebGPUEngine } from '@babylonjs/core'

// WebGPU 엔진 생성 함수
const createWebGPUEngine = async (canvas: HTMLCanvasElement) => {
  if (await WebGPUEngine.IsSupportedAsync) {
    try {
      const engine = new WebGPUEngine(canvas)
      await engine.initAsync()
      return engine
    } catch (error) {
      console.error('WebGPU 초기화 실패:', error)
    }
  }
  return new Engine(canvas, true)
}

export const useBabylonEngine = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const [engine, setEngine] = useState<Engine | WebGPUEngine | null>(null)
  const [scene, setScene] = useState<Scene | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (canvasRef.current && !isInitialized.current) {
      const init = async () => {
        const newEngine = await createWebGPUEngine(canvasRef.current!)
        const newScene = new Scene(newEngine)

        // 기본 카메라 즉시 생성
        const defaultCamera = new ArcRotateCamera(
          "defaultCamera",
          Math.PI / 2,
          Math.PI / 2.5,
          10,
          Vector3.Zero(),
          newScene
        )
        defaultCamera.attachControl(canvasRef.current, true)

        newEngine.runRenderLoop(() => {
          newScene.render()
        })

        setEngine(newEngine)
        setScene(newScene)
        isInitialized.current = true

        const handleResize = () => newEngine.resize()
        window.addEventListener('resize', handleResize)

        return () => {
          newScene.dispose()
          if (newEngine instanceof WebGPUEngine) {
            newEngine.dispose()
          } else if (newEngine instanceof Engine) {
            newEngine.dispose()
          }
          window.removeEventListener('resize', handleResize)
        }
      }
      init()
    }
  }, [canvasRef])

  return { engine, scene }
} 