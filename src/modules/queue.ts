/**
 * The queue function allows to for recalculate to run one at a time to avoid conflicts.
 * @param events {Mixed} a single function or an array of functions
 * @constructor
 */
const Queue = function (events?: Function | [Function]) {
  this.running = false;
  this.events = [];
  this.add(events);
} as any;


/**
 * Run all the events one after the other.
 */
Queue.prototype.run = function () {
  if (!this.running && this.events.length > 0) {
    const fn = this.events.shift();
    this.running = true;
    fn();
    this.running = false;

    this.run();
  }
};

/**
 * Add a event to the queue and try to run the que
 * @param event {Mixed} a single function or an array of functions
 */
Queue.prototype.add = function (event: Function | boolean | [Function] = false) {
  if (!event) {
    return false;
  }

  if (Array.isArray(event)) {
    return event.map((evt) => this.add(evt))
    // return foreach(event, (evt) => this.add(evt));
  }

  this.events.push(event);
  this.run();
};

/**
 * Clear all events from the queue
 */
Queue.prototype.clear = function () {
  this.events = [];
};


export default Queue;