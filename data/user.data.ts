export const USER_DATA = {
    validUser: {
        username: process.env.SAUCE_USERNAME as string,
        password: process.env.SAUCE_PASSWORD as string
    },
    lockedUser: {
        username: 'locked_out_user',
        password: process.env.SAUCE_PASSWORD as string
    },
    emptyUser: {
        username: '',
        password: ''
    }
}