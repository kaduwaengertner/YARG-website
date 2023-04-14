export const sessionOptions = {
    password: process.env.LAB_SECRET,
    cookieName: 'labSec',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
}