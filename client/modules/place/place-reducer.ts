const initState = {
    isLoaded: false,
    locations: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'place/init/success':
            return {
                ...state,
                isLoaded: true,
                locations: action.data.locations
            };

        case 'place/init/error':
            return {
                ...state,
                isLoaded: true
            };

        default:
            return state;
    }
};
