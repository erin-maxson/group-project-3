export const getSavedLocationIds = () => {
    const savedLocationIds = localStorage.getItem('saved_locations')
    // parsed JSON data, if true return local stored items, nah then return empty array
        ? JSON.parse(localStorage.getItem('saved_locations'))
        : [];
    
    return savedLocationIds;
};

export const saveLocationIds = (locationIdArr) => {
    if (locationIdArr.length) {
        localStorage.setItem('saved_locations', JSON.stringify(locationIdArr));
    } else {
        localStorage.removeItem('saved_locations');
    }
};
// grabbed locationId from server/resolver.js/removeBook method
export const removeLocationId = (locationId) => {
    const savedLocationIds = localStorage.getItem('saved_locations')
        ? JSON.parse(localStorage.getItem('saved_locations'))
        : null;
    
    if (!savedLocationIds) {
        return false;
    }

    const updatedSavedLocationIds = saveLocationIds?.filter((savedLocationId) => savedLocationId !== locationId);
    localStorage.setItem('saved_locations', JSON.stringify(updatedSavedLocationIds));

    return true;
};