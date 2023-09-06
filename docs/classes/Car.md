[gros-client](../README.md) / [Exports](../modules.md) / Car

# Class: Car

Car对象

在你需要连接Car的时候，你可以创建一个new Car()对象！ 这将会在后台连接到控制系统，并提供对应的控制函数和状态监听！

## Hierarchy

- `RobotBase`

  ↳ **`Car`**

## Table of contents

### Constructors

- [constructor](Car.md#constructor)

### Properties

- [camera](Car.md#camera)
- [mod](Car.md#mod)
- [system](Car.md#system)
- [captureRejectionSymbol](Car.md#capturerejectionsymbol)
- [captureRejections](Car.md#capturerejections)
- [defaultMaxListeners](Car.md#defaultmaxlisteners)
- [errorMonitor](Car.md#errormonitor)

### Methods

- [addListener](Car.md#addlistener)
- [cover\_param](Car.md#cover_param)
- [emit](Car.md#emit)
- [eventNames](Car.md#eventnames)
- [getMaxListeners](Car.md#getmaxlisteners)
- [http\_request](Car.md#http_request)
- [listenerCount](Car.md#listenercount)
- [listeners](Car.md#listeners)
- [move](Car.md#move)
- [off](Car.md#off)
- [on](Car.md#on)
- [on\_close](Car.md#on_close)
- [on\_connected](Car.md#on_connected)
- [on\_error](Car.md#on_error)
- [on\_message](Car.md#on_message)
- [once](Car.md#once)
- [prependListener](Car.md#prependlistener)
- [prependOnceListener](Car.md#prependoncelistener)
- [rawListeners](Car.md#rawlisteners)
- [removeAllListeners](Car.md#removealllisteners)
- [removeListener](Car.md#removelistener)
- [setMaxListeners](Car.md#setmaxlisteners)
- [set\_mode](Car.md#set_mode)
- [start](Car.md#start)
- [stop](Car.md#stop)
- [websocket\_send](Car.md#websocket_send)
- [addAbortListener](Car.md#addabortlistener)
- [getEventListeners](Car.md#geteventlisteners)
- [getMaxListeners](Car.md#getmaxlisteners-1)
- [listenerCount](Car.md#listenercount-1)
- [on](Car.md#on-1)
- [once](Car.md#once-1)
- [setMaxListeners](Car.md#setmaxlisteners-1)

## Constructors

### constructor

• **new Car**(`option?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `option?` | `ConnectOption` |

#### Overrides

RobotBase.constructor

#### Defined in

[lib/robot/car.ts:28](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/car.ts#L28)

## Properties

### camera

• `Readonly` **camera**: `undefined` \| [`Camera`](Camera.md)

相机

#### Inherited from

RobotBase.camera

#### Defined in

[lib/robot/robot_base.ts:34](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L34)

___

### mod

• `Private` **mod**: `undefined` \| [`CarMod`](../enums/CarMod.md)

#### Defined in

[lib/robot/car.ts:26](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/car.ts#L26)

___

### system

• `Readonly` **system**: [`System`](System.md)

系统控制

#### Inherited from

RobotBase.system

#### Defined in

[lib/robot/robot_base.ts:38](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L38)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](Human.md#capturerejectionsymbol)

Value: `Symbol.for('nodejs.rejection')`

See how to write a custom `rejection handler`.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

RobotBase.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:390

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Value: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Change the default `captureRejections` option on all new `EventEmitter` objects.

**`Since`**

v13.4.0, v12.16.0

#### Inherited from

RobotBase.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:397

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_`EventEmitter` instances, the `events.defaultMaxListeners`property can be used. If this value is not a positive number, a `RangeError`is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_`EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()`methods can be used to
temporarily avoid this warning:

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

**`Since`**

v0.11.2

#### Inherited from

RobotBase.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:434

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](Human.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`events. Listeners installed using this symbol are called before the regular`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an`'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

**`Since`**

v13.6.0, v12.17.0

#### Inherited from

RobotBase.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:383

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`Car`](Car.md)

Alias for `emitter.on(eventName, listener)`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Car`](Car.md)

**`Since`**

v0.1.26

#### Inherited from

RobotBase.addListener

#### Defined in

node_modules/@types/node/events.d.ts:454

___

### cover\_param

▸ `Protected` **cover_param**(`param`, `value`, `minThreshold`, `maxThreshold`): `number`

参数转换，对参数做限定

通过参数大小阈值的限定， 使参数合法，如果超出最大阈值将转化为最大阈值返回

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | `number` | 参数名 |
| `value` | `string` | 参数值 |
| `minThreshold` | `number` | 参数值最大阈值 |
| `maxThreshold` | `number` | 参数值最小阈值 |

#### Returns

`number`

#### Inherited from

RobotBase.cover\_param

#### Defined in

[lib/robot/robot_base.ts:219](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L219)

___

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

**`Since`**

v0.1.26

#### Inherited from

RobotBase.emit

#### Defined in

node_modules/@types/node/events.d.ts:716

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
import { EventEmitter } from 'node:events';

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

#### Returns

(`string` \| `symbol`)[]

**`Since`**

v6.0.0

#### Inherited from

RobotBase.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:779

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](Car.md#defaultmaxlisteners).

#### Returns

`number`

**`Since`**

v1.0.0

#### Inherited from

RobotBase.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:631

___

### http\_request

▸ `Protected` **http_request**<`T`\>(`config`): `Promise`<`T`\>

发送http消息

这是一个内部函数

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `AxiosRequestConfig`<`any`\> | http请求的具体内容 |

#### Returns

`Promise`<`T`\>

#### Inherited from

RobotBase.http\_request

#### Defined in

[lib/robot/robot_base.ts:190](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L190)

___

### listenerCount

▸ **listenerCount**(`eventName`, `listener?`): `number`

Returns the number of listeners listening for the event named `eventName`.
If `listener` is provided, it will return how many times the listener is found
in the list of the listeners of the event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |
| `listener?` | `Function` | The event handler function |

#### Returns

`number`

**`Since`**

v3.2.0

#### Inherited from

RobotBase.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:725

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v0.1.26

#### Inherited from

RobotBase.listeners

#### Defined in

node_modules/@types/node/events.d.ts:644

___

### move

▸ **move**(`angle`, `speed`): `void`

控制Car移动 (该请求维持了长链接的方式进行发送)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `angle` | `number` | 角度 控制方向，取值范围为正负45度。向左为正，向右为负！(浮点数8位) |
| `speed` | `number` | 速度 控制前后，取值范围为正负500。向前为正，向后为负！(浮点数8位) |

#### Returns

`void`

#### Defined in

[lib/robot/car.ts:59](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/car.ts#L59)

___

### off

▸ **off**(`eventName`, `listener`): [`Car`](Car.md)

Alias for `emitter.removeListener()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Car`](Car.md)

**`Since`**

v10.0.0

#### Inherited from

RobotBase.off

#### Defined in

node_modules/@types/node/events.d.ts:604

___

### on

▸ **on**(`eventName`, `listener`): [`Car`](Car.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Car`](Car.md)

**`Since`**

v0.1.101

#### Inherited from

RobotBase.on

#### Defined in

node_modules/@types/node/events.d.ts:486

___

### on\_close

▸ **on_close**(`listener`): `void`

event: 该监听将会在Robot设备连接关闭时触发

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | 无参回调，你可以再次进行资源回收等类似的操作 |

#### Returns

`void`

#### Inherited from

RobotBase.on\_close

#### Defined in

[lib/robot/robot_base.ts:133](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L133)

___

### on\_connected

▸ **on_connected**(`listener`): `void`

event : 该监听将会在Robot设备连接成功时触发

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | () => `void` | 无参回调, 你可以在确认后执行你的业务逻辑 |

#### Returns

`void`

#### Inherited from

RobotBase.on\_connected

#### Defined in

[lib/robot/robot_base.ts:124](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L124)

___

### on\_error

▸ **on_error**(`listener`): `void`

event: 该监听将会在Robot设备发送错误时触发

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | (`err`: `Error`) => `void` | 会将错误信息回调 |

#### Returns

`void`

#### Inherited from

RobotBase.on\_error

#### Defined in

[lib/robot/robot_base.ts:142](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L142)

___

### on\_message

▸ **on_message**(`listener`): `void`

该监听将会在Robot设备主动广播消息时触发

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `listener` | (`data`: `any`) => `void` | ，你可能需要监听该回调处理你的逻辑 |

#### Returns

`void`

#### Inherited from

RobotBase.on\_message

#### Defined in

[lib/robot/robot_base.ts:151](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L151)

___

### once

▸ **once**(`eventName`, `listener`): [`Car`](Car.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Car`](Car.md)

**`Since`**

v0.3.0

#### Inherited from

RobotBase.once

#### Defined in

node_modules/@types/node/events.d.ts:516

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`Car`](Car.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Car`](Car.md)

**`Since`**

v6.0.0

#### Inherited from

RobotBase.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:743

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`Car`](Car.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`Car`](Car.md)

**`Since`**

v6.0.0

#### Inherited from

RobotBase.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:759

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v9.4.0

#### Inherited from

RobotBase.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:675

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Car`](Car.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Car`](Car.md)

**`Since`**

v0.1.26

#### Inherited from

RobotBase.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:615

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`Car`](Car.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
import { EventEmitter } from 'node:events';
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Car`](Car.md)

**`Since`**

v0.1.26

#### Inherited from

RobotBase.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:599

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Car`](Car.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Car`](Car.md)

**`Since`**

v0.3.5

#### Inherited from

RobotBase.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:625

___

### set\_mode

▸ **set_mode**(`mod`): `Promise`<`any`\>

设置小车运动模式

完成后小车将在对应模式下运动，包括 4轮 3轮 2轮

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`CarMod`](../enums/CarMod.md) | 模式对象定义 |

#### Returns

`Promise`<`any`\>

return

#### Defined in

[lib/robot/car.ts:41](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/car.ts#L41)

___

### start

▸ **start**(): `Promise`<`any`\>

启动 : 重置/归零/对设备初始状态的校准

当你想要控制Robot设备的时候，你的第一个指令

#### Returns

`Promise`<`any`\>

#### Inherited from

RobotBase.start

#### Defined in

[lib/robot/robot_base.ts:99](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L99)

___

### stop

▸ **stop**(): `Promise`<`any`\>

停止

该命令优先于其他命令! 会掉电停止。请在紧急情况下触发

#### Returns

`Promise`<`any`\>

#### Inherited from

RobotBase.stop

#### Defined in

[lib/robot/robot_base.ts:111](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L111)

___

### websocket\_send

▸ `Protected` **websocket_send**(`message`): `void`

发送socket消息到Robot设备

这是一个内部函数: 将消息转换为字符串并发送
内部做了重试机制！ 主要是为了防止客户端在socket连接不完全的时候立即发送消息

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | 具体的消息体 |

#### Returns

`void`

#### Inherited from

RobotBase.websocket\_send

#### Defined in

[lib/robot/robot_base.ts:164](https://github.com/FFTAI/gros_client_js/blob/29e0334/lib/robot/robot_base.ts#L164)

___

### addAbortListener

▸ `Static` **addAbortListener**(`signal`, `resource`): `Disposable`

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

```js
import { addAbortListener } from 'node:events';

function example(signal) {
  let disposable;
  try {
    signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
    disposable = addAbortListener(signal, (e) => {
      // Do something when signal is aborted.
    });
  } finally {
    disposable?.[Symbol.dispose]();
  }
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `signal` | `AbortSignal` |
| `resource` | (`event`: `Event`) => `void` |

#### Returns

`Disposable`

that removes the `abort` listener.

**`Since`**

v20.5.0

#### Inherited from

RobotBase.addAbortListener

#### Defined in

node_modules/@types/node/events.d.ts:375

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

**`Since`**

v15.2.0, v14.17.0

#### Inherited from

RobotBase.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:296

___

### getMaxListeners

▸ `Static` **getMaxListeners**(`emitter`): `number`

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```js
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |

#### Returns

`number`

**`Since`**

v19.9.0

#### Inherited from

RobotBase.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:325

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
import { EventEmitter, listenerCount } from 'node:events';

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Inherited from

RobotBase.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:268

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

**`Since`**

v13.6.0, v12.16.0

#### Inherited from

RobotBase.on

#### Defined in

node_modules/@types/node/events.d.ts:250

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

**`Since`**

v11.13.0, v10.16.0

#### Inherited from

RobotBase.once

#### Defined in

node_modules/@types/node/events.d.ts:189

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

RobotBase.once

#### Defined in

node_modules/@types/node/events.d.ts:190

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

**`Since`**

v15.4.0

#### Inherited from

RobotBase.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:340