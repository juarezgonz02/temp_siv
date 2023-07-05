/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

import { useContext, useEffect, useState } from "react"
import { DataCreationContext } from "../DataCreationContext"
import LoadingBox from "./LoadingScreen"
import Snap from "snapsvg-cjs-ts"
import { saveSeats, getSeats } from "../utils/saveSeats"
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { Space } from "antd";

interface seatsType {
    labels: {
        x: string[];
        y: string[];
    };
    seats: Array<Array<string>>
}

const SeatSelector = ({tierID}:{tierID: string}) => {

    const { tierIdState, tierJsonDataState, canvasSizeState, availabilityDataState } = useContext(DataCreationContext)

    const { canvas_h, canvas_w } = canvasSizeState.canvasSize
    const {setTierID } = tierIdState
    const { availabilityData } = availabilityDataState
    const [loaded, isLoaded] = useState(false)
    const tiers = tierJsonDataState.tierJsonData
    const [seatData, setSeatData] = useState<seatsType>()
    const [seatIco, setIco] = useState<any[]>()
    const [price, setPrice] = useState<number>(0)
    const [name, setName] = useState("")

    const [selectedSeats, addSeat] = useState<string[]>([])

    useEffect(() => {

        const myLoadList = ["seatIco"]

        const addLoadedFrags = (element: string) => {
            const f = Snap.parse(element)

            const fs = [f]
            setIco(fs)

        }

        (async () => {
            try {
                const jsonData: string = (await new Promise((res, rej) => {
                    const url = window.location.host
                    
                    const req = Snap.ajax(`https://sivtickets.s3.amazonaws.com/tiers/${tierID}.json`, () => { })

                    req.onload = function () {
                        if (req.status === 200) {
                            res(req.responseText);
                        } else {
                            rej(req.statusText);
                        }
                    };
                }))


                for (let i = 0; i < myLoadList.length; i++) {

                    const svg: string = (await new Promise((res, rej) => {

                        const req = Snap.ajax(`https://sivtickets.s3.amazonaws.com/${myLoadList[i]}.svg`, () => { })

                        req.onload = function () {
                            if (req.status === 200) {
                                res(req.responseText);
                            } else {
                                rej(req.statusText);
                            }
                        };
                    }))

                    addLoadedFrags(svg)

                }


                const selected = getSeats(tierID)?.selected

                if (selected != undefined) {

                    addSeat(selectedSeats.concat(selected!))
                }

                setSeatData(JSON.parse(jsonData))

                tiers?.forEach((tier) => { 
                    if(tier.tierId == tierID){
                        setPrice(tier.price);
                        setName(tier.requestedName);
                    
                    }})
                
                isLoaded(true)

            } catch (e) {
                //console.log(e)

            }

        })()
    }, [])

    useEffect(() => {

        if (!loaded) {
            return
        }

        const s = Snap("#svgseats")

        s.append(seatIco![0])

        const seatIcon = document.getElementById("seatIco")!.cloneNode(true);
        document.getElementById("seatIco")?.remove()

        const seatClick = (_e: MouseEvent, element: Snap.Element) => {

            try {
                const selectedArray = selectedSeats
                selectedArray.push(element.node.dataset.name!);
                addSeat(selectedArray)
            }
            catch (e) {
                //console.log(e)
            }

            if (element.hasClass("selected")) {
                element.removeClass("selected")
                element.addClass("available")
            }
            else {
                element.addClass("selected")
            }

        }

        let x_pos = 50;
        seatData!.labels.x.forEach(t => {

            s.text(x_pos, 50, t)
            x_pos += 25
        })

        let y_pos = 100;
        seatData!.labels.y.forEach(t => {

            s.text(0, y_pos, t)
            y_pos += 25
        })

        x_pos = 50;
        y_pos = 85;

        for (let i = 0; i < seatData!.labels.y.length; i++) {

            for (let j = 0; j < seatData!.labels.x.length; j++) {

                const name = `${seatData!.seats[i][j]}` !== "" ? `${seatData!.seats[i][j]}` : "blank"

                const indexInSelectedList = (selectedSeats.findIndex(
                    (seat) => {
                        return seat === `${seatData!.labels.x[j]}${seatData!.labels.y[i]}`
                    }
                ))
                const indexInAvailList = (availabilityData?.sold.findIndex(
                    (asiento) => {
                        
                        //console.log(asiento, `${seatData!.labels.x[j]}${seatData!.labels.y[i]}`)
                        return asiento === `${seatData!.labels.x[j]}${seatData!.labels.y[i]}`
                    }
                    ))

                //console.log(indexInAvailList)

                const row = s.el("svg", {
                    "data-name": `${seatData!.labels.x[j]}${seatData!.labels.y[i]}`,
                    x: x_pos,
                    y: y_pos,
                    height: 15,
                    width: 15
                })

                const isSelected = (indexInSelectedList != undefined && indexInSelectedList !== -1)

                const isSold = (indexInAvailList != undefined && indexInAvailList !== -1)
                
                
                if (!isSelected && !isSold) {
                    row.attr({
                        "class": "available",
                    })

                    row.click((e) => {
                        seatClick(e, row)
                    })
                }
                else if (isSold) {
                    row.attr({
                        "class": "taken",
                    })
                } else {
                    row.attr({
                        "class": "selected",
                    })
                    row.click((e) => {
                        seatClick(e, row)
                    })
                }


                if (name !== "blank") {
                    row.node.appendChild(seatIcon.cloneNode(true))
                }

                x_pos += 25
            }
            x_pos = 50
            y_pos += 25
        }

        Snap.selectAll("#seatIco").forEach((element: Snap.Element) => {
            element.attr({
                width: 20,
                height: 20
            })
        });

        const container = Snap("#seatsContainer")

        container.attr({
            height: container.getBBox().height + 100
        })

        s.attr({
            x: canvas_w / 2 - s.getBBox().w / 2,
            height: container.getBBox().height + 50,
            width: canvas_w
            //  "viewBox" : `0 0 ${s.getBBox().width} ${s.getBBox().height}`  
        })

        let movementCoords = { x_pos: 0, y_pos: 0 }

        // //console.log(s)
        let previousTouch: any;

        const onTouchMove = (e: any) => {

            const touch = e.touches[0]

            ////console.log(previousTouch)

            const dx = touch.pageX - previousTouch.pageX
            const dy = touch.pageY - previousTouch.pageY

            if (e.touches.length > 1) {
                onMove(dx, dy, 0, 0, e)
            }

            //previousTouch = touch;
        }

        const onMove = (dx: number, dy: number, _x: number, _y: number, _event: Event) => {

            _event.preventDefault();

            s.attr({
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
                x_pos: parseFloat(s.node.attributes.getNamedItem("x")!.value),
                y_pos: parseFloat(s.node.attributes.getNamedItem("y")!.value)
            }

            ////console.log("Start move")
            ////console.log(movementCoords)

        }

        const endMove = (_event: MouseEvent) => {
            ////console.log("end move")

        }

        Snap("#seatsContainer").drag(onMove, startMove, endMove)
        Snap("#seatsContainer").touchstart(startTouch)
        Snap("#seatsContainer").touchmove(onTouchMove)


    }, [seatData, seatIco])


    return <div className="seats-svg-container">
        <svg
            id="seatsContainer"
            height={canvas_h}
            width={canvas_w}
            x="0"
            y="0"
            className="stroke seatsContainer"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >

            <svg
                id="svgseats"
                height={canvas_h}
                width={canvas_w}
                x="0"
                y="0"
                className="stroke svgseats"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
            ></svg>

            {
                !loaded &&
                <LoadingBox/>
            }
        </svg>

        <Space size={[8, 10]}>

            <button className="close" onClick={() => { setTierID("") }}>
                <ArrowLeftOutlined style={{ color: 'black' }}/>
                Volver
            </button>

            <button className="close" onClick={() => { setTierID(""); saveSeats(tierID, name, price, selectedSeats) }}>
                <CheckOutlined style={{ color: 'black' }}/>
                Confirmar
            </button>
        </Space>

    </div>
}
export default SeatSelector; 