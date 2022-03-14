new Promise((resolve, reject) => {
    setTimeout(()=> {
        let number = console.log(Math.floor(Math.random() * 101)); 
        if (number % 2 === 0) {
            resolve(); 
        } else reject();
    }, 2000);
}).then((number) => console.log('Resolve'))
.catch((number) => console.log('Reject'));
