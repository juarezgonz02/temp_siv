/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useState } from 'react';
import TiersCreation from '../../components/TiersCreation'
import DataContext from '../../components/TiersCreation/DataCreationContext';
import { AuthContext } from '../../utils/AuthContext';
import { Select } from 'antd';
import { CreationContext } from '../../utils/CreationContext';
//import { useParams } from 'react-router-dom'

interface Location{
    location_id: string,
    name: string, 
    no_numbered: string
}

const SeTiersPage = () => {

    const [location_id, setLocationId] = useContext(CreationContext).location

    const [isNumberedMap, setNumberedMap] = useState(false);

    const [locationList, setList] = useState<Location[]>([])

    const [token] = useContext(AuthContext).token

    useEffect(() => {

        (async () => {
            
            try {
                
                const data:Location[] = await (await fetch("http://api.sivtickets.fun/events/creation/location/all", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })).json()

                setList(data)
            
            }
            catch (e) {
                console.log(e)
            }
        
        })()
    }, [])

    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value)
        setNumberedMap(value.label!.toString().includes("NO NUMERADA"))
        setLocationId(value.value)
    };

    return (

        <div className='info-container'>
            <DataContext>

                <div className='locationSelectorContainer'>
                    <Select
                        placeholder="Selecciona una localidad"
                        labelInValue
                        style={{ width: 200 }}
                        onChange={handleChange}
                        options={[
                            {
                              label: 'Solo no numerados',
                              options: locationList.filter(location => location.no_numbered).map(location => {
                                return {
                                    label: location.name,
                                    value: location.location_id 
                                }
                              }),
                            },
                            {
                              label: 'Numerados / no numerados',
                              options: locationList.filter(location => !(location.no_numbered)).map(location => {
                                return {
                                    label: location.name,
                                    value: location.location_id 
                                }
                              }),                           
                            },
                          ]}
                    />
                </div>

                <TiersCreation numbered_selector={isNumberedMap} location_id={location_id} />
            </DataContext>
        </div>
    )
}

export default SeTiersPage
