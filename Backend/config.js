module.exports = {
    dbConnection: {
        user: "sghkvgrcjlrujz",
        password: "041ceab5ffb754a207844f509170169eef73f4e558f3f513336482298bcca6cd",
        host: "ec2-18-204-74-74.compute-1.amazonaws.com",
        database: "d944khqdck9o72",
        port: 5432
    },
    server: {
        PORT: process.env.PORT || 5000,
    },
    jwtConfig: {
        //used for token 
        algorithm: "HS256",
        // secretKey: "Test@12345",
        secretKey: "ValueWings04#",

    },

};