module.exports = (ch) => 
    ch.assertExchange(
        'dead-letter', 
        'topic', {
            durable: true
        }, (error0, e) => {
            if (error0) {
                throw  error0;
            }
            ch.assertQueue(
                'dead-letter', {
                    durable: true,
                    messageTtl: 5000,
                }, (error1, q) => { 
                    if (error1) {
                        throw  error1;
                    }
                    ch.bindQueue(
                        q.queue, 
                        'dead-letter', 
                        'dead-letter.send'
                    );
                }
            )
        }
    )