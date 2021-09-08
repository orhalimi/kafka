const {Kafka} = require("kafkajs")

async function run(){
    try{

        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })
        const consumer = kafka.consumer({groupId:" test"});
        console.log("connecting...")     
        await consumer.connect();
        console.log("connected") 
        consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })
        await consumer.run({
            "eachMessage": async result =>{
                console.log(result);
            }
        })
        console.log(results)

    }catch(e){
        console.error('error: ' + e)
    }
}

run()