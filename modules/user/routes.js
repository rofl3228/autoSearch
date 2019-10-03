module.exports = {
    users: {
        get: {
            '/user:id': { handler: 'getUser', noAuth: false, isRoot: false },
            '/test': { handler: 'getUser', noAuth: false, isRoot: false },
        },
        post: {
            '/login': { handler: 'loginUser', noAuth: true, isRoot: true},
        },
        put: {
            '/changePassword:id': { handler: 'changePassword', noAuth: false, isRoot: false},
        },
        delete: {
            '/delete:id': { handler: 'deleteUser', noAuth: false, isRoot: false},
        }
    },
    loyality: {
        get: {
            '/sup': {handler: 'sup', noAuth: false, isRoot: false}
        }
    }
}