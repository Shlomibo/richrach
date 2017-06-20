export default abstract class Tree<T> {
	abstract readonly root: T;
	abstract readonly left: Tree<T>;
	abstract readonly right: Tree<T>;

	constructor(readonly isEmpty: boolean) { }

	pushLeft(root: T, right = Tree.empty<T>()): Tree<T> {
		return Tree.create(root, this, right);
	}

	pushRight(root: T, left = Tree.empty<T>()): Tree<T> {
		return Tree.create(root, left, this);
	}

	setRoot(root: T): Tree<T> {
		return new ConcreteTree(root, this.left, this.right);
	}

	setLeft(left: Tree<T>): Tree<T> {
		return new ConcreteTree(this.root, left, this.right);
	}

	setRight(right: Tree<T>): Tree<T> {
		return new ConcreteTree(this.root, this.left, right);
	}

	map<U>(fn: (value: T) => U): Tree<U> {
		return this.isEmpty
			? Tree.empty<U>()
			: Tree.create(
				fn(this.root),
				this.left.map(fn),
				this.right.map(fn)
			);
	}

	*preorder(): IterableIterator<T> {
		if (!this.isEmpty) {
			yield* this.left;
			yield this.root;
			yield* this.right;
		}
	}
	*inorder(): IterableIterator<T> {
		if (!this.isEmpty) {
			yield this.root;
			yield* this.left;
			yield* this.right;
		}
	}
	*postorder(): IterableIterator<T> {
		if (!this.isEmpty) {
			yield* this.left;
			yield* this.right;
			yield this.root;
		}
	}

	[Symbol.iterator]() {
		return this.inorder();
	}

	static empty<T>(): Tree<T> {
		return empty;
	}

	static create<T>(root: T, left = Tree.empty<T>(), right = Tree.empty<T>()): Tree<T> {
		return new ConcreteTree(root, left, right);
	}
}

class Empty<T> extends Tree<T> {
	get root(): T {
		throw new Error('Empty tree');
	}
	get left(): Tree<T>{
		throw new Error('Empty tree');
	}
	get right(): Tree<T> {
		throw new Error('Empty tree');
	}

	constructor() {
		super(true);
	}
}

class ConcreteTree<T> extends Tree<T> {
	constructor(
		readonly root: T,
		readonly left: Tree<T>,
		readonly right: Tree<T>,

	) {
		super(false);
	}
}

const empty = new Empty<any>();
