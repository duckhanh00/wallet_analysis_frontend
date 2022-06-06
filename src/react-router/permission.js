const PermissionRoute = {
    DASHBOARD: {
        path: "/dashboard",
        title: "Dashboard",
    },

    CLOTHING_MAN: {
        path: "/clothing-man",
        title: "Clothing Man",
    },

    CLOTHING_WOMAN: {
        path: "/clothing-woman",
        title: "Clothing Woman",
    },

    RELATION_GRAPH: {
        path: "/relation-graph",
        title: "Relation Graph"
    },

    WALLET_TYPE: {
        path: "/wallet-type",
        title: "Wallet Type"
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