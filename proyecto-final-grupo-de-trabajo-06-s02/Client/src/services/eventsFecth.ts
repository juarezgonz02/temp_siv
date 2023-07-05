export const getEvents = async () =>{
    let response =await fetch('../../../public/all_event_get_dummy_data.json')
    return response.json()
}