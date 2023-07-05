import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'

const SwitchEventState = () => {

    const { event_code } = useParams()
    const [token] = useContext(AuthContext).token
    const nav = useNavigate()

    useEffect(() => {
        (async () => {

            try {

                const req = await fetch(`http://api.sivtickets.fun/events/creation/switch/${event_code}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    method: "POST"
                })

                if (req.ok) {
                    nav("/")
                }
            } catch (error) {
                nav("/")
            }
        })()
    }, [])

    return (
        <></>
    )
}

export default SwitchEventState