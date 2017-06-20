export default abstract class List<T> {
	abstract readonly head: T;
	abstract readonly tail: List<T>;
	readonly isEmpty: boolean;

	constructor(isEmpty: boolean) {
		this.isEmpty = isEmpty;
	}

	push(value: T): List<T> {
		return new ConcreteList(value, this);
	}

	static empty<T = any>(): List<T> {
		return empty;
	}

	*[Symbol.iterator]() {
		if (!this.isEmpty) {
			yield this.head;
			yield* this.tail;
		}
	}

	map<U>(fn: (value: T) => U): List<U> {
		return this.isEmpty
			? List.empty<U>()
			: this.tail.map(fn)
				.push(fn(this.head));
	}
}

class Empty<T> extends List<T> {
	get head(): T {
		throw new Error('No head');
	}

	get tail(): List<T> {
		throw new Error('No tail');
	}

	constructor() {
		super(true);
	}
}

class ConcreteList<T> extends List<T> {
	constructor(
		readonly head: T,
		readonly tail: List<T>
	) {
		super(false);
	}
}

const empty = new Empty<any>();
