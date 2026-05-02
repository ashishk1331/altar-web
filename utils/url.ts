export class Euler {
	base_url: string;
	chunks: string[];

	constructor(url: string) {
		this.base_url = url
		this.chunks = url.split('/').slice(1)
	}

	get length(): number {
		return this.chunks.length;
	}

	isAt(index: number, phrase: string): boolean {
		return this.chunks[index] == phrase;
	}
}