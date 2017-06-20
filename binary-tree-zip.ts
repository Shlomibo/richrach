import Tree from './binary-tree';

type Parent<T> = {
	value: T;
	side: 'left' | 'right';
}

export default class TreeZip<T> {
	private constructor(
		private readonly value: T,
		private readonly up: Tree<any>,
		private readonly left: Tree<T>,
		private readonly right: Tree<T>
	) { }

	setValue(value: T): TreeZip<T> {
		return new TreeZip(
			value,
			this.up,
			this.left,
			this.right
		);
	}

	goLeft(): TreeZip<T> {
		if (this.left.isEmpty) {
			throw new Error('Cannot go left');
		}
		return new TreeZip(
			this.left.root,
			Tree.create<any>({value: this.value, side: 'left' }, this.up, this.right),
			this.left.left,
			this.left.right
		);
	}

	goRight(): TreeZip<T> {
		if (this.right.isEmpty) {
			throw new Error('Cannot go right');
		}
		return new TreeZip(
			this.right.root,
			Tree.create<any>({value: this.value, side: 'right'}, this.left, this.up),
			this.right.left,
			this.right.right
		);
	}

	goUp(): TreeZip<T> {
		if (this.up.isEmpty) {
			throw new Error('Cannot go up');
		}
		const [up, left, right] = this.up.root.side === 'left'
			? [this.up.left, Tree.create(this.value, this.left, this.right), this.up.right]
			: [this.up.right, this.up.left, Tree.create(this.value, this.left, this.right)];
		return new TreeZip(
			this.up.root.value,
			up,
			left,
			right
		);
	}

	toTree(): Tree<T> {
		let zip: TreeZip<T> = this;
		while (!zip.up.isEmpty) {
			zip = zip.goUp();
		}
		return zip.left.pushLeft(zip.value, zip.right);
	}

	static create<T>(tree: Tree<T>): TreeZip<T> {
		return new TreeZip(tree.root, Tree.empty<T>(), tree.left, tree.right);
	}
}
