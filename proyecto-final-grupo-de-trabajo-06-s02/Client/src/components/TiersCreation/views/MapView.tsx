/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useState } from "react"
import Snap from "snapsvg-cjs-ts";
import { DataCreationContext } from "../DataCreationContext"
import LoadingBox from "./LoadingScreen";
import { AuthContext } from "../../../utils/AuthContext";


const MapView = ({ location_id }: { location_id: string }) => {

  const { blockIdState, blockJsonDataState, canvasSizeState, mapUrlState } = useContext(DataCreationContext)

  const { mapUrl } = mapUrlState
  const [, setBlockID] = blockIdState
  const { canvas_h, canvas_w } = canvasSizeState.canvasSize
  const { blockJsonData: tiersJson, setBlockJsonData} = blockJsonDataState
  const [token] = useContext(AuthContext).token
  const [loaded, isLoaded] = useState(false)

  useEffect(() => {

    isLoaded(false);
    const s = Snap("#svgout");
    const fragList: any[] = [];

    const addLoadedFrags = (element: string) => {
      const f = Snap.parse(element)
      const MAP = Snap("#MAP")
      const STAGE = Snap.selectAll("#STAGE")

      fragList.push(f)

      fragList.forEach((f) => {
        
        
        if(MAP != undefined){
          MAP.parent().node.remove()
        }
        s.append(f)

      })

      console.log("Loaded")

    }

    (async () => {

      if (!mapUrl) {
        return;
      }

      const svg: string = (await new Promise((res, rej) => {

        const req = Snap.ajax(`https://sivtickets.s3.amazonaws.com/${mapUrl}.svg`, () => { console.log() })

        req.onload = function () {
          if (req.status === 200) {
            res(req.responseText);
          } else {
            rej(req.statusText);
          }
        };
      }))

      addLoadedFrags(svg)

      const jsonData = await (await fetch(`http://api.sivtickets.fun:80/events/creation/location/tiers/${location_id}/`,{
        headers: {
          "Authorization": "Bearer "+token
        }
      })).json()
        
      /*
        const jsonData: string = (await new Promise((res, rej) => {
        const url = "api.sivtickets.fun:80"

        //const route = "event/tiers/all"
        const route = "events/creation/location/tiers"

        const req = Snap.ajax(`http://${url}/${route}/${location_id}`, () => { console.log() })

        req.onload = function () {
          if (req.status === 200) {
            res(req.responseText);
          } else {
            rej(req.statusText);
          }
        };
      }))
      setTierJsonData(JSON.parse(jsonData))
      */
      setBlockJsonData(jsonData)

      s.children().forEach((e: Snap.Element) => {
        const data = e.getBBox()

        if (e.type === "svg") {
          e.attr({
            height: data.h * 0.5,
            width: data.w * 0.5
          });
        }
      })

      isLoaded(true);

    })()


  }, [mapUrl, location_id])

  useEffect(() => {

    if (!loaded) {
      return
    }

    if (!tiersJson) {
      return
    }

    const s = Snap("#svgout")
    const MAP = Snap("#MAP")
    
    
    /**
     * Set controllers, map atrributes
    const CONTRzOLLERS = Snap("#zoom_controllers")
    
    CONTROLLERS.attr({
      "classname": "hoverControllers",
      cursor: 'pointer',
      x: canvas_w * 0.80,
      y: canvas_h * 0.10,
      height: canvas_h * 0.35,
      width: canvas_w * 0.15
    })
    */
    
    
    MAP.attr({
      cursor: 'pointer', "class": "mapSvg",
    });

    MAP.parent().attr({
      "class": "mapSvg",
      width: parseFloat(s.attr("width")) * 0.60,
      height: parseFloat(s.attr("height")) * 0.60
    })


    MAP.parent().attr({
      x: canvas_w / 2 - parseFloat(MAP.parent().attr("width")) / 2,
      y: canvas_h / 2 - parseFloat(MAP.parent().attr("height")) / 2,
    })

    try {

      MAP.children().forEach(tier => {

        tier.toggleClass("hoverPath", true)

        tier.click((e) => {
          tierClick(tier, e);
        })

      })
    } catch (e) {
      console.log(e)
    }

    const tierClick = (tierElement: Snap.Element, e: MouseEvent) => {

      const id = tierElement.node.id.slice(-36)

      e.preventDefault()
      console.log(id)
      setBlockID(id)

    }

    /**
     * Set zoom actions
     */

    let zoom = 0;

    const resetSize = {
      w: parseFloat(MAP.parent().attr("width")),
      h: parseFloat(MAP.parent().attr("height")),
      vbox: MAP.parent().getBBox(),
      x: parseFloat(MAP.parent().attr("x")),
      y: parseFloat(MAP.parent().attr("y")),
    }

    const vbChange = [0, 0, resetSize.vbox.w, resetSize.vbox.h]

    const zoomAction = (controller: Snap.Element, e: MouseEvent) => {

      e.preventDefault();

      switch (controller.node.id) {
        case "zoom_out_button":

          zoom -= 0.1
          vbChange[2] += 50
          vbChange[3] += 50

          if (resetSize.w * (1 + zoom) < 20 || resetSize.w * (1 + zoom) < 20) {
            return
          }

          MAP.parent().attr({
            width: resetSize.w * (1 + zoom),
            height: resetSize.h * (1 + zoom),
            viewBox: `${vbChange[0]},${vbChange[1]},${vbChange[2]},${vbChange[3]}`

          })

          break;

        case "zoom_in_button":

          zoom += 0.1
          vbChange[2] -= 50
          vbChange[3] -= 50


          if (vbChange[2] < 0 || vbChange[3] < 0) {
            vbChange[2] += 50
            vbChange[3] += 50
            return
          }

          MAP.parent().attr({
            width: resetSize.w * (1 + zoom),
            height: resetSize.h * (1 + zoom),
            viewBox: `${vbChange[0]},${vbChange[1]},${vbChange[2]},${vbChange[3]}`
          })

          break;

        case "reset_button":

          MAP.parent().attr({

            x: resetSize.x,
            y: resetSize.y,
            width: resetSize.w,
            height: resetSize.h,
            viewBox: resetSize.vbox.vb
          })

          vbChange[0] = 0
          vbChange[2] = 0
          vbChange[2] = resetSize.vbox.w
          vbChange[3] = resetSize.vbox.h
          zoom = 0;

          break;
        default: break;
      }
    }

    /**
     * 
    CONTROLLERS.children().forEach(controll => {
      
      if (controll.type === "g") {
        controll.click((e) => zoomAction(controll, e))
        controll.touchstart((e) => { zoomAction(controll, e) })
      }
    })
    */

    /**
     * Set Movement listeners
     */
    let movementCoords = { x_pos: 0, y_pos: 0 }

    let previousTouch: any;

    const onTouchMove = (e: any) => {


      e.preventDefault();

      const touch = e.touches[0]
      const dx = touch.pageX - previousTouch.pageX
      const dy = touch.pageY - previousTouch.pageY

      if (e.touches.length > 1) {
        onMove(dx, dy, 0, 0, e)
      }

    }
    const onMove = (dx: number, dy: number, _x: number, _y: number, _event: Event) => {

      MAP.parent().attr({
        x: movementCoords.x_pos + dx,
        y: movementCoords.y_pos + dy,
      })
    }

    const startTouch = (e: any) => {
      previousTouch = e.touches[0]
      startMove(0, 0, e)
    }
    const startMove = (_x: number, _y: number, _event: MouseEvent) => {

      movementCoords = {
        x_pos: parseFloat(MAP.parent().attr("x")),
        y_pos: parseFloat(MAP.parent().attr("y"))
      }

    }
    const endMove = (_event: MouseEvent) => {
      console.log("end move")

    }

    /**
     * 
    s.drag(onMove, startMove, endMove)
    s.touchstart(startTouch)
    s.touchmove(onTouchMove)
    s.drag(onMove, startMove, endMove)
    */

    return (() => {
      s.undrag()
    })

  }, [loaded, tiersJson])

  return (
    <svg
      id="svgout"
      height={canvas_h}
      width={canvas_w}
      x={0}
      y={0}
      className="stroke mapcontainer"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >

      {
        !loaded &&
        <LoadingBox />
      }


    </svg>
  );

}

export default MapView;