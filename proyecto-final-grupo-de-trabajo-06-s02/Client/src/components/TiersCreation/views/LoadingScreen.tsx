import Snap from "snapsvg-cjs-ts"
import { DataCreationContext } from "../DataCreationContext"
import { useContext, useEffect, useState } from "react"

const LoadingBox = () => {

  const { canvas_h, canvas_w } = useContext(DataCreationContext).canvasSizeState.canvasSize
  const [loaded, isLoaded] = useState(false)

  useEffect(() => {
    const url = window.location.host
    const s = Snap("#loadingCont")
    Snap.load(`http://${url}/logo.svg`, (e: any) => {
      s.append(e)
      isLoaded(true)
    })
  }, [])

  useEffect(() => {

    if (!loaded) {
      return
    }

    const circleRadar = Snap("#logo");
    let animating = true;
    circleRadar.attr({
      x: canvas_w / 2 - 15,
      y: canvas_h / 2 - 15,
      width: 30,
      height: 30,
    })

    //animation
    function animOn(time = 1000) {
      if (animating) {
        circleRadar.animate({
          x: canvas_w / 2 - 15,
          y: canvas_h / 2 - 15,
          width: 30,
          height: 30,

          fill: 'none'
        }, time, mina.easeinout, animOut);
      }
    }

    function animOut() {
      if (animating) {
        circleRadar.animate({
          x: canvas_w / 2 - 50,
          y: canvas_h / 2 - 50,
          width: 100,
          height: 100,
          fill: 'none'
        }, 1000, mina.easeinout, animOn);
      }
    }

    animOn(500)

    return (() => {
      animating = false
    })
  }, [loaded])

  return (
    
    <g id="loadingCont">
      <rect
        x={0}
        y={0}
        height={canvas_h}
        width={canvas_w}
        className="loadingBox"
      />
    </g>
    
    )
}

export default LoadingBox;