export class Euler {
	base_url: string;
	chunks: strin[];

	constructor(url: string) {
		this.base_url = url
		this.chunks = url.split('/').slice(1)
	}

	get length(): int {
		return this.chunks.length;
	}

	isAt(index: int, phrase: string): bool {
		return this.chunks[index] == phrase;
	}
}