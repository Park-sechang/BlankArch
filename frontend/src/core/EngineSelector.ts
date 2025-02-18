import { Engine, WebGPUEngine } from '@babylonjs/core'

export const getBestEngine = async (canvas: HTMLCanvasElement) => {
  if (await WebGPUEngine.IsSupportedAsync) {
    const engine = new WebGPUEngine(canvas)
    await engine.initAsync()
    return engine
  }
  return new Engine(canvas, true)
} 