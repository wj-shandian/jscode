class Scheduler {
    constructor(max) {
        this.max = max;
        this.count = 0; // 当前执行中的异步操作
        this.queue = new Array(); // 记录当前的执行数组
    }
    
    async add(promiseCreator) {
        // count >= max 时，此时先不直接执行，将当前异步操作存储起来，当count满足时，再去执行
        // Promise.then的链式调用 new Promise((resolve) => { setTimeout(() => {}, 10000}).then xxxx
        if (this.count >= this.max) {
            await new Promise((resolve, reject) => {
                console.log(resolve,promiseCreator,'resolve')
                this.queue.push(resolve);
            });
        }
        this.count++;
        let res = await promiseCreator();
        // console.log('22')
        this.count--;
        
        if (this.queue.length) {
            this.queue.shift()();
        }
        
        return res;
    }
}
    
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')  
addTask(400, '5')  
addTask(400, '6')  
addTask(400, '7') 
addTask(10, '8') 