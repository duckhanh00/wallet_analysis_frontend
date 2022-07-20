const PermissionRoute = { 
    HOME: {
        path: "/home",
        title: "Home"
    },

    RELATIONSHIP_SPACE: {
        path: "/relationship-space",
        title: "Relationship Space"
    },

    RELATIONSHIP_SPACE_TOKEN: {
        path: "/relationship-space/:slug",
        title: "Relationship Space"
    },

    WHALE_SPACE: {
        path: "/whale-space",
        title: "Whale Space"
    },

    NOT_FOUND: {
        path: "/404",
        title: "Not Found"
    }
}

const AllRoute = Object.values(PermissionRoute).map(item => item.path)

export {
    PermissionRoute,
    AllRoute
}