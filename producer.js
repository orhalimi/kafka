const {Kafka} = require("kafkajs")
const msg = process.argv[2];

async function run(){
    try{

        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })
        const producer = kafka.producer();
        console.log("connecting...")     
        await producer.connect();
        console.log("connected") 
        const partition = msg[0] < "N" ? 0: 1;
        const results = await producer.send({
            "topic": "Users",
            "messages":[
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })
        console.log(results)
        await producer.disconnect();

    }catch(e){
        console.error('error: ' + e)
    }

    finally{
        process.exit(0);
    }
}

if(msg) run()