import List from './list';

export default class ListZip<T> {
	private constructor(
		readonly value: T,
		private readonly start: List<T>,
		private readonly end: List<T>
	) { }

	get canOpen(): boolean {
		return !this.end.isEmpty;
	}

	get canClose(): boolean {
		return !this.start.isEmpty;
	}

	open(): ListZip<T> {
		if (!this.canOpen) {
			throw new Error('Zip is fully open');
		}
		return new ListZip(
			this.end.head,
			this.start.push(this.value),
			this.end.tail
		);
	}

	close(): ListZip<T> {
		if (!this.canClose) {
			throw new Error('Zip is fully closed');
		}
		return new ListZip(
			this.start.head,
			this.start.tail,
			this.end.push(this.value)
		);
	}

	set(value: T): ListZip<T> {
		return new ListZip(
			value,
			this.start,
			this.end
		);
	}

	toList(): List<T> {
		let list: ListZip<T> = this;
		while (list.canClose) {
			list = list.close();
		}
		return list.end.push(list.value);
	}

	static create<T>(list: List<T>): ListZip<T> {
		if (list.isEmpty) {
			throw new Error('Cannot zip an empty list');
		}
		return new ListZip(
			list.head,
			List.empty<T>(),
			list.tail
		);
	}
}
