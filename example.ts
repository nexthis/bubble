import bubble, {EVENT_TYPE} from './src/index'

let test =  bubble('.bubble',{});


console.log(test);

test.on(EVENT_TYPE.EVENT_INITIALIZED, ()=>{ console.log('assd1')})

test.on(EVENT_TYPE.EVENT_RESIZE, ()=>{ console.log('assd2')})