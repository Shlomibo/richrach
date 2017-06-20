import List from './list';
import ListZip from './list-zip';

const arr = [1, 2, 3, 4, 5],
	list = arr.reduceRight((list, val) => list.push(val), List.empty<number>());

zipzap();

function zipzap() {
	let zip = ListZip.create(list);

	while (zip.canOpen) {
		console.log(zip.value);
		zip = zip.open();
	}
	console.log(zip.value);

	for (let i = 0; zip.canClose; i++) {
		zip = zip.set(i)
			.close();
	}
	console.log([...zip.toList().map(x => x * 5)]);
}
