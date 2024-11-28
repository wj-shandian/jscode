// function myInstanceOf(left,right){
//     left = left.__proto__;
//     let rightProto = right.prototype;
//     while(true){
//         if(left === rightProto) return true
//         if(left === null) return false;
//         left = left.__proto__
//     }
// }

// function debounce(fn,delay=300,immediate=false){
//     if(typeof fn !== 'function'){
//         throw new TypeError('fn must be a function')
//     }
//     let timer = null;
//     return function(...args){
//         let now = immediate && !timer;
//         timer&&clearTimeout(timer);
//         timer = setTimeout(()=>{
//             timer = null;
//             !immediate&&fn.apply(this,args)
//         },delay)
//         now && fn.apply(this,args)
//     }
// }

// function throttle(fn,delay=300){
//     if(typeof fn !== 'function'){
//         throw new TypeError('fn must be a function')
//     }
//     let timer = null,previous=0;
//     return function(...args){
//        let now = + new Date();
//        let res = delay - (now - previous);
//        if(res<=0||res>delay){
//            if(timer){
//                clearTimeout(timer);
//                timer = null;
//            }
//            fn.apply(this,args);
//            previous = now;
//        }else if(!timer){
//         timer = setTimeout(()=>{
//             timer = null;
//             fn.apply(this,args)
//             previous = +new Date();
//         },res)
//        }
//     }
// }

// class EventEmitter{
//     constructor(){
//         this.events = {};
//     }
//     on(type,fn){
//         if(!this.events[type]) this.events[type] = [];
//         this.events[type].push(fn);
//     }
//     off(type,fn){
//         if(!this.events[type]) return;
//         this.events[type] = this.events[type].filter(item=>item!==fn)
//     }
//     emit(type,...args){
//         if(!this.events[type]) return;
//         this.events[type].forEach(item=>item(...args))
//     }
// }

// function isObject(value){
//     return value !== null && typeof value === 'object'
// }

// function deepClone(source,map=new WeakMap()){
//     if(!isObject(source)) return source;
//     if(source instanceof Date) return new Date(source);
//     if(source instanceof RegExp) return new RegExp(source);
//     if(map.has(source)) return map.get(source);
//     let target = Array.isArray(source)?[]:{};
//     map.set(source,target);
//     for(let key in source){
//         if(source.hasOwnProperty(key)){
//             if(isObject(source[key])){
//                 target[key] = deepClone(source[key],map)
//             }else{
//                 target[key] = source[key]
//             }
//         }
//     }
//     return target
// }

// function flat(source){
//     let stack = [...source];
//     let res = [];
//     while(stack.length){
//         let next =stack.pop();
//         if(Array.isArray(next)){
//             stack.push(...next)
//         }else{
//             res.push(next)
//         }
//     }
//     return res.reserve()
// }
// // 扁平化数据转化成树形结构
// // 给出测试数据

let data = [
    {id:1,name:'部门1',parentId:0},
    {id:2,name:'部门2',parentId:1},
    {id:3,name:'部门3',parentId:1},
    {id:4,name:'部门4',parentId:3},
    {id:5,name:'部门5',parentId:2},
]
// //转化成树形结构
// let data2 = [
//     {id:1,name:'部门1',parentId:0,children:[
//         {id:2,name:'部门2',parentId:1,children:[]},
//     ]},
//     {id:2,name:'部门2',parentId:0,children:[
//         {id:5,name:'部门5',parentId:2,children:[]},
//     ]},
// ]


// function tree(source,root){
//     let result = []
//     let map = {}
//     for(let item of source){
//         const {id,parentId} = item;
//         if(!map[id]) map[id] = {}
//         map[id] = map[id].children ? {...item,children:map[id].children}:{...item}
//         if(root === parentId){
//             result.push(map[id])
//         }else{
//             if(!map[parentId]) map[parentId] = {}
//             map[parentId].children = map[parentId].children ? [...map[parentId].children,map[id]] : [map[id]]
//         }
//     }
//     return JSON.stringify(result)

// }
console.log(tree(data,0))


function arrayToTree(source,root){
    let result = [], map = {};
    for(let item of source){
        const {id,parentId} = item;
        if(!map[id]){ map[id] = {};}
        map[id] = map[id].children ? {...item,children:map[id].children} : {...item};
        if(root === parentId){
            result.push(map[id])
        }else{
            if(!map[parentId]) map[parentId] = {};
            if(!map[parentId].children) map[parentId].children = [];
            map[parentId].children.push(map[id])
        }
    }
}