const environment = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    Domain: process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:5000"
}

export default environment;